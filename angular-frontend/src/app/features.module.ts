import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared.module';
// Recruitment
import { VendorsComponent } from './vendors/vendors.component';
import { PipelineBoardComponent } from './pipeline-board/pipeline-board.component';
import { CandidatePortalComponent } from './candidate-portal/candidate-portal.component';
import { InterviewSchedulerComponent } from './interview-scheduler/interview-scheduler.component';
import { OfferManagementComponent } from './offer-management/offer-management.component';
import { TalentPoolComponent } from './talent-pool/talent-pool.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { SourceTrackingComponent } from './source-tracking/source-tracking.component';
import { JobBroadcastingComponent } from './job-broadcasting/job-broadcasting.component';
import { VideoInterviewsComponent } from './video-interviews/video-interviews.component';
// Core HR
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { LettersCertificatesComponent } from './letters-certificates/letters-certificates.component';
import { ExitManagementComponent } from './exit-management/exit-management.component';
import { InternalJobPostingsComponent } from './internal-job-postings/internal-job-postings.component';
// Attendance & Time
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { ShiftManagementComponent } from './shift-management/shift-management.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
// Payroll
import { PayrollComponent } from './payroll/payroll.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';
import { TaxStatutoryComponent } from './tax-statutory/tax-statutory.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { PayslipPortalComponent } from './payslip-portal/payslip-portal.component';
// Compensation & Benefits
import { CompensationPlanningComponent } from './compensation-planning/compensation-planning.component';
import { BenefitsAdminComponent } from './benefits-admin/benefits-admin.component';
import { SalaryBenchmarkingComponent } from './salary-benchmarking/salary-benchmarking.component';
import { BonusIncentivesComponent } from './bonus-incentives/bonus-incentives.component';
// Performance Management
import { GoalsOkrComponent } from './goals-okr/goals-okr.component';
import { PerformanceReviewsComponent } from './performance-reviews/performance-reviews.component';
import { Feedback360Component } from './feedback-360/feedback360.component';
import { ContinuousFeedbackComponent } from './continuous-feedback/continuous-feedback.component';
// Learning & Development
import { LearningManagementComponent } from './learning-management/learning-management.component';
import { TrainingCalendarComponent } from './training-calendar/training-calendar.component';
import { SkillGapComponent } from './skill-gap/skill-gap.component';
import { CertificationTrackerComponent } from './certification-tracker/certification-tracker.component';
// Talent & Engagement
import { OnboardingComponent } from './onboarding/onboarding.component';
import { CommunicationCenterComponent } from './communication-center/communication-center.component';
// Employer Branding
import { CareersBuilderComponent } from './careers-builder/careers-builder.component';
import { TalentCommunityComponent } from './talent-community/talent-community.component';
import { SocialRecruitingComponent } from './social-recruiting/social-recruiting.component';
import { CampusConnectComponent } from './campus-connect/campus-connect.component';
import { EmployeeAdvocacyComponent } from './employee-advocacy/employee-advocacy.component';
import { EmployerReviewsComponent } from './employer-reviews/employer-reviews.component';
// AI & Intelligence
import { ResumeParserComponent } from './resume-parser/resume-parser.component';
import { AIScorecardComponent } from './ai-scorecard/ai-scorecard.component';
import { AIFeaturesComponent } from './ai-features/ai-features.component';
import { JdGeneratorComponent } from './jd-generator/jd-generator.component';
// Analytics
import { ReportsComponent } from './reports/reports.component';
import { SlaDashboardComponent } from './sla-dashboard/sla-dashboard.component';
import { BudgetComponent } from './budget/budget.component';
// Policies & Compliance
import { PolicyManagementComponent } from './policy-management/policy-management.component';
import { StatutoryComplianceComponent } from './statutory-compliance/statutory-compliance.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
// Administration
import { ImportCenterComponent } from './import-center/import-center.component';
import { IntegrationsHubComponent } from './integrations-hub/integrations-hub.component';

