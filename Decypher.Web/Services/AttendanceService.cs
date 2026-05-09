using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    // ═══════════════════════════════════════════════════════════════
    // LEAVE SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ILeaveService
    {
        Task<IEnumerable<object>> GetLeaveTypesAsync(string tenantId);
        Task<LeaveType> CreateLeaveTypeAsync(LeaveType leaveType, string tenantId, string userId);
        Task<IEnumerable<object>> GetLeaveBalancesAsync(Guid employeeId, int year, string tenantId);
        Task<IEnumerable<object>> GetLeaveRequestsAsync(string tenantId, Guid? employeeId, string? status);
        Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest request, string tenantId, string userId);
        Task<LeaveRequest?> ApproveRejectAsync(Guid id, string status, string comments, string tenantId, string approvedById);
        Task<object> GetLeaveCalendarAsync(string tenantId, int month, int year);
        Task SeedDefaultLeaveTypesAsync(string tenantId, string userId);
    }

    public class LeaveService : ILeaveService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<LeaveService> _log;

        public LeaveService(ApplicationDbContext ctx, ILogger<LeaveService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetLeaveTypesAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.LeaveTypes.AsNoTracking()
                .Where(t => t.IsActive)
                .Select(t => (object)new
                {
                    t.Id, t.Name, t.Description, t.MaxDaysPerYear,
                    t.CarryForwardAllowed, t.IsHalfDayAllowed, t.RequiresDocuments, t.Color
                }).ToListAsync();
        }

        public async Task<LeaveType> CreateLeaveTypeAsync(LeaveType leaveType, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            leaveType.TenantId = tid;
            leaveType.CreatedBy = userId;
            _ctx.LeaveTypes.Add(leaveType);
            await _ctx.SaveChangesAsync();
            return leaveType;
        }

        public async Task<IEnumerable<object>> GetLeaveBalancesAsync(Guid employeeId, int year, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.LeaveBalances.AsNoTracking()
                .Include(lb => lb.LeaveType)
                .Where(lb => lb.EmployeeId == employeeId && lb.Year == year)
                .Select(lb => (object)new
                {
                    lb.Id, lb.LeaveTypeId, leaveTypeName = lb.LeaveType.Name,
                    color = lb.LeaveType.Color, lb.Year, lb.Allocated,
                    lb.Used, lb.Pending, lb.CarriedForward,
                    remaining = lb.Allocated + lb.CarriedForward - lb.Used - lb.Pending
                }).ToListAsync();
        }

        public async Task<IEnumerable<object>> GetLeaveRequestsAsync(string tenantId, Guid? employeeId, string? status)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<LeaveRequest> q = _ctx.LeaveRequests.AsNoTracking()
                .Include(r => r.Employee)
                .Include(r => r.LeaveType);

            if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId.Value);
            if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);

            return await q.OrderByDescending(r => r.StartDate)
                .Select(r => (object)new
                {
                    r.Id, r.EmployeeId,
                    employeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                    r.LeaveTypeId, leaveTypeName = r.LeaveType.Name,
                    color = r.LeaveType.Color,
                    r.StartDate, r.EndDate, r.Days, r.IsHalfDay,
                    r.Reason, r.Status, r.ApprovedAt, r.ApproverComments
                }).ToListAsync();
        }

        public async Task<LeaveRequest> CreateLeaveRequestAsync(LeaveRequest request, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            request.TenantId = tid;
            request.CreatedBy = userId;
            request.Status = "Pending";

            // Calculate working days (excluding weekends)
            if (request.Days == 0)
            {
                var days = 0m;
                for (var d = request.StartDate.Date; d <= request.EndDate.Date; d = d.AddDays(1))
                    if (d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday) days++;
                request.Days = request.IsHalfDay ? 0.5m : days;
            }

            _ctx.LeaveRequests.Add(request);

            // Mark balance as pending
            var balance = await _ctx.LeaveBalances
                .FirstOrDefaultAsync(lb => lb.EmployeeId == request.EmployeeId
                    && lb.LeaveTypeId == request.LeaveTypeId
                    && lb.Year == request.StartDate.Year);
            if (balance != null) balance.Pending += request.Days;

            await _ctx.SaveChangesAsync();
            return request;
        }

        public async Task<LeaveRequest?> ApproveRejectAsync(Guid id, string status, string comments, string tenantId, string approvedById)
        {
            _ctx.SetTenantId(tenantId);
            var request = await _ctx.LeaveRequests.FirstOrDefaultAsync(r => r.Id == id);
            if (request == null) return null;

            var oldStatus = request.Status;
            request.Status = status;
            request.ApprovedById = approvedById;
            request.ApprovedAt = DateTime.UtcNow;
            request.ApproverComments = comments;

            // Update balance
            var balance = await _ctx.LeaveBalances
                .FirstOrDefaultAsync(lb => lb.EmployeeId == request.EmployeeId
                    && lb.LeaveTypeId == request.LeaveTypeId
                    && lb.Year == request.StartDate.Year);

            if (balance != null && oldStatus == "Pending")
            {
                balance.Pending = Math.Max(0, balance.Pending - request.Days);
                if (status == "Approved") balance.Used += request.Days;
            }

            await _ctx.SaveChangesAsync();
            _log.LogInformation("Leave request {Id} {Status}", id, status);
            return request;
        }

        public async Task<object> GetLeaveCalendarAsync(string tenantId, int month, int year)
        {
            _ctx.SetTenantId(tenantId);
            var start = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
            var end = start.AddMonths(1).AddDays(-1);

            var approvedLeaves = await _ctx.LeaveRequests.AsNoTracking()
                .Include(r => r.Employee)
                .Include(r => r.LeaveType)
                .Where(r => r.Status == "Approved" && r.StartDate <= end && r.EndDate >= start)
                .Select(r => new
                {
                    r.EmployeeId,
                    employeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                    leaveType = r.LeaveType.Name,
                    color = r.LeaveType.Color,
                    r.StartDate, r.EndDate, r.Days
                }).ToListAsync();

            return new { month, year, leaves = approvedLeaves };
        }

        public async Task SeedDefaultLeaveTypesAsync(string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var existing = await _ctx.LeaveTypes.AnyAsync();
            if (existing) return;

            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var types = new List<LeaveType>
            {
                new() { TenantId = tid, Name = "Casual Leave", MaxDaysPerYear = 12, IsHalfDayAllowed = true, Color = "#6b4df0", CreatedBy = userId },
                new() { TenantId = tid, Name = "Sick Leave", MaxDaysPerYear = 8, RequiresDocuments = true, Color = "#ef4444", CreatedBy = userId },
                new() { TenantId = tid, Name = "Earned Leave", MaxDaysPerYear = 15, CarryForwardAllowed = true, MaxCarryForwardDays = 30, Color = "#10b981", CreatedBy = userId },
                new() { TenantId = tid, Name = "Maternity Leave", MaxDaysPerYear = 182, RequiresDocuments = true, Color = "#ec4899", CreatedBy = userId },
                new() { TenantId = tid, Name = "Paternity Leave", MaxDaysPerYear = 15, Color = "#3b82f6", CreatedBy = userId },
                new() { TenantId = tid, Name = "Comp Off", MaxDaysPerYear = 30, IsHalfDayAllowed = true, Color = "#f59e0b", CreatedBy = userId }
            };
            _ctx.LeaveTypes.AddRange(types);
            await _ctx.SaveChangesAsync();
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // ATTENDANCE SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IAttendanceService
    {
        Task<IEnumerable<object>> GetRecordsAsync(string tenantId, Guid? employeeId, DateTime? from, DateTime? to);
        Task<AttendanceRecord> PunchInAsync(Guid employeeId, double? lat, double? lng, string method, string tenantId, string userId);
        Task<AttendanceRecord?> PunchOutAsync(Guid employeeId, double? lat, double? lng, string tenantId);
        Task<object> GetMonthlyReportAsync(string tenantId, Guid employeeId, int month, int year);
        Task<object> GetDailySummaryAsync(string tenantId, DateTime date);
        Task<AttendancePolicy?> GetPolicyAsync(string tenantId);
        Task<AttendancePolicy> SavePolicyAsync(AttendancePolicy policy, string tenantId, string userId);
    }

    public class AttendanceService : IAttendanceService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<AttendanceService> _log;

        public AttendanceService(ApplicationDbContext ctx, ILogger<AttendanceService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetRecordsAsync(string tenantId, Guid? employeeId, DateTime? from, DateTime? to)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<AttendanceRecord> q = _ctx.AttendanceRecords.AsNoTracking().Include(r => r.Employee);
            if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId.Value);
            if (from.HasValue) q = q.Where(r => r.Date >= from.Value);
            if (to.HasValue) q = q.Where(r => r.Date <= to.Value);

            return await q.OrderByDescending(r => r.Date).Select(r => (object)new
            {
                r.Id, r.EmployeeId,
                employeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                r.Date, r.PunchIn, r.PunchOut,
                workingHours = r.PunchIn.HasValue && r.PunchOut.HasValue
                    ? Math.Round((r.PunchOut.Value - r.PunchIn.Value).TotalHours, 2) : (double?)null,
                r.Status, r.PunchInMethod, r.WithinGeoFence, r.InAddress, r.OutAddress
            }).ToListAsync();
        }

        public async Task<AttendanceRecord> PunchInAsync(Guid employeeId, double? lat, double? lng, string method, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var today = DateTime.UtcNow.Date;

            // Check if already punched in
            _ctx.SetTenantId(tenantId);
            var existing = await _ctx.AttendanceRecords
                .FirstOrDefaultAsync(r => r.EmployeeId == employeeId && r.Date.Date == today);

            if (existing != null && existing.PunchIn.HasValue)
                throw new InvalidOperationException("Already punched in today");

            var policy = await _ctx.AttendancePolicies.AsNoTracking()
                .Where(p => p.IsDefault).FirstOrDefaultAsync();

            var record = existing ?? new AttendanceRecord
            {
                TenantId = tid, EmployeeId = employeeId,
                Date = DateTime.UtcNow.Date, CreatedBy = userId
            };

            record.PunchIn = DateTime.UtcNow;
            record.InLatitude = lat;
            record.InLongitude = lng;
            record.PunchInMethod = method;
            record.WithinGeoFence = true; // Set based on geo calculation if policy.GeoFenceEnabled

            // Status: check if late
            if (policy != null)
            {
                var punchTime = record.PunchIn.Value.TimeOfDay;
                var graceEnd = policy.ShiftStartTime.Add(TimeSpan.FromMinutes(policy.GraceMinutes));
                record.Status = punchTime > graceEnd ? "Late" : "Present";
            }
            else record.Status = "Present";

            if (existing == null) _ctx.AttendanceRecords.Add(record);
            await _ctx.SaveChangesAsync();
            _log.LogInformation("Employee {EmpId} punched in at {Time}", employeeId, record.PunchIn);
            return record;
        }

        public async Task<AttendanceRecord?> PunchOutAsync(Guid employeeId, double? lat, double? lng, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var today = DateTime.UtcNow.Date;
            var record = await _ctx.AttendanceRecords
                .FirstOrDefaultAsync(r => r.EmployeeId == employeeId && r.Date.Date == today);

            if (record == null || !record.PunchIn.HasValue) return null;

            record.PunchOut = DateTime.UtcNow;
            record.OutLatitude = lat;
            record.OutLongitude = lng;

            var hours = (record.PunchOut.Value - record.PunchIn.Value).TotalHours;
            var policy = await _ctx.AttendancePolicies.AsNoTracking()
                .Where(p => p.IsDefault).FirstOrDefaultAsync();
            if (policy != null && hours < policy.RequiredHoursPerDay / 2) record.Status = "HalfDay";

            await _ctx.SaveChangesAsync();
            return record;
        }

        public async Task<object> GetMonthlyReportAsync(string tenantId, Guid employeeId, int month, int year)
        {
            _ctx.SetTenantId(tenantId);
            var from = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
            var to = from.AddMonths(1).AddDays(-1);

            var records = await _ctx.AttendanceRecords.AsNoTracking()
                .Where(r => r.EmployeeId == employeeId && r.Date >= from && r.Date <= to)
                .ToListAsync();

            var present = records.Count(r => r.Status is "Present" or "Late");
            var late = records.Count(r => r.Status == "Late");
            var halfDay = records.Count(r => r.Status == "HalfDay");
            var absent = records.Count(r => r.Status == "Absent");
            var totalHours = records
                .Where(r => r.PunchIn.HasValue && r.PunchOut.HasValue)
                .Sum(r => (r.PunchOut!.Value - r.PunchIn!.Value).TotalHours);

            return new
            {
                employeeId, month, year, totalWorkingDays = records.Count,
                present, late, halfDay, absent,
                totalHours = Math.Round(totalHours, 1),
                records = records.Select(r => new
                {
                    r.Date, r.PunchIn, r.PunchOut,
                    workingHours = r.PunchIn.HasValue && r.PunchOut.HasValue
                        ? Math.Round((r.PunchOut.Value - r.PunchIn.Value).TotalHours, 2) : (double?)null,
                    r.Status, r.PunchInMethod
                })
            };
        }

        public async Task<object> GetDailySummaryAsync(string tenantId, DateTime date)
        {
            _ctx.SetTenantId(tenantId);
            var records = await _ctx.AttendanceRecords.AsNoTracking()
                .Where(r => r.Date.Date == date.Date)
                .GroupBy(r => r.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            var totalEmployees = await _ctx.Employees.CountAsync(e => e.Status == "Active");
            return new
            {
                date, totalEmployees,
                present = records.FirstOrDefault(r => r.status == "Present")?.count ?? 0,
                late = records.FirstOrDefault(r => r.status == "Late")?.count ?? 0,
                absent = totalEmployees - records.Sum(r => r.count),
                breakdown = records
            };
        }

        public async Task<AttendancePolicy?> GetPolicyAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.AttendancePolicies.AsNoTracking()
                .Where(p => p.IsDefault).FirstOrDefaultAsync();
        }

        public async Task<AttendancePolicy> SavePolicyAsync(AttendancePolicy policy, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var existing = await _ctx.AttendancePolicies.Where(p => p.IsDefault).FirstOrDefaultAsync();
            if (existing != null)
            {
                existing.ShiftStartTime = policy.ShiftStartTime;
                existing.ShiftEndTime = policy.ShiftEndTime;
                existing.GraceMinutes = policy.GraceMinutes;
                existing.RequiredHoursPerDay = policy.RequiredHoursPerDay;
                existing.GeoFenceEnabled = policy.GeoFenceEnabled;
                existing.GeoFenceRadiusMeters = policy.GeoFenceRadiusMeters;
                existing.BiometricEnabled = policy.BiometricEnabled;
                await _ctx.SaveChangesAsync();
                return existing;
            }
            policy.TenantId = tid;
            policy.CreatedBy = userId;
            policy.IsDefault = true;
            _ctx.AttendancePolicies.Add(policy);
            await _ctx.SaveChangesAsync();
            return policy;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // SHIFT SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IShiftService
    {
        Task<IEnumerable<object>> GetDefinitionsAsync(string tenantId);
        Task<ShiftDefinition> CreateDefinitionAsync(ShiftDefinition shift, string tenantId, string userId);
        Task<IEnumerable<object>> GetEmployeeShiftsAsync(string tenantId, Guid? employeeId);
        Task<EmployeeShift> AssignShiftAsync(Guid employeeId, Guid shiftId, DateTime from, DateTime? to, string tenantId, string userId);
    }

    public class ShiftService : IShiftService
    {
        private readonly ApplicationDbContext _ctx;
        public ShiftService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetDefinitionsAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.ShiftDefinitions.AsNoTracking()
                .Where(s => s.IsActive)
                .Select(s => (object)new
                {
                    s.Id, s.Name, s.StartTime, s.EndTime,
                    s.WorkingHours, s.IsNightShift, s.Color
                }).ToListAsync();
        }

        public async Task<ShiftDefinition> CreateDefinitionAsync(ShiftDefinition shift, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            shift.TenantId = tid;
            shift.CreatedBy = userId;
            _ctx.ShiftDefinitions.Add(shift);
            await _ctx.SaveChangesAsync();
            return shift;
        }

        public async Task<IEnumerable<object>> GetEmployeeShiftsAsync(string tenantId, Guid? employeeId)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<EmployeeShift> q = _ctx.EmployeeShifts.AsNoTracking()
                .Include(es => es.Employee)
                .Include(es => es.ShiftDefinition);
            if (employeeId.HasValue) q = q.Where(es => es.EmployeeId == employeeId.Value);

            return await q.Select(es => (object)new
            {
                es.Id, es.EmployeeId,
                employeeName = es.Employee.FirstName + " " + es.Employee.LastName,
                es.ShiftDefinitionId, shiftName = es.ShiftDefinition.Name,
                es.ShiftDefinition.StartTime, es.ShiftDefinition.EndTime,
                es.EffectiveFrom, es.EffectiveTo
            }).ToListAsync();
        }

        public async Task<EmployeeShift> AssignShiftAsync(Guid employeeId, Guid shiftId, DateTime from, DateTime? to, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var assignment = new EmployeeShift
            {
                TenantId = tid, EmployeeId = employeeId,
                ShiftDefinitionId = shiftId, EffectiveFrom = from,
                EffectiveTo = to, CreatedBy = userId
            };
            _ctx.EmployeeShifts.Add(assignment);
            await _ctx.SaveChangesAsync();
            return assignment;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // TIMESHEET SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ITimesheetService
    {
        Task<IEnumerable<object>> GetEntriesAsync(string tenantId, Guid? employeeId, DateTime? from, DateTime? to, string? status);
        Task<TimesheetEntry> SaveEntryAsync(TimesheetEntry entry, string tenantId, string userId);
        Task<bool> SubmitWeekAsync(string tenantId, Guid employeeId, DateTime weekStart, string userId);
        Task<TimesheetEntry?> ApproveRejectAsync(Guid entryId, string status, string tenantId, string approvedById);
    }

    public class TimesheetService : ITimesheetService
    {
        private readonly ApplicationDbContext _ctx;
        public TimesheetService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetEntriesAsync(string tenantId, Guid? employeeId, DateTime? from, DateTime? to, string? status)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<TimesheetEntry> q = _ctx.TimesheetEntries.AsNoTracking().Include(e => e.Employee);
            if (employeeId.HasValue) q = q.Where(e => e.EmployeeId == employeeId.Value);
            if (from.HasValue) q = q.Where(e => e.Date >= from.Value);
            if (to.HasValue) q = q.Where(e => e.Date <= to.Value);
            if (!string.IsNullOrEmpty(status)) q = q.Where(e => e.Status == status);

            return await q.OrderByDescending(e => e.Date).Select(e => (object)new
            {
                e.Id, e.EmployeeId,
                employeeName = e.Employee.FirstName + " " + e.Employee.LastName,
                e.Date, e.ProjectCode, e.TaskDescription,
                e.HoursWorked, e.IsBillable, e.Status
            }).ToListAsync();
        }

        public async Task<TimesheetEntry> SaveEntryAsync(TimesheetEntry entry, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            _ctx.SetTenantId(tenantId);
            var existing = await _ctx.TimesheetEntries
                .FirstOrDefaultAsync(e => e.EmployeeId == entry.EmployeeId
                    && e.Date.Date == entry.Date.Date
                    && e.ProjectCode == entry.ProjectCode);

            if (existing != null)
            {
                existing.HoursWorked = entry.HoursWorked;
                existing.TaskDescription = entry.TaskDescription;
                existing.IsBillable = entry.IsBillable;
                existing.UpdatedBy = userId;
            }
            else
            {
                entry.TenantId = tid;
                entry.Status = "Draft";
                entry.CreatedBy = userId;
                _ctx.TimesheetEntries.Add(entry);
            }
            await _ctx.SaveChangesAsync();
            return existing ?? entry;
        }

        public async Task<bool> SubmitWeekAsync(string tenantId, Guid employeeId, DateTime weekStart, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var weekEnd = weekStart.AddDays(6);
            var entries = await _ctx.TimesheetEntries
                .Where(e => e.EmployeeId == employeeId && e.Date >= weekStart && e.Date <= weekEnd && e.Status == "Draft")
                .ToListAsync();
            foreach (var entry in entries)
            {
                entry.Status = "Submitted";
                entry.SubmittedById = userId;
                entry.SubmittedAt = DateTime.UtcNow;
            }
            await _ctx.SaveChangesAsync();
            return entries.Count > 0;
        }

        public async Task<TimesheetEntry?> ApproveRejectAsync(Guid entryId, string status, string tenantId, string approvedById)
        {
            _ctx.SetTenantId(tenantId);
            var entry = await _ctx.TimesheetEntries.FindAsync(entryId);
            if (entry == null) return null;
            entry.Status = status;
            entry.ApprovedById = approvedById;
            entry.ApprovedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return entry;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // OVERTIME SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IOvertimeService
    {
        Task<IEnumerable<object>> GetRequestsAsync(string tenantId, Guid? employeeId, string? status);
        Task<OvertimeRequest> CreateRequestAsync(OvertimeRequest request, string tenantId, string userId);
        Task<OvertimeRequest?> ApproveRejectAsync(Guid id, string status, string tenantId, string approvedById);
    }

    public class OvertimeService : IOvertimeService
    {
        private readonly ApplicationDbContext _ctx;
        public OvertimeService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetRequestsAsync(string tenantId, Guid? employeeId, string? status)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<OvertimeRequest> q = _ctx.OvertimeRequests.AsNoTracking().Include(r => r.Employee);
            if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId.Value);
            if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);

            return await q.OrderByDescending(r => r.Date).Select(r => (object)new
            {
                r.Id, r.EmployeeId,
                employeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                r.Date, r.StartTime, r.EndTime, r.Hours,
                r.Reason, r.Status, r.CompensationType
            }).ToListAsync();
        }

        public async Task<OvertimeRequest> CreateRequestAsync(OvertimeRequest request, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            request.TenantId = tid;
            request.Status = "Pending";
            request.Hours = (request.EndTime - request.StartTime).TotalHours;
            request.CreatedBy = userId;
            _ctx.OvertimeRequests.Add(request);
            await _ctx.SaveChangesAsync();
            return request;
        }

        public async Task<OvertimeRequest?> ApproveRejectAsync(Guid id, string status, string tenantId, string approvedById)
        {
            _ctx.SetTenantId(tenantId);
            var req = await _ctx.OvertimeRequests.FindAsync(id);
            if (req == null) return null;
            req.Status = status;
            req.ApprovedById = approvedById;
            req.ApprovedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return req;
        }
    }
}
