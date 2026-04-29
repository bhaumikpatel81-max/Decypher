using Decypher.Web.Data;
using Decypher.Web.DTOs;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    // ─── Interface ────────────────────────────────────────────────────────────

    public interface IBudgetService
    {
        // Fiscal Years
        Task<IEnumerable<BudgetFiscalYearDto>> GetFiscalYearsAsync(Guid tenantId);
        Task<BudgetFiscalYearDto> CreateFiscalYearAsync(CreateFiscalYearRequest req, Guid tenantId, string userId);
        Task<BudgetFiscalYearDto?> UpdateFiscalYearAsync(Guid id, UpdateFiscalYearRequest req, Guid tenantId, string userId);
        Task<bool> LockFiscalYearAsync(Guid id, Guid tenantId, string userId);
        Task<BudgetFiscalYearDto?> CloneFiscalYearAsync(Guid id, Guid tenantId, string userId);

        // Allocations
        Task<IEnumerable<BudgetAllocationDto>> GetAllocationsAsync(Guid tenantId, Guid? fiscalYearId, string? dept, string? q);
        Task<BudgetAllocationDto> CreateAllocationAsync(CreateAllocationRequest req, Guid tenantId, string userId);
        Task<BudgetAllocationDto?> UpdateAllocationAsync(Guid id, UpdateAllocationRequest req, Guid tenantId, string userId);
        Task<bool> DeleteAllocationAsync(Guid id, Guid tenantId);

        // Line Items
        Task<IEnumerable<BudgetLineItemDto>> GetLineItemsAsync(Guid tenantId, Guid? allocationId);
        Task<BudgetLineItemDto> CreateLineItemAsync(CreateLineItemRequest req, Guid tenantId, string userId);
        Task<BudgetLineItemDto?> UpdateLineItemAsync(Guid id, UpdateLineItemRequest req, Guid tenantId, string userId);
        Task<bool> DeleteLineItemAsync(Guid id, Guid tenantId);

        // Actuals
        Task<IEnumerable<BudgetActualDto>> GetActualsAsync(Guid tenantId, Guid? fiscalYearId, DateTime? from, DateTime? to, string? dept, Guid? vendorId);
        Task<BudgetActualDto> CreateActualAsync(CreateActualRequest req, Guid tenantId, string userId);
        Task<BudgetActualDto?> UpdateActualAsync(Guid id, UpdateActualRequest req, Guid tenantId, string userId);
        Task<bool> DeleteActualAsync(Guid id, Guid tenantId);

        // Analytics
        Task<DashboardKpiDto> GetDashboardKpisAsync(Guid tenantId, Guid fiscalYearId);
        Task<ForecastDto> GetForecastAsync(Guid tenantId, Guid fiscalYearId);
        Task<CostPerHireDto> GetCostPerHireAsync(Guid tenantId, Guid fiscalYearId);
        Task<IEnumerable<VendorSpendDto>> GetVendorSpendAsync(Guid tenantId, Guid fiscalYearId);
        Task<IEnumerable<DepartmentBreakdownDto>> GetDepartmentBreakdownAsync(Guid tenantId, Guid fiscalYearId);

        // Config
        Task<BudgetTenantConfigDto?> GetTenantConfigAsync(Guid tenantId);
        Task<BudgetTenantConfigDto> UpsertTenantConfigAsync(UpsertTenantConfigRequest req, Guid tenantId, string userId);

        // Cost Categories
        Task<IEnumerable<CostCategoryConfigDto>> GetCostCategoriesAsync(Guid tenantId);
        Task<CostCategoryConfigDto> CreateCostCategoryAsync(CreateCostCategoryRequest req, Guid tenantId, string userId);
        Task<CostCategoryConfigDto?> UpdateCostCategoryAsync(Guid id, UpdateCostCategoryRequest req, Guid tenantId, string userId);

        // Audit helpers
        Task LogActivityAsync(Guid tenantId, string userId, string action, string entityType, Guid entityId, string? changesJson = null);
    }

    // ─── Implementation ───────────────────────────────────────────────────────

    public class BudgetService : IBudgetService
    {
        private readonly ApplicationDbContext _db;

        public BudgetService(ApplicationDbContext db) => _db = db;

        private void SetTenant(Guid tenantId) => _db.SetCurrentTenant(tenantId);

        // ── Fiscal Years ──────────────────────────────────────────────────────

        public async Task<IEnumerable<BudgetFiscalYearDto>> GetFiscalYearsAsync(Guid tenantId)
        {
            SetTenant(tenantId);
            var fys = await _db.BudgetFiscalYears
                .AsNoTracking()
                .Where(f => !f.IsDeleted)
                .OrderByDescending(f => f.StartDate)
                .ToListAsync();

            var result = new List<BudgetFiscalYearDto>();
            foreach (var fy in fys)
            {
                var allocated = await _db.BudgetAllocations.AsNoTracking()
                    .Where(a => a.FiscalYearId == fy.Id && !a.IsDeleted)
                    .SumAsync(a => a.AllottedAmount);
                var spent = await _db.BudgetActuals.AsNoTracking()
                    .Where(a => a.FiscalYearId == fy.Id && !a.IsDeleted)
                    .SumAsync(a => a.Amount);
                result.Add(MapFiscalYear(fy, allocated, spent));
            }
            return result;
        }

        public async Task<BudgetFiscalYearDto> CreateFiscalYearAsync(CreateFiscalYearRequest req, Guid tenantId, string userId)
        {
            var fy = new BudgetFiscalYear
            {
                TenantId = tenantId,
                FiscalYearLabel = req.FiscalYearLabel,
                StartDate = req.StartDate,
                EndDate = req.EndDate,
                TotalBudgetAmount = req.TotalBudgetAmount,
                Currency = req.Currency,
                Notes = req.Notes,
                Status = FiscalYearStatus.Draft,
                CreatedBy = userId
            };
            _db.BudgetFiscalYears.Add(fy);
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Create", "BudgetFiscalYear", fy.Id);
            return MapFiscalYear(fy, 0, 0);
        }

        public async Task<BudgetFiscalYearDto?> UpdateFiscalYearAsync(Guid id, UpdateFiscalYearRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
            if (fy == null || fy.Status == FiscalYearStatus.Locked) return null;

            if (req.FiscalYearLabel != null) fy.FiscalYearLabel = req.FiscalYearLabel;
            if (req.StartDate.HasValue) fy.StartDate = req.StartDate.Value;
            if (req.EndDate.HasValue) fy.EndDate = req.EndDate.Value;
            if (req.TotalBudgetAmount.HasValue) fy.TotalBudgetAmount = req.TotalBudgetAmount.Value;
            if (req.Currency != null) fy.Currency = req.Currency;
            if (req.Notes != null) fy.Notes = req.Notes;
            fy.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Update", "BudgetFiscalYear", fy.Id);
            return MapFiscalYear(fy, 0, 0);
        }

        public async Task<bool> LockFiscalYearAsync(Guid id, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
            if (fy == null) return false;
            fy.Status = FiscalYearStatus.Locked;
            fy.UpdatedBy = userId;
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Lock", "BudgetFiscalYear", fy.Id);
            return true;
        }

        public async Task<BudgetFiscalYearDto?> CloneFiscalYearAsync(Guid id, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var source = await _db.BudgetFiscalYears
                .Include(f => f.Allocations).ThenInclude(a => a.LineItems)
                .FirstOrDefaultAsync(f => f.Id == id && !f.IsDeleted);
            if (source == null) return null;

            var newFy = new BudgetFiscalYear
            {
                TenantId = tenantId,
                FiscalYearLabel = $"{source.FiscalYearLabel} (Clone)",
                StartDate = source.StartDate.AddYears(1),
                EndDate = source.EndDate.AddYears(1),
                TotalBudgetAmount = source.TotalBudgetAmount,
                Currency = source.Currency,
                Status = FiscalYearStatus.Draft,
                Notes = $"Cloned from {source.FiscalYearLabel}",
                CreatedBy = userId
            };
            _db.BudgetFiscalYears.Add(newFy);
            await _db.SaveChangesAsync();

            foreach (var alloc in source.Allocations.Where(a => !a.IsDeleted))
            {
                var newAlloc = new BudgetAllocation
                {
                    TenantId = tenantId,
                    FiscalYearId = newFy.Id,
                    DepartmentName = alloc.DepartmentName,
                    DepartmentCode = alloc.DepartmentCode,
                    HeadcountPlanned = alloc.HeadcountPlanned,
                    AllottedAmount = alloc.AllottedAmount,
                    Category = alloc.Category,
                    Quarter = alloc.Quarter,
                    CreatedBy = userId
                };
                _db.BudgetAllocations.Add(newAlloc);
                await _db.SaveChangesAsync();

                foreach (var li in alloc.LineItems.Where(l => !l.IsDeleted))
                {
                    _db.BudgetLineItems.Add(new BudgetLineItem
                    {
                        TenantId = tenantId,
                        AllocationId = newAlloc.Id,
                        LineItemType = li.LineItemType,
                        PlannedAmount = li.PlannedAmount,
                        CreatedBy = userId
                    });
                }
            }
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Clone", "BudgetFiscalYear", newFy.Id,
                JsonSerializer.Serialize(new { SourceId = id }));
            return MapFiscalYear(newFy, 0, 0);
        }

        // ── Allocations ───────────────────────────────────────────────────────

        public async Task<IEnumerable<BudgetAllocationDto>> GetAllocationsAsync(Guid tenantId, Guid? fiscalYearId, string? dept, string? q)
        {
            SetTenant(tenantId);
            var query = _db.BudgetAllocations.AsNoTracking().Where(a => !a.IsDeleted);

            if (fiscalYearId.HasValue) query = query.Where(a => a.FiscalYearId == fiscalYearId.Value);
            if (!string.IsNullOrEmpty(dept)) query = query.Where(a => a.DepartmentName.Contains(dept));
            if (!string.IsNullOrEmpty(q)) query = query.Where(a => a.DepartmentName.Contains(q) || (a.DepartmentCode != null && a.DepartmentCode.Contains(q)));

            var allocs = await query.OrderBy(a => a.DepartmentName).ThenBy(a => a.Quarter).ToListAsync();

            var allocIds = allocs.Select(a => a.Id).ToList();
            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Where(a => a.AllocationId.HasValue && allocIds.Contains(a.AllocationId!.Value) && !a.IsDeleted)
                .GroupBy(a => a.AllocationId!.Value)
                .Select(g => new { AllocId = g.Key, Total = g.Sum(x => x.Amount) })
                .ToListAsync();
            var actualMap = actuals.ToDictionary(x => x.AllocId, x => x.Total);

            return allocs.Select(a =>
            {
                var spent = actualMap.GetValueOrDefault(a.Id);
                return MapAllocation(a, spent);
            });
        }

        public async Task<BudgetAllocationDto> CreateAllocationAsync(CreateAllocationRequest req, Guid tenantId, string userId)
        {
            var alloc = new BudgetAllocation
            {
                TenantId = tenantId,
                FiscalYearId = req.FiscalYearId,
                DepartmentName = req.DepartmentName,
                DepartmentCode = req.DepartmentCode,
                HeadcountPlanned = req.HeadcountPlanned,
                AllottedAmount = req.AllottedAmount,
                Category = req.Category,
                Quarter = req.Quarter,
                Notes = req.Notes,
                CreatedBy = userId
            };
            _db.BudgetAllocations.Add(alloc);
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Create", "BudgetAllocation", alloc.Id);
            return MapAllocation(alloc, 0);
        }

        public async Task<BudgetAllocationDto?> UpdateAllocationAsync(Guid id, UpdateAllocationRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var alloc = await _db.BudgetAllocations.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
            if (alloc == null) return null;

            if (req.DepartmentName != null) alloc.DepartmentName = req.DepartmentName;
            if (req.DepartmentCode != null) alloc.DepartmentCode = req.DepartmentCode;
            if (req.HeadcountPlanned.HasValue) alloc.HeadcountPlanned = req.HeadcountPlanned.Value;
            if (req.AllottedAmount.HasValue) alloc.AllottedAmount = req.AllottedAmount.Value;
            if (req.Category.HasValue) alloc.Category = req.Category.Value;
            if (req.Quarter.HasValue) alloc.Quarter = req.Quarter.Value;
            if (req.Notes != null) alloc.Notes = req.Notes;
            alloc.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Update", "BudgetAllocation", alloc.Id);
            return MapAllocation(alloc, 0);
        }

        public async Task<bool> DeleteAllocationAsync(Guid id, Guid tenantId)
        {
            SetTenant(tenantId);
            var alloc = await _db.BudgetAllocations.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
            if (alloc == null) return false;
            alloc.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }

        // ── Line Items ────────────────────────────────────────────────────────

        public async Task<IEnumerable<BudgetLineItemDto>> GetLineItemsAsync(Guid tenantId, Guid? allocationId)
        {
            SetTenant(tenantId);
            var query = _db.BudgetLineItems.AsNoTracking().Where(l => !l.IsDeleted);
            if (allocationId.HasValue) query = query.Where(l => l.AllocationId == allocationId.Value);
            return (await query.OrderBy(l => l.LineItemType).ToListAsync()).Select(MapLineItem);
        }

        public async Task<BudgetLineItemDto> CreateLineItemAsync(CreateLineItemRequest req, Guid tenantId, string userId)
        {
            var li = new BudgetLineItem
            {
                TenantId = tenantId,
                AllocationId = req.AllocationId,
                LineItemType = req.LineItemType,
                PlannedAmount = req.PlannedAmount,
                ActualAmount = req.ActualAmount,
                Notes = req.Notes,
                CreatedBy = userId
            };
            _db.BudgetLineItems.Add(li);
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Create", "BudgetLineItem", li.Id);
            return MapLineItem(li);
        }

        public async Task<BudgetLineItemDto?> UpdateLineItemAsync(Guid id, UpdateLineItemRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var li = await _db.BudgetLineItems.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
            if (li == null) return null;

            if (req.LineItemType.HasValue) li.LineItemType = req.LineItemType.Value;
            if (req.PlannedAmount.HasValue) li.PlannedAmount = req.PlannedAmount.Value;
            if (req.ActualAmount.HasValue) li.ActualAmount = req.ActualAmount.Value;
            if (req.Notes != null) li.Notes = req.Notes;
            li.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Update", "BudgetLineItem", li.Id);
            return MapLineItem(li);
        }

        public async Task<bool> DeleteLineItemAsync(Guid id, Guid tenantId)
        {
            SetTenant(tenantId);
            var li = await _db.BudgetLineItems.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
            if (li == null) return false;
            li.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }

        // ── Actuals ───────────────────────────────────────────────────────────

        public async Task<IEnumerable<BudgetActualDto>> GetActualsAsync(Guid tenantId, Guid? fiscalYearId, DateTime? from, DateTime? to, string? dept, Guid? vendorId)
        {
            SetTenant(tenantId);
            var query = _db.BudgetActuals
                .AsNoTracking()
                .Include(a => a.Vendor)
                .Where(a => !a.IsDeleted);

            if (fiscalYearId.HasValue) query = query.Where(a => a.FiscalYearId == fiscalYearId.Value);
            if (from.HasValue) query = query.Where(a => a.SpendDate >= from.Value);
            if (to.HasValue) query = query.Where(a => a.SpendDate <= to.Value);
            if (!string.IsNullOrEmpty(dept)) query = query.Where(a => a.DepartmentName != null && a.DepartmentName.Contains(dept));
            if (vendorId.HasValue) query = query.Where(a => a.VendorId == vendorId.Value);

            return (await query.OrderByDescending(a => a.SpendDate).ToListAsync()).Select(MapActual);
        }

        public async Task<BudgetActualDto> CreateActualAsync(CreateActualRequest req, Guid tenantId, string userId)
        {
            var actual = new BudgetActual
            {
                TenantId = tenantId,
                FiscalYearId = req.FiscalYearId,
                AllocationId = req.AllocationId,
                RequisitionId = req.RequisitionId,
                CandidateId = req.CandidateId,
                SpendCategory = req.SpendCategory,
                Amount = req.Amount,
                SpendDate = req.SpendDate,
                InvoiceReference = req.InvoiceReference,
                VendorId = req.VendorId,
                DepartmentName = req.DepartmentName,
                Notes = req.Notes,
                CreatedBy = userId
            };
            _db.BudgetActuals.Add(actual);
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Create", "BudgetActual", actual.Id,
                JsonSerializer.Serialize(new { req.Amount, req.SpendCategory }));
            return MapActual(actual);
        }

        public async Task<BudgetActualDto?> UpdateActualAsync(Guid id, UpdateActualRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var actual = await _db.BudgetActuals.Include(a => a.Vendor)
                .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
            if (actual == null) return null;

            if (req.SpendCategory.HasValue) actual.SpendCategory = req.SpendCategory.Value;
            if (req.Amount.HasValue) actual.Amount = req.Amount.Value;
            if (req.SpendDate.HasValue) actual.SpendDate = req.SpendDate.Value;
            if (req.InvoiceReference != null) actual.InvoiceReference = req.InvoiceReference;
            if (req.VendorId.HasValue) actual.VendorId = req.VendorId.Value;
            if (req.DepartmentName != null) actual.DepartmentName = req.DepartmentName;
            if (req.IsApproved.HasValue) actual.IsApproved = req.IsApproved.Value;
            if (req.Notes != null) actual.Notes = req.Notes;
            if (req.IsApproved == true) actual.ApprovedById = userId;
            actual.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Update", "BudgetActual", actual.Id);
            return MapActual(actual);
        }

        public async Task<bool> DeleteActualAsync(Guid id, Guid tenantId)
        {
            SetTenant(tenantId);
            var actual = await _db.BudgetActuals.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
            if (actual == null) return false;
            actual.IsDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }

        // ── Dashboard KPIs ────────────────────────────────────────────────────

        public async Task<DashboardKpiDto> GetDashboardKpisAsync(Guid tenantId, Guid fiscalYearId)
        {
            SetTenant(tenantId);

            var fy = await _db.BudgetFiscalYears.AsNoTracking()
                .FirstOrDefaultAsync(f => f.Id == fiscalYearId && !f.IsDeleted);
            if (fy == null) return new DashboardKpiDto();

            var allocations = await _db.BudgetAllocations.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();

            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Include(a => a.Vendor)
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();

            var config = await _db.BudgetTenantConfigs.AsNoTracking()
                .FirstOrDefaultAsync(c => !c.IsDeleted);

            decimal totalSpent = actuals.Sum(a => a.Amount);
            decimal totalCommitted = actuals.Where(a => !a.IsApproved).Sum(a => a.Amount);

            // Headcount: filled = candidates with Joined stage within FY window
            var fyStart = fy.StartDate;
            var fyEnd = fy.EndDate;
            var headcountFilled = await _db.Candidates.AsNoTracking()
                .Where(c => c.Stage == "Joined" && c.JoiningDate.HasValue
                    && c.JoiningDate >= fyStart && c.JoiningDate <= fyEnd)
                .CountAsync();
            var headcountInProgress = await _db.Candidates.AsNoTracking()
                .Where(c => c.Stage != "Joined" && c.Stage != "Rejected" && c.Stage != "Dropped"
                    && c.SubmittedDate >= fyStart && c.SubmittedDate <= fyEnd)
                .CountAsync();

            var totalBudget = fy.TotalBudgetAmount;
            var utilizationPct = totalBudget > 0 ? Math.Round((double)totalSpent / (double)totalBudget * 100, 1) : 0;
            var costPerHire = headcountFilled > 0 ? Math.Round(totalSpent / headcountFilled, 2) : 0;

            // Budget by department
            var deptPlanned = allocations.GroupBy(a => a.DepartmentName)
                .Select(g => new DeptBudgetSummary
                {
                    Department = g.Key,
                    Planned = g.Sum(a => a.AllottedAmount),
                    Actual = actuals.Where(x => x.DepartmentName == g.Key).Sum(x => x.Amount)
                }).ToList();

            // Budget by category
            var totalActualAmt = actuals.Sum(a => a.Amount);
            var byCategory = actuals.GroupBy(a => a.SpendCategory.ToString())
                .Select(g => new CategoryBudgetSummary
                {
                    Category = g.Key,
                    Amount = g.Sum(a => a.Amount),
                    Pct = totalActualAmt > 0 ? Math.Round((double)g.Sum(a => a.Amount) / (double)totalActualAmt * 100, 1) : 0
                }).OrderByDescending(c => c.Amount).ToList();

            // Budget by quarter
            var byQuarter = allocations.GroupBy(a => a.Quarter)
                .Select(g =>
                {
                    var qName = g.Key.ToString();
                    var qActual = GetQuarterActuals(actuals, fy, g.Key);
                    return new QuarterBudgetSummary
                    {
                        Quarter = qName,
                        Planned = g.Sum(a => a.AllottedAmount),
                        Actual = qActual,
                        HeadcountPlanned = g.Sum(a => a.HeadcountPlanned)
                    };
                }).OrderBy(q => q.Quarter).ToList();

            // Top vendors
            var topVendors = actuals.Where(a => a.VendorId.HasValue)
                .GroupBy(a => a.VendorId!.Value)
                .Select(g => new VendorSpendDto
                {
                    VendorId = g.Key,
                    VendorName = g.FirstOrDefault()?.Vendor?.VendorName ?? "Unknown",
                    TotalSpend = g.Sum(a => a.Amount),
                    TransactionCount = g.Count()
                }).OrderByDescending(v => v.TotalSpend).Take(10).ToList();

            // Monthly trend
            var monthlyTrend = BuildMonthlyTrend(fy, allocations, actuals);

            return new DashboardKpiDto
            {
                TotalBudget = totalBudget,
                TotalSpent = totalSpent,
                TotalCommitted = totalCommitted,
                Remaining = totalBudget - totalSpent,
                UtilizationPct = utilizationPct,
                HeadcountPlanned = allocations.GroupBy(a => new { a.DepartmentName, a.Quarter })
                    .Sum(g => g.Max(a => a.HeadcountPlanned)),
                HeadcountFilled = headcountFilled,
                HeadcountInProgress = headcountInProgress,
                CostPerHireActual = costPerHire,
                CostPerHireTarget = config?.CostPerHireTargetAmount ?? 0,
                BudgetByDepartment = deptPlanned,
                BudgetByCategory = byCategory,
                BudgetByQuarter = byQuarter,
                TopVendorsBySpend = topVendors,
                MonthlyTrend = monthlyTrend
            };
        }

        private static decimal GetQuarterActuals(List<BudgetActual> actuals, BudgetFiscalYear fy, BudgetQuarter quarter)
        {
            // Compute quarter date ranges relative to fiscal year start
            int months = (int)quarter * 3;
            var qStart = fy.StartDate.AddMonths(months - 3);
            var qEnd = fy.StartDate.AddMonths(months).AddDays(-1);
            return actuals.Where(a => a.SpendDate >= qStart && a.SpendDate <= qEnd).Sum(a => a.Amount);
        }

        private static List<MonthlyTrendPoint> BuildMonthlyTrend(
            BudgetFiscalYear fy, List<BudgetAllocation> allocations, List<BudgetActual> actuals)
        {
            var result = new List<MonthlyTrendPoint>();
            var totalMonths = (int)Math.Ceiling((fy.EndDate - fy.StartDate).TotalDays / 30.44);
            totalMonths = Math.Max(1, Math.Min(totalMonths, 12));

            // Distribute quarterly planned amounts evenly across 3 months
            var monthlyPlanned = new Dictionary<(int year, int month), decimal>();
            foreach (var alloc in allocations)
            {
                int qIdx = (int)alloc.Quarter; // 1-4
                var qStart = fy.StartDate.AddMonths((qIdx - 1) * 3);
                for (int m = 0; m < 3; m++)
                {
                    var d = qStart.AddMonths(m);
                    var key = (d.Year, d.Month);
                    monthlyPlanned[key] = monthlyPlanned.GetValueOrDefault(key) + alloc.AllottedAmount / 3;
                }
            }

            for (int i = 0; i < totalMonths; i++)
            {
                var d = fy.StartDate.AddMonths(i);
                var actual = actuals.Where(a => a.SpendDate.Year == d.Year && a.SpendDate.Month == d.Month)
                    .Sum(a => a.Amount);
                var key = (d.Year, d.Month);
                result.Add(new MonthlyTrendPoint
                {
                    Month = d.ToString("MMM"),
                    Year = d.Year,
                    Planned = Math.Round(monthlyPlanned.GetValueOrDefault(key), 2),
                    Actual = Math.Round(actual, 2)
                });
            }
            return result;
        }

        // ── Forecast ──────────────────────────────────────────────────────────

        public async Task<ForecastDto> GetForecastAsync(Guid tenantId, Guid fiscalYearId)
        {
            SetTenant(tenantId);
            var fy = await _db.BudgetFiscalYears.AsNoTracking()
                .FirstOrDefaultAsync(f => f.Id == fiscalYearId && !f.IsDeleted);
            if (fy == null) return new ForecastDto();

            var allocations = await _db.BudgetAllocations.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();
            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();

            var rows = allocations.GroupBy(a => a.DepartmentName)
                .Select(g =>
                {
                    var deptActuals = actuals.Where(x => x.DepartmentName == g.Key).ToList();
                    return new ForecastDeptRow
                    {
                        Department = g.Key,
                        DepartmentCode = g.FirstOrDefault()?.DepartmentCode,
                        Q1Planned = g.Where(a => a.Quarter == BudgetQuarter.Q1).Sum(a => a.AllottedAmount),
                        Q2Planned = g.Where(a => a.Quarter == BudgetQuarter.Q2).Sum(a => a.AllottedAmount),
                        Q3Planned = g.Where(a => a.Quarter == BudgetQuarter.Q3).Sum(a => a.AllottedAmount),
                        Q4Planned = g.Where(a => a.Quarter == BudgetQuarter.Q4).Sum(a => a.AllottedAmount),
                        Q1Actual = GetQuarterActuals(deptActuals, fy, BudgetQuarter.Q1),
                        Q2Actual = GetQuarterActuals(deptActuals, fy, BudgetQuarter.Q2),
                        Q3Actual = GetQuarterActuals(deptActuals, fy, BudgetQuarter.Q3),
                        Q4Actual = GetQuarterActuals(deptActuals, fy, BudgetQuarter.Q4),
                        HeadcountPlanned = g.Sum(a => a.HeadcountPlanned),
                        Allocations = g.Select(a => MapAllocation(a, 0)).ToList()
                    };
                }).OrderBy(r => r.Department).ToList();

            // Handle actuals without a matching allocation dept
            var unmatchedDepts = actuals
                .Where(a => !string.IsNullOrEmpty(a.DepartmentName) && !rows.Any(r => r.Department == a.DepartmentName))
                .GroupBy(a => a.DepartmentName!)
                .Select(g => new ForecastDeptRow
                {
                    Department = g.Key,
                    Q1Actual = GetQuarterActuals(g.ToList(), fy, BudgetQuarter.Q1),
                    Q2Actual = GetQuarterActuals(g.ToList(), fy, BudgetQuarter.Q2),
                    Q3Actual = GetQuarterActuals(g.ToList(), fy, BudgetQuarter.Q3),
                    Q4Actual = GetQuarterActuals(g.ToList(), fy, BudgetQuarter.Q4),
                });
            rows.AddRange(unmatchedDepts);

            return new ForecastDto
            {
                FiscalYearId = fiscalYearId,
                FiscalYearLabel = fy.FiscalYearLabel,
                Rows = rows,
                Totals = new ForecastTotals
                {
                    Q1Planned = rows.Sum(r => r.Q1Planned),
                    Q2Planned = rows.Sum(r => r.Q2Planned),
                    Q3Planned = rows.Sum(r => r.Q3Planned),
                    Q4Planned = rows.Sum(r => r.Q4Planned)
                }
            };
        }

        // ── Cost Per Hire ─────────────────────────────────────────────────────

        public async Task<CostPerHireDto> GetCostPerHireAsync(Guid tenantId, Guid fiscalYearId)
        {
            SetTenant(tenantId);
            var fy = await _db.BudgetFiscalYears.AsNoTracking().FirstOrDefaultAsync(f => f.Id == fiscalYearId && !f.IsDeleted);
            if (fy == null) return new CostPerHireDto();

            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();
            var config = await _db.BudgetTenantConfigs.AsNoTracking().FirstOrDefaultAsync(c => !c.IsDeleted);

            var hires = await _db.Candidates.AsNoTracking()
                .Where(c => c.Stage == "Joined" && c.JoiningDate.HasValue
                    && c.JoiningDate >= fy.StartDate && c.JoiningDate <= fy.EndDate)
                .CountAsync();

            var totalSpend = actuals.Sum(a => a.Amount);

            var byDept = actuals
                .Where(a => !string.IsNullOrEmpty(a.DepartmentName))
                .GroupBy(a => a.DepartmentName!)
                .Select(g => new CostPerHireDeptRow
                {
                    Department = g.Key,
                    TotalSpend = g.Sum(a => a.Amount),
                    Hires = 0 // would require candidate-department linkage
                }).ToList();

            var byCat = actuals.GroupBy(a => a.SpendCategory.ToString())
                .Select(g => new CostPerHireCategoryRow
                {
                    Category = g.Key,
                    Amount = g.Sum(a => a.Amount),
                    PctOfTotal = totalSpend > 0 ? Math.Round((double)g.Sum(a => a.Amount) / (double)totalSpend * 100, 1) : 0
                }).OrderByDescending(c => c.Amount).ToList();

            return new CostPerHireDto
            {
                TotalHires = hires,
                TotalSpend = totalSpend,
                OverallCostPerHire = hires > 0 ? Math.Round(totalSpend / hires, 2) : 0,
                TargetCostPerHire = config?.CostPerHireTargetAmount ?? 0,
                ByDepartment = byDept,
                ByCategory = byCat
            };
        }

        // ── Vendor Spend ──────────────────────────────────────────────────────

        public async Task<IEnumerable<VendorSpendDto>> GetVendorSpendAsync(Guid tenantId, Guid fiscalYearId)
        {
            SetTenant(tenantId);
            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Include(a => a.Vendor)
                .Where(a => a.FiscalYearId == fiscalYearId && a.VendorId.HasValue && !a.IsDeleted)
                .ToListAsync();

            return actuals.GroupBy(a => a.VendorId!.Value)
                .Select(g => new VendorSpendDto
                {
                    VendorId = g.Key,
                    VendorName = g.FirstOrDefault()?.Vendor?.VendorName ?? "Unknown",
                    TotalSpend = g.Sum(a => a.Amount),
                    TransactionCount = g.Count()
                })
                .OrderByDescending(v => v.TotalSpend);
        }

        // ── Department Breakdown ──────────────────────────────────────────────

        public async Task<IEnumerable<DepartmentBreakdownDto>> GetDepartmentBreakdownAsync(Guid tenantId, Guid fiscalYearId)
        {
            SetTenant(tenantId);
            var allocations = await _db.BudgetAllocations.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();
            var actuals = await _db.BudgetActuals.AsNoTracking()
                .Where(a => a.FiscalYearId == fiscalYearId && !a.IsDeleted).ToListAsync();
            var fy = await _db.BudgetFiscalYears.AsNoTracking().FirstOrDefaultAsync(f => f.Id == fiscalYearId && !f.IsDeleted);

            var allDepts = allocations.Select(a => a.DepartmentName)
                .Union(actuals.Where(a => a.DepartmentName != null).Select(a => a.DepartmentName!))
                .Distinct();

            return allDepts.Select(dept => new DepartmentBreakdownDto
            {
                Department = dept,
                DepartmentCode = allocations.FirstOrDefault(a => a.DepartmentName == dept)?.DepartmentCode,
                PlannedBudget = allocations.Where(a => a.DepartmentName == dept).Sum(a => a.AllottedAmount),
                ActualSpend = actuals.Where(a => a.DepartmentName == dept).Sum(a => a.Amount),
                HeadcountPlanned = allocations.Where(a => a.DepartmentName == dept).Sum(a => a.HeadcountPlanned)
            }).OrderBy(d => d.Department);
        }

        // ── Config ────────────────────────────────────────────────────────────

        public async Task<BudgetTenantConfigDto?> GetTenantConfigAsync(Guid tenantId)
        {
            SetTenant(tenantId);
            var config = await _db.BudgetTenantConfigs.AsNoTracking()
                .FirstOrDefaultAsync(c => !c.IsDeleted);
            return config == null ? null : MapConfig(config);
        }

        public async Task<BudgetTenantConfigDto> UpsertTenantConfigAsync(UpsertTenantConfigRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var existing = await _db.BudgetTenantConfigs.FirstOrDefaultAsync(c => !c.IsDeleted);

            if (existing == null)
            {
                existing = new BudgetTenantConfig { TenantId = tenantId, CreatedBy = userId };
                _db.BudgetTenantConfigs.Add(existing);
            }

            existing.FiscalYearStartMonth = req.FiscalYearStartMonth;
            existing.DefaultCurrency = req.DefaultCurrency;
            existing.BudgetApprovalRequired = req.BudgetApprovalRequired;
            existing.CostPerHireTargetAmount = req.CostPerHireTargetAmount;
            existing.ApprovalThresholdAmount = req.ApprovalThresholdAmount;
            existing.BrandColor = req.BrandColor;
            existing.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Upsert", "BudgetTenantConfig", existing.Id);
            return MapConfig(existing);
        }

        // ── Cost Categories ───────────────────────────────────────────────────

        public async Task<IEnumerable<CostCategoryConfigDto>> GetCostCategoriesAsync(Guid tenantId)
        {
            SetTenant(tenantId);
            return (await _db.BudgetCostCategoryConfigs.AsNoTracking()
                .Where(c => !c.IsDeleted)
                .OrderBy(c => c.DisplayOrder)
                .ToListAsync())
                .Select(MapCostCategory);
        }

        public async Task<CostCategoryConfigDto> CreateCostCategoryAsync(CreateCostCategoryRequest req, Guid tenantId, string userId)
        {
            var cat = new BudgetCostCategoryConfig
            {
                TenantId = tenantId,
                CategoryName = req.CategoryName,
                CategoryCode = req.CategoryCode,
                IsActive = req.IsActive,
                DisplayOrder = req.DisplayOrder,
                DefaultEstimatePerHire = req.DefaultEstimatePerHire,
                CreatedBy = userId
            };
            _db.BudgetCostCategoryConfigs.Add(cat);
            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Create", "BudgetCostCategoryConfig", cat.Id);
            return MapCostCategory(cat);
        }

        public async Task<CostCategoryConfigDto?> UpdateCostCategoryAsync(Guid id, UpdateCostCategoryRequest req, Guid tenantId, string userId)
        {
            SetTenant(tenantId);
            var cat = await _db.BudgetCostCategoryConfigs.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
            if (cat == null) return null;

            if (req.CategoryName != null) cat.CategoryName = req.CategoryName;
            if (req.CategoryCode != null) cat.CategoryCode = req.CategoryCode;
            if (req.IsActive.HasValue) cat.IsActive = req.IsActive.Value;
            if (req.DisplayOrder.HasValue) cat.DisplayOrder = req.DisplayOrder.Value;
            if (req.DefaultEstimatePerHire.HasValue) cat.DefaultEstimatePerHire = req.DefaultEstimatePerHire.Value;
            cat.UpdatedBy = userId;

            await _db.SaveChangesAsync();
            await LogActivityAsync(tenantId, userId, "Update", "BudgetCostCategoryConfig", cat.Id);
            return MapCostCategory(cat);
        }

        // ── Audit ─────────────────────────────────────────────────────────────

        public async Task LogActivityAsync(Guid tenantId, string userId, string action, string entityType, Guid entityId, string? changesJson = null)
        {
            _db.ActivityLogs.Add(new ActivityLog
            {
                TenantId = tenantId,
                UserId = userId,
                UserName = userId,
                Action = action,
                EntityType = $"Budget.{entityType}",
                EntityId = entityId,
                Description = $"{action} {entityType} {entityId}",
                Metadata = changesJson,
                Timestamp = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
        }

        // ── Mappers ───────────────────────────────────────────────────────────

        private static BudgetFiscalYearDto MapFiscalYear(BudgetFiscalYear fy, decimal allocated, decimal spent) => new()
        {
            Id = fy.Id,
            FiscalYearLabel = fy.FiscalYearLabel,
            StartDate = fy.StartDate,
            EndDate = fy.EndDate,
            TotalBudgetAmount = fy.TotalBudgetAmount,
            Currency = fy.Currency,
            Status = fy.Status.ToString(),
            Notes = fy.Notes,
            CreatedAt = fy.CreatedAt,
            UpdatedAt = fy.UpdatedAt,
            TotalAllocated = allocated,
            TotalSpent = spent,
            Remaining = fy.TotalBudgetAmount - spent
        };

        private static BudgetAllocationDto MapAllocation(BudgetAllocation a, decimal spent) => new()
        {
            Id = a.Id,
            FiscalYearId = a.FiscalYearId,
            DepartmentName = a.DepartmentName,
            DepartmentCode = a.DepartmentCode,
            HeadcountPlanned = a.HeadcountPlanned,
            AllottedAmount = a.AllottedAmount,
            Category = a.Category.ToString(),
            Quarter = a.Quarter.ToString(),
            Notes = a.Notes,
            CreatedAt = a.CreatedAt,
            ActualSpend = spent,
            Variance = a.AllottedAmount - spent,
            UtilizationPct = a.AllottedAmount > 0 ? Math.Round((double)spent / (double)a.AllottedAmount * 100, 1) : 0
        };

        private static BudgetLineItemDto MapLineItem(BudgetLineItem l) => new()
        {
            Id = l.Id,
            AllocationId = l.AllocationId,
            LineItemType = l.LineItemType.ToString(),
            PlannedAmount = l.PlannedAmount,
            ActualAmount = l.ActualAmount,
            Notes = l.Notes,
            CreatedAt = l.CreatedAt
        };

        private static BudgetActualDto MapActual(BudgetActual a) => new()
        {
            Id = a.Id,
            FiscalYearId = a.FiscalYearId,
            AllocationId = a.AllocationId,
            RequisitionId = a.RequisitionId,
            CandidateId = a.CandidateId,
            SpendCategory = a.SpendCategory.ToString(),
            Amount = a.Amount,
            SpendDate = a.SpendDate,
            InvoiceReference = a.InvoiceReference,
            VendorId = a.VendorId,
            VendorName = a.Vendor?.VendorName,
            ApprovedById = a.ApprovedById,
            DepartmentName = a.DepartmentName,
            IsApproved = a.IsApproved,
            Notes = a.Notes,
            CreatedAt = a.CreatedAt
        };

        private static BudgetTenantConfigDto MapConfig(BudgetTenantConfig c) => new()
        {
            Id = c.Id,
            FiscalYearStartMonth = c.FiscalYearStartMonth,
            DefaultCurrency = c.DefaultCurrency,
            BudgetApprovalRequired = c.BudgetApprovalRequired,
            CostPerHireTargetAmount = c.CostPerHireTargetAmount,
            ApprovalThresholdAmount = c.ApprovalThresholdAmount,
            BrandColor = c.BrandColor
        };

        private static CostCategoryConfigDto MapCostCategory(BudgetCostCategoryConfig c) => new()
        {
            Id = c.Id,
            CategoryName = c.CategoryName,
            CategoryCode = c.CategoryCode,
            IsActive = c.IsActive,
            DisplayOrder = c.DisplayOrder,
            DefaultEstimatePerHire = c.DefaultEstimatePerHire
        };
    }
}