@NgModule({
  declarations: [
    VendorsComponent,
    PipelineBoardComponent, CandidatePortalComponent, InterviewSchedulerComponent,
    OfferManagementComponent, TalentPoolComponent, RequisitionsComponent,
    SourceTrackingComponent, JobBroadcastingComponent, VideoInterviewsComponent,
    EmployeeDirectoryComponent, OrgChartComponent, DocumentManagementComponent,
    LettersCertificatesComponent, ExitManagementComponent, InternalJobPostingsComponent,
    AttendanceComponent, LeaveManagementComponent, ShiftManagementComponent,
    TimesheetComponent, OvertimeComponent,
    PayrollComponent, SalaryStructureComponent, TaxStatutoryComponent,
    ExpenseManagementComponent, PayslipPortalComponent,
    CompensationPlanningComponent, BenefitsAdminComponent,
    SalaryBenchmarkingComponent, BonusIncentivesComponent,
    GoalsOkrComponent, PerformanceReviewsComponent, Feedback360Component,
    ContinuousFeedbackComponent,
    LearningManagementComponent, TrainingCalendarComponent,
    SkillGapComponent, CertificationTrackerComponent,
    OnboardingComponent, CommunicationCenterComponent,
    CareersBuilderComponent, TalentCommunityComponent, SocialRecruitingComponent,
    CampusConnectComponent, EmployeeAdvocacyComponent, EmployerReviewsComponent,
    ResumeParserComponent, AIScorecardComponent, AIFeaturesComponent, JdGeneratorComponent,
    ReportsComponent, SlaDashboardComponent, BudgetComponent,
    PolicyManagementComponent, StatutoryComplianceComponent,
    ComplianceComponent, AuditTrailComponent,
    ImportCenterComponent, IntegrationsHubComponent,
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    MatMenuModule, MatDividerModule, MatTabsModule, MatCardModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatProgressBarModule, MatSlideToggleModule, MatTooltipModule,
    MatDialogModule, MatSidenavModule, MatChipsModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    RouterModule.forChild([
      { path: 'vendors',               component: VendorsComponent },
      { path: 'pipeline-board',        component: PipelineBoardComponent },
      { path: 'requisitions',          component: RequisitionsComponent },
      { path: 'candidate-portal',      component: CandidatePortalComponent },
      { path: 'interview-scheduler',   component: InterviewSchedulerComponent },
      { path: 'offer-management',      component: OfferManagementComponent },
      { path: 'source-tracking',       component: SourceTrackingComponent },
      { path: 'job-broadcasting',      component: JobBroadcastingComponent },
      { path: 'video-interviews',      component: VideoInterviewsComponent },
      { path: 'employee-directory',    component: EmployeeDirectoryComponent },
      { path: 'org-chart',             component: OrgChartComponent },
      { path: 'document-management',   component: DocumentManagementComponent },
      { path: 'letters-certificates',  component: LettersCertificatesComponent },
      { path: 'exit-management',       component: ExitManagementComponent },
      { path: 'internal-job-postings', component: InternalJobPostingsComponent },
      { path: 'attendance',            component: AttendanceComponent },
      { path: 'leave-management',      component: LeaveManagementComponent },
      { path: 'shift-management',      component: ShiftManagementComponent },
      { path: 'timesheet',             component: TimesheetComponent },
      { path: 'overtime',              component: OvertimeComponent },
      { path: 'payroll',               component: PayrollComponent },
      { path: 'salary-structure',      component: SalaryStructureComponent },
      { path: 'tax-statutory',         component: TaxStatutoryComponent },
      { path: 'expense-management',    component: ExpenseManagementComponent },
      { path: 'payslip-portal',        component: PayslipPortalComponent },
      { path: 'compensation-planning', component: CompensationPlanningComponent },
      { path: 'benefits-admin',        component: BenefitsAdminComponent },
      { path: 'salary-benchmarking',   component: SalaryBenchmarkingComponent },
      { path: 'bonus-incentives',      component: BonusIncentivesComponent },
      { path: 'goals-okr',             component: GoalsOkrComponent },
      { path: 'performance-reviews',   component: PerformanceReviewsComponent },
      { path: 'feedback-360',          component: Feedback360Component },
      { path: 'continuous-feedback',   component: ContinuousFeedbackComponent },
      { path: 'learning-management',   component: LearningManagementComponent },
      { path: 'training-calendar',     component: TrainingCalendarComponent },
      { path: 'skill-gap',             component: SkillGapComponent },
      { path: 'certification-tracker', component: CertificationTrackerComponent },
      { path: 'onboarding',            component: OnboardingComponent },
      { path: 'talent-pool',           component: TalentPoolComponent },
      { path: 'communications',        component: CommunicationCenterComponent },
      { path: 'careers-builder',       component: CareersBuilderComponent },
      { path: 'talent-community',      component: TalentCommunityComponent },
      { path: 'social-recruiting',     component: SocialRecruitingComponent },
      { path: 'campus-connect',        component: CampusConnectComponent },
      { path: 'employee-advocacy',     component: EmployeeAdvocacyComponent },
      { path: 'employer-reviews',      component: EmployerReviewsComponent },
      { path: 'resume-parser',         component: ResumeParserComponent },
      { path: 'ai-scorecard',          component: AIScorecardComponent },
      { path: 'ai-features',           component: AIFeaturesComponent },
      { path: 'jd-generator',          component: JdGeneratorComponent },
      { path: 'reports',               component: ReportsComponent },
      { path: 'sla-dashboard',         component: SlaDashboardComponent },
      { path: 'budget',                component: BudgetComponent },
      { path: 'policy-management',     component: PolicyManagementComponent },
      { path: 'statutory-compliance',  component: StatutoryComplianceComponent },
      { path: 'compliance',            component: ComplianceComponent },
      { path: 'audit-trail',           component: AuditTrailComponent },
      { path: 'import-center',         component: ImportCenterComponent },
      { path: 'integrations',          component: IntegrationsHubComponent },
    ])
  ]
})
export class FeaturesModule {}
