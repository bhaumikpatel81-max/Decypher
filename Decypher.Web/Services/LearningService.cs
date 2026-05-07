using Decypher.Web.Data;
using Decypher.Web.Models.HRModels;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services;

// ─── Learning Management System ───────────────────────────────────────────────
public interface ILearningService
{
    Task<List<Course>> GetCoursesAsync(string? category, string? status, string? search);
    Task<Course> GetCourseByIdAsync(Guid id);
    Task<Course> CreateCourseAsync(Course course);
    Task<Course> UpdateCourseAsync(Guid id, Course updated);
    Task DeleteCourseAsync(Guid id);
    Task<CourseEnrollment> EnrollAsync(Guid courseId, Guid employeeId);
    Task<CourseEnrollment> UpdateProgressAsync(Guid enrollmentId, int progressPercent, string? lastModule);
    Task<CourseEnrollment> CompleteAsync(Guid enrollmentId, decimal? score);
    Task<List<CourseEnrollment>> GetEnrollmentsAsync(Guid? employeeId, Guid? courseId, string? status);
    Task<object> GetLmsStatsAsync();
}

public class LearningService(ApplicationDbContext db, IHttpContextAccessor http) : ILearningService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<Course>> GetCoursesAsync(string? category, string? status, string? search)
    {
        var q = db.Courses.AsNoTracking().Where(c => c.TenantId == TenantId && !c.IsDeleted);
        if (!string.IsNullOrEmpty(category)) q = q.Where(c => c.Category == category);
        if (!string.IsNullOrEmpty(status)) q = q.Where(c => c.Status == status);
        if (!string.IsNullOrEmpty(search))
            q = q.Where(c => c.Title.Contains(search) || c.Description.Contains(search));
        return await q.OrderByDescending(c => c.CreatedAt).ToListAsync();
    }

    public async Task<Course> GetCourseByIdAsync(Guid id)
    {
        return await db.Courses.Include(c => c.Enrollments).AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Course not found");
    }

    public async Task<Course> CreateCourseAsync(Course course)
    {
        course.Id = Guid.NewGuid();
        course.TenantId = TenantId;
        course.CreatedBy = UserId;
        course.CreatedAt = DateTime.UtcNow;
        course.Status = "Draft";
        db.Courses.Add(course);
        await db.SaveChangesAsync();
        return course;
    }

    public async Task<Course> UpdateCourseAsync(Guid id, Course updated)
    {
        var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Course not found");

        course.Title = updated.Title;
        course.Description = updated.Description;
        course.Category = updated.Category;
        course.Provider = updated.Provider;
        course.DurationHours = updated.DurationHours;
        course.Mode = updated.Mode;
        course.Status = updated.Status;
        course.ThumbnailUrl = updated.ThumbnailUrl;
        course.ContentUrl = updated.ContentUrl;
        course.Tags = updated.Tags;
        course.UpdatedAt = DateTime.UtcNow;
        course.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return course;
    }

    public async Task DeleteCourseAsync(Guid id)
    {
        var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Course not found");
        course.IsDeleted = true;
        course.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<CourseEnrollment> EnrollAsync(Guid courseId, Guid employeeId)
    {
        var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == courseId && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Course not found");

        if (await db.CourseEnrollments.AnyAsync(e => e.CourseId == courseId && e.EmployeeId == employeeId && !e.IsDeleted))
            throw new InvalidOperationException("Already enrolled in this course");

        var enrollment = new CourseEnrollment
        {
            Id = Guid.NewGuid(),
            TenantId = TenantId,
            CourseId = courseId,
            EmployeeId = employeeId,
            Status = "Enrolled",
            EnrolledAt = DateTime.UtcNow,
            ProgressPercent = 0,
            CreatedBy = UserId,
            CreatedAt = DateTime.UtcNow
        };
        db.CourseEnrollments.Add(enrollment);
        await db.SaveChangesAsync();
        return enrollment;
    }

    public async Task<CourseEnrollment> UpdateProgressAsync(Guid enrollmentId, int progressPercent, string? lastModule)
    {
        var enrollment = await db.CourseEnrollments.FirstOrDefaultAsync(e => e.Id == enrollmentId && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Enrollment not found");

        enrollment.ProgressPercent = Math.Clamp(progressPercent, 0, 100);
        enrollment.LastModule = lastModule ?? enrollment.LastModule;
        enrollment.Status = enrollment.ProgressPercent > 0 ? "InProgress" : enrollment.Status;
        enrollment.UpdatedAt = DateTime.UtcNow;
        enrollment.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return enrollment;
    }

    public async Task<CourseEnrollment> CompleteAsync(Guid enrollmentId, decimal? score)
    {
        var enrollment = await db.CourseEnrollments.FirstOrDefaultAsync(e => e.Id == enrollmentId && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Enrollment not found");

        enrollment.Status = "Completed";
        enrollment.ProgressPercent = 100;
        enrollment.Score = score;
        enrollment.CompletedAt = DateTime.UtcNow;
        enrollment.UpdatedAt = DateTime.UtcNow;
        enrollment.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return enrollment;
    }

    public async Task<List<CourseEnrollment>> GetEnrollmentsAsync(Guid? employeeId, Guid? courseId, string? status)
    {
        var q = db.CourseEnrollments.Include(e => e.Course).AsNoTracking()
            .Where(e => e.TenantId == TenantId && !e.IsDeleted);
        if (employeeId.HasValue) q = q.Where(e => e.EmployeeId == employeeId);
        if (courseId.HasValue) q = q.Where(e => e.CourseId == courseId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(e => e.Status == status);
        return await q.OrderByDescending(e => e.EnrolledAt).ToListAsync();
    }

    public async Task<object> GetLmsStatsAsync()
    {
        var enrollments = await db.CourseEnrollments.AsNoTracking()
            .Where(e => e.TenantId == TenantId && !e.IsDeleted).ToListAsync();
        var courses = await db.Courses.AsNoTracking()
            .Where(c => c.TenantId == TenantId && !c.IsDeleted).ToListAsync();

        return new
        {
            TotalCourses = courses.Count,
            ActiveCourses = courses.Count(c => c.Status == "Published"),
            TotalEnrollments = enrollments.Count,
            Completed = enrollments.Count(e => e.Status == "Completed"),
            InProgress = enrollments.Count(e => e.Status == "InProgress"),
            CompletionRate = enrollments.Any()
                ? Math.Round((double)enrollments.Count(e => e.Status == "Completed") / enrollments.Count * 100, 1)
                : 0,
            AverageScore = enrollments.Where(e => e.Score.HasValue).Any()
                ? Math.Round((double)enrollments.Where(e => e.Score.HasValue).Average(e => (double)e.Score!.Value), 1)
                : 0
        };
    }
}

// ─── Training Events ──────────────────────────────────────────────────────────
public interface ITrainingService
{
    Task<List<TrainingEvent>> GetEventsAsync(DateTime? from, DateTime? to, string? mode);
    Task<TrainingEvent> GetEventByIdAsync(Guid id);
    Task<TrainingEvent> CreateEventAsync(TrainingEvent trainingEvent);
    Task<TrainingEvent> UpdateEventAsync(Guid id, TrainingEvent updated);
    Task DeleteEventAsync(Guid id);
    Task<TrainingRegistration> RegisterAsync(Guid eventId, Guid employeeId);
    Task<TrainingRegistration> UpdateAttendanceAsync(Guid registrationId, bool attended, decimal? score);
    Task<List<TrainingRegistration>> GetRegistrationsAsync(Guid? eventId, Guid? employeeId);
}

public class TrainingService(ApplicationDbContext db, IHttpContextAccessor http) : ITrainingService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<TrainingEvent>> GetEventsAsync(DateTime? from, DateTime? to, string? mode)
    {
        var q = db.TrainingEvents.AsNoTracking().Where(e => e.TenantId == TenantId && !e.IsDeleted);
        if (from.HasValue) q = q.Where(e => e.StartDate >= from.Value);
        if (to.HasValue) q = q.Where(e => e.StartDate <= to.Value);
        if (!string.IsNullOrEmpty(mode)) q = q.Where(e => e.Mode == mode);
        return await q.OrderBy(e => e.StartDate).ToListAsync();
    }

    public async Task<TrainingEvent> GetEventByIdAsync(Guid id)
    {
        return await db.TrainingEvents.Include(e => e.Registrations).AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Training event not found");
    }

    public async Task<TrainingEvent> CreateEventAsync(TrainingEvent trainingEvent)
    {
        trainingEvent.Id = Guid.NewGuid();
        trainingEvent.TenantId = TenantId;
        trainingEvent.CreatedBy = UserId;
        trainingEvent.CreatedAt = DateTime.UtcNow;
        trainingEvent.Status = "Scheduled";
        db.TrainingEvents.Add(trainingEvent);
        await db.SaveChangesAsync();
        return trainingEvent;
    }

    public async Task<TrainingEvent> UpdateEventAsync(Guid id, TrainingEvent updated)
    {
        var ev = await db.TrainingEvents.FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Training event not found");

        ev.Title = updated.Title;
        ev.Description = updated.Description;
        ev.Trainer = updated.Trainer;
        ev.Mode = updated.Mode;
        ev.StartDate = updated.StartDate;
        ev.EndDate = updated.EndDate;
        ev.Venue = updated.Venue;
        ev.MaxParticipants = updated.MaxParticipants;
        ev.Status = updated.Status;
        ev.UpdatedAt = DateTime.UtcNow;
        ev.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return ev;
    }

    public async Task DeleteEventAsync(Guid id)
    {
        var ev = await db.TrainingEvents.FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Training event not found");
        ev.IsDeleted = true;
        ev.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<TrainingRegistration> RegisterAsync(Guid eventId, Guid employeeId)
    {
        var ev = await db.TrainingEvents.FirstOrDefaultAsync(e => e.Id == eventId && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Training event not found");

        if (await db.TrainingRegistrations.AnyAsync(r => r.TrainingEventId == eventId && r.EmployeeId == employeeId && !r.IsDeleted))
            throw new InvalidOperationException("Already registered for this training");

        var currentCount = await db.TrainingRegistrations.CountAsync(r => r.TrainingEventId == eventId && !r.IsDeleted);
        if (ev.MaxParticipants.HasValue && currentCount >= ev.MaxParticipants.Value)
            throw new InvalidOperationException("Training event is full");

        var reg = new TrainingRegistration
        {
            Id = Guid.NewGuid(),
            TenantId = TenantId,
            TrainingEventId = eventId,
            EmployeeId = employeeId,
            Status = "Registered",
            RegisteredAt = DateTime.UtcNow,
            CreatedBy = UserId,
            CreatedAt = DateTime.UtcNow
        };
        db.TrainingRegistrations.Add(reg);
        await db.SaveChangesAsync();
        return reg;
    }

    public async Task<TrainingRegistration> UpdateAttendanceAsync(Guid registrationId, bool attended, decimal? score)
    {
        var reg = await db.TrainingRegistrations.FirstOrDefaultAsync(r => r.Id == registrationId && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Registration not found");

        reg.Attended = attended;
        reg.Score = score;
        reg.Status = attended ? "Attended" : "Absent";
        reg.UpdatedAt = DateTime.UtcNow;
        reg.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return reg;
    }

    public async Task<List<TrainingRegistration>> GetRegistrationsAsync(Guid? eventId, Guid? employeeId)
    {
        var q = db.TrainingRegistrations.Include(r => r.TrainingEvent).AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (eventId.HasValue) q = q.Where(r => r.TrainingEventId == eventId);
        if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId);
        return await q.OrderByDescending(r => r.RegisteredAt).ToListAsync();
    }
}

// ─── Skill Gap & Certifications ───────────────────────────────────────────────
public interface ISkillService
{
    Task<List<SkillAssessment>> GetAssessmentsAsync(Guid? employeeId, string? skill, string? department);
    Task<SkillAssessment> SaveAssessmentAsync(SkillAssessment assessment);
    Task<object> GetSkillGapAnalysisAsync(string? department, string? role);
    Task<List<CertificationRecord>> GetCertificationsAsync(Guid? employeeId, bool? expiringSoon);
    Task<CertificationRecord> AddCertificationAsync(CertificationRecord cert);
    Task<CertificationRecord> UpdateCertificationAsync(Guid id, CertificationRecord updated);
    Task DeleteCertificationAsync(Guid id);
}

public class SkillService(ApplicationDbContext db, IHttpContextAccessor http) : ISkillService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<SkillAssessment>> GetAssessmentsAsync(Guid? employeeId, string? skill, string? department)
    {
        var q = db.SkillAssessments.AsNoTracking().Where(a => a.TenantId == TenantId && !a.IsDeleted);
        if (employeeId.HasValue) q = q.Where(a => a.EmployeeId == employeeId);
        if (!string.IsNullOrEmpty(skill)) q = q.Where(a => a.SkillName.Contains(skill));
        if (!string.IsNullOrEmpty(department))
        {
            var empIds = await db.Employees.AsNoTracking()
                .Where(e => e.TenantId == TenantId && e.Department == department && !e.IsDeleted)
                .Select(e => e.Id).ToListAsync();
            q = q.Where(a => empIds.Contains(a.EmployeeId));
        }
        return await q.OrderBy(a => a.SkillName).ToListAsync();
    }

    public async Task<SkillAssessment> SaveAssessmentAsync(SkillAssessment assessment)
    {
        var existing = await db.SkillAssessments.FirstOrDefaultAsync(a =>
            a.EmployeeId == assessment.EmployeeId && a.SkillName == assessment.SkillName
            && a.TenantId == TenantId && !a.IsDeleted);

        if (existing != null)
        {
            existing.CurrentLevel = assessment.CurrentLevel;
            existing.TargetLevel = assessment.TargetLevel;
            existing.AssessedBy = assessment.AssessedBy;
            existing.AssessedDate = assessment.AssessedDate;
            existing.Notes = assessment.Notes;
            existing.UpdatedAt = DateTime.UtcNow;
            existing.UpdatedBy = UserId;
            await db.SaveChangesAsync();
            return existing;
        }

        assessment.Id = Guid.NewGuid();
        assessment.TenantId = TenantId;
        assessment.CreatedBy = UserId;
        assessment.CreatedAt = DateTime.UtcNow;
        db.SkillAssessments.Add(assessment);
        await db.SaveChangesAsync();
        return assessment;
    }

    public async Task<object> GetSkillGapAnalysisAsync(string? department, string? role)
    {
        var q = db.SkillAssessments.AsNoTracking().Where(a => a.TenantId == TenantId && !a.IsDeleted);
        if (!string.IsNullOrEmpty(department))
        {
            var empIds = await db.Employees.AsNoTracking()
                .Where(e => e.TenantId == TenantId && e.Department == department && !e.IsDeleted)
                .Select(e => e.Id).ToListAsync();
            q = q.Where(a => empIds.Contains(a.EmployeeId));
        }

        var assessments = await q.ToListAsync();
        return new
        {
            TotalAssessed = assessments.Select(a => a.EmployeeId).Distinct().Count(),
            SkillGaps = assessments
                .Where(a => a.CurrentLevel < a.TargetLevel)
                .GroupBy(a => a.SkillName)
                .Select(g => new
                {
                    Skill = g.Key,
                    EmployeesWithGap = g.Count(),
                    AverageGap = Math.Round(g.Average(a => (double)(a.TargetLevel - a.CurrentLevel)), 1)
                })
                .OrderByDescending(x => x.AverageGap)
                .Take(10),
            TopSkills = assessments.GroupBy(a => a.SkillName)
                .Select(g => new { Skill = g.Key, Count = g.Count(), AvgLevel = Math.Round(g.Average(a => (double)a.CurrentLevel), 1) })
                .OrderByDescending(x => x.Count).Take(10)
        };
    }

    public async Task<List<CertificationRecord>> GetCertificationsAsync(Guid? employeeId, bool? expiringSoon)
    {
        var q = db.CertificationRecords.AsNoTracking().Where(c => c.TenantId == TenantId && !c.IsDeleted);
        if (employeeId.HasValue) q = q.Where(c => c.EmployeeId == employeeId);
        if (expiringSoon == true)
        {
            var threshold = DateTime.UtcNow.AddDays(30);
            q = q.Where(c => c.ExpiryDate.HasValue && c.ExpiryDate.Value <= threshold && c.ExpiryDate.Value >= DateTime.UtcNow);
        }
        return await q.OrderByDescending(c => c.IssuedDate).ToListAsync();
    }

    public async Task<CertificationRecord> AddCertificationAsync(CertificationRecord cert)
    {
        cert.Id = Guid.NewGuid();
        cert.TenantId = TenantId;
        cert.CreatedBy = UserId;
        cert.CreatedAt = DateTime.UtcNow;
        cert.Status = "Active";
        db.CertificationRecords.Add(cert);
        await db.SaveChangesAsync();
        return cert;
    }

    public async Task<CertificationRecord> UpdateCertificationAsync(Guid id, CertificationRecord updated)
    {
        var cert = await db.CertificationRecords.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Certification not found");

        cert.Name = updated.Name;
        cert.IssuingBody = updated.IssuingBody;
        cert.CertificateNumber = updated.CertificateNumber;
        cert.IssuedDate = updated.IssuedDate;
        cert.ExpiryDate = updated.ExpiryDate;
        cert.Status = updated.Status;
        cert.DocumentUrl = updated.DocumentUrl;
        cert.UpdatedAt = DateTime.UtcNow;
        cert.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return cert;
    }

    public async Task DeleteCertificationAsync(Guid id)
    {
        var cert = await db.CertificationRecords.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Certification not found");
        cert.IsDeleted = true;
        cert.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }
}
