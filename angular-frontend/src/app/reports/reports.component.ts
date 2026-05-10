import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

const CHART_ICONS: Record<string, string> = { bar: '📊', dualLine: '📈', kpiTable: '🗂️', funnel: '🔽', donut: '🍩'
};
const FREQ_COLORS: Record<string, string> = { Monthly: '#0ea5e9', Weekly: '#f97316', Quarterly: '#8b5cf6'
};

interface ReportMeta { key: string; label: string; icon: string; freq: string; chartType: string; desc: string;
}
interface Section { label: string; sub?: string; reports: ReportMeta[]; }

// ── HR — Recruitment (existing reports, unchanged) ────────────────────────────
const HR_REC_STANDARD: ReportMeta[] = [
  { key: 'requisition-aging',      label: 'Requisition Aging',        icon: '📋', freq: 'Monthly',   chartType: 'bar',     desc: 'Days open + overdue tracking per dept.' },
  { key: 'vendor-performance',     label: 'Vendor Performance',        icon: '🏢', freq: 'Monthly',   chartType: 'bar',     desc: 'Submission, selection & joining rate per vendor.' },
  { key: 'candidate-funnel',       label: 'Candidate Funnel',          icon: '🔽', freq: 'Monthly',   chartType: 'funnel',  desc: 'Stage-wise conversion across full pipeline.' },
  { key: 'offer-dropout',          label: 'Offer & Dropout Analysis',  icon: '📉', freq: 'Monthly',   chartType: 'bar',     desc: 'Offers made, accepted, rejected and reasons.' },
  { key: 'time-to-hire',           label: 'Time-to-Hire',              icon: '⏱️', freq: 'Monthly',   chartType: 'bar',     desc: 'Avg TAT per requisition vs target.' },
  { key: 'source-effectiveness',   label: 'Source Effectiveness',      icon: '📡', freq: 'Monthly',   chartType: 'bar',     desc: 'ROI by sourcing channel.' },
  { key: 'budget-utilisation',     label: 'Budget Utilisation',        icon: '💰', freq: 'Monthly',   chartType: 'bar',     desc: 'Allocated vs spent per department.' },
  { key: 'recruiter-productivity', label: 'Recruiter Productivity',    icon: '🧑‍💼', freq: 'Monthly',  chartType: 'bar',     desc: 'Submissions, selections, joinings per recruiter.' },
  { key: 'sla-compliance',         label: 'SLA Compliance',            icon: '🎯', freq: 'Monthly',   chartType: 'bar',     desc: 'On-track vs overdue by stage.' },
  { key: 'diversity-hiring',       label: 'Diversity & Hiring Mix',    icon: '📊', freq: 'Monthly',   chartType: 'donut',   desc: 'Headcount by type across departments.' },
  { key: 'talent-pool-health',     label: 'Talent Pool Health',        icon: '🌱', freq: 'Monthly',   chartType: 'donut',   desc: 'Active / passive / do-not-contact breakdown.' },
  { key: 'internal-mobility',      label: 'Internal Mobility',         icon: '🔄', freq: 'Monthly',   chartType: 'bar',     desc: 'Internal postings and application fill rate.' },
];
const HR_REC_P3: ReportMeta[] = [
  { key: 'ta-volume-by-bu',        label: 'TA Volume by BU + Project', icon: '📊', freq: 'Monthly',   chartType: 'bar',      desc: 'Total positions raised per BU and project.' },
  { key: 'full-year-demand',       label: 'Full Year Demand + Phasing',icon: '📈', freq: 'Quarterly', chartType: 'dualLine', desc: 'Demand vs fulfilled across 12 months (fiscal year).' },
  { key: 'open-positions-aging',   label: 'Open Positions + Aging',    icon: '🗂️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Open reqs with age, grade, P1/P2/P3 criticality.' },
  { key: 'positions-closed-mtd',   label: 'Positions Closed MTD',      icon: '✅', freq: 'Monthly',   chartType: 'bar',      desc: 'Month-to-date closures per BU.' },
  { key: 'cost-per-hire',          label: 'Cost per Hire',             icon: '💵', freq: 'Monthly',   chartType: 'bar',      desc: 'Avg cost per hire per BU vs org benchmark.' },
  { key: 'hiring-pipeline-stage',  label: 'Hiring Pipeline by Stage',  icon: '🔽', freq: 'Weekly',    chartType: 'funnel',   desc: 'Screen → Phone → Tech → Final → Offer funnel.' },
  { key: 'avg-time-to-hire',       label: 'Avg Time to Hire',          icon: '⏱️', freq: 'Monthly',   chartType: 'bar',      desc: 'Avg days to close per BU with target line.' },
  { key: 'gender-ratio-hiring',    label: 'Gender Ratio in Hiring',    icon: '🍩', freq: 'Monthly',   chartType: 'donut',    desc: 'M:F ratio of new joins per BU.' },
];

// ── HR — Learning & Development ───────────────────────────────────────────────
const HR_LD: ReportMeta[] = [
  { key: 'training-completion',    label: 'Training Completion Rate',     icon: '🎓', freq: 'Monthly',   chartType: 'bar',      desc: 'Course completion % by department and category.' },
  { key: 'skill-gap-analysis',     label: 'Skill Gap Analysis',           icon: '📐', freq: 'Quarterly', chartType: 'bar',      desc: 'Required vs current skill levels per role / team.' },
  { key: 'certification-status',   label: 'Certification Tracker',        icon: '🏅', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Valid, expiring (30/60/90d) and expired certifications.' },
  { key: 'enrollment-completion',  label: 'Enrollment vs Completion',     icon: '📈', freq: 'Monthly',   chartType: 'dualLine', desc: 'Enrolled vs completed headcount trend per month.' },
  { key: 'training-cost-per-emp',  label: 'Training Cost per Employee',   icon: '💸', freq: 'Monthly',   chartType: 'bar',      desc: 'L&D spend per employee per department.' },
  { key: 'ld-budget-utilisation',  label: 'L&D Budget Utilisation',       icon: '💰', freq: 'Quarterly', chartType: 'bar',      desc: 'Allocated vs spent per department / category.' },
  { key: 'mandatory-compliance',   label: 'Mandatory Training Compliance',icon: '✅', freq: 'Monthly',   chartType: 'donut',    desc: 'Employees compliant vs pending on mandatory modules.' },
  { key: 'learning-path-progress', label: 'Learning Path Progress',       icon: '🛤️', freq: 'Monthly',   chartType: 'bar',      desc: 'Completion % per learning path / program.' },
  { key: 'trainer-effectiveness',  label: 'Trainer Effectiveness',        icon: '⭐', freq: 'Quarterly', chartType: 'bar',      desc: 'Avg participant rating per trainer / training event.' },
  { key: 'knowledge-retention',    label: 'Knowledge Retention Score',    icon: '🧠', freq: 'Quarterly', chartType: 'bar',      desc: 'Pre vs post assessment score improvement per course.' },
];

// ── HR — Operations (HR Core) ─────────────────────────────────────────────────
const HR_OPS: ReportMeta[] = [
  { key: 'headcount-report',        label: 'Headcount Report',             icon: '👥', freq: 'Monthly',   chartType: 'bar',      desc: 'Active headcount by dept, location, grade and type.' },
  { key: 'attrition-analysis',      label: 'Attrition & Retention',        icon: '📉', freq: 'Monthly',   chartType: 'bar',      desc: 'Monthly attrition rate by department with trend.' },
  { key: 'attendance-absenteeism',  label: 'Attendance & Absenteeism',     icon: '📅', freq: 'Monthly',   chartType: 'bar',      desc: 'Present days, late arrivals and absenteeism rate.' },
  { key: 'leave-utilisation',       label: 'Leave Utilisation',            icon: '🏖️', freq: 'Monthly',   chartType: 'donut',    desc: 'Leave balance utilised vs available per leave type.' },
  { key: 'overtime-analysis',       label: 'Overtime Analysis',            icon: '⏰', freq: 'Monthly',   chartType: 'bar',      desc: 'Overtime hours by dept with cost impact.' },
  { key: 'payroll-summary',         label: 'Payroll Summary',              icon: '💳', freq: 'Monthly',   chartType: 'bar',      desc: 'Gross, net and deductions breakdown per dept.' },
  { key: 'pf-esi-compliance',       label: 'PF / ESI Compliance',          icon: '🏛️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'PF & ESI contributions vs statutory requirement.' },
  { key: 'performance-rating-dist', label: 'Performance Rating Distribution',icon:'⭐', freq: 'Quarterly', chartType: 'donut',    desc: 'Employee distribution across rating bands.' },
  { key: 'probation-tracker',       label: 'Probation Tracker',            icon: '🗂️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Employees in probation, extensions, confirmations.' },
  { key: 'exit-interview-summary',  label: 'Exit Interview Summary',       icon: '🚪', freq: 'Monthly',   chartType: 'donut',    desc: 'Exit reasons, regrettable vs non-regrettable splits.' },
  { key: 'onboarding-completion',   label: 'Onboarding Completion',        icon: '🤝', freq: 'Monthly',   chartType: 'bar',      desc: 'Checklist completion rate and days-to-productivity.' },
  { key: 'salary-benchmarking-hr',  label: 'Salary Benchmarking',         icon: '📊', freq: 'Quarterly', chartType: 'bar',      desc: 'Internal pay vs market P25/P50/P75/P90 by role.' },
  { key: 'increment-planning',      label: 'Increment & Hike Analysis',    icon: '📈', freq: 'Quarterly', chartType: 'bar',      desc: 'Hike % distribution and budget impact by dept.' },
  { key: 'new-joiners-report',      label: 'New Joiners Report',           icon: '🆕', freq: 'Monthly',   chartType: 'bar',      desc: 'Joinings by dept, location, source and grade.' },
];

// ── Admin ─────────────────────────────────────────────────────────────────────
const ADMIN: ReportMeta[] = [
  { key: 'travel-expense-summary',  label: 'Travel Expense Summary',      icon: '✈️', freq: 'Monthly',   chartType: 'bar',      desc: 'Travel spend by employee, dept and city.' },
  { key: 'advance-settlement',      label: 'Advance Settlement Status',   icon: '💵', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Advances raised, settled and outstanding.' },
  { key: 'helpdesk-ticket-summary', label: 'Helpdesk Ticket Summary',     icon: '🎫', freq: 'Monthly',   chartType: 'bar',      desc: 'Tickets by category, priority and resolution status.' },
  { key: 'helpdesk-sla',            label: 'Helpdesk SLA Compliance',     icon: '🎯', freq: 'Monthly',   chartType: 'bar',      desc: 'Tickets resolved within SLA vs breached.' },
  { key: 'admin-budget',            label: 'Admin Budget Utilisation',    icon: '💰', freq: 'Quarterly', chartType: 'bar',      desc: 'Admin opex vs budget by category.' },
  { key: 'travel-advance-aging',    label: 'Travel Advance Aging',        icon: '📅', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Outstanding advances by age band (30/60/90 days).' },
  { key: 'expense-category-split',  label: 'Expense Category Split',      icon: '🍩', freq: 'Monthly',   chartType: 'donut',    desc: 'Expense breakdown by category (hotel, travel, meals).' },
  { key: 'vendor-invoice-aging',    label: 'Vendor Invoice Aging',        icon: '🧾', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Outstanding vendor payments by age band.' },
  { key: 'facility-utilisation',    label: 'Facility Utilisation',        icon: '🏢', freq: 'Monthly',   chartType: 'bar',      desc: 'Meeting room and desk utilisation by location.' },
];

// ── IT ────────────────────────────────────────────────────────────────────────
const IT: ReportMeta[] = [
  { key: 'it-helpdesk-analysis',    label: 'IT Helpdesk Analysis',        icon: '💻', freq: 'Monthly',   chartType: 'bar',      desc: 'Tickets by type, assignee and resolution time.' },
  { key: 'it-sla-compliance',       label: 'IT SLA Compliance',           icon: '🎯', freq: 'Monthly',   chartType: 'bar',      desc: 'P1/P2/P3 tickets resolved within SLA.' },
  { key: 'software-license',        label: 'Software License Utilisation',icon: '🔑', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Licensed vs active seats per application.' },
  { key: 'integration-health',      label: 'Integration Health Status',   icon: '🔗', freq: 'Monthly',   chartType: 'kpiTable', desc: 'API / integration uptime and error rates.' },
  { key: 'security-incidents',      label: 'Security Incident Report',    icon: '🔒', freq: 'Monthly',   chartType: 'bar',      desc: 'Incidents by severity, type and resolution status.' },
  { key: 'system-uptime',           label: 'System Uptime Report',        icon: '📡', freq: 'Monthly',   chartType: 'bar',      desc: 'Uptime % per system vs SLA target.' },
  { key: 'asset-inventory',         label: 'Asset Inventory Status',      icon: '🖥️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Assets by type, status and assigned employee.' },
  { key: 'change-management-log',   label: 'Change Management Log',       icon: '🔄', freq: 'Monthly',   chartType: 'bar',      desc: 'Change requests by status, risk and implementation.' },
  { key: 'data-backup-status',      label: 'Data Backup Status',          icon: '💾', freq: 'Weekly',    chartType: 'kpiTable', desc: 'Backup success / failure log per system.' },
];

// ── Legal ─────────────────────────────────────────────────────────────────────
const LEGAL: ReportMeta[] = [
  { key: 'contract-expiry',         label: 'Contract Expiry Tracker',     icon: '📋', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Contracts expiring in 30/60/90 days.' },
  { key: 'nda-status',              label: 'NDA & Agreement Status',      icon: '🤝', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Signed, pending and expired NDAs by party type.' },
  { key: 'data-privacy-compliance', label: 'Data Privacy Compliance',     icon: '🔐', freq: 'Quarterly', chartType: 'donut',    desc: 'GDPR / data privacy adherence by module.' },
  { key: 'legal-matter-tracker',    label: 'Legal Matter Tracker',        icon: '⚖️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Open legal cases, status and estimated liability.' },
  { key: 'background-verification', label: 'Background Verification',     icon: '✅', freq: 'Monthly',   chartType: 'kpiTable', desc: 'BGV completed, pending and flagged per joining batch.' },
  { key: 'policy-acknowledgment',   label: 'Policy Acknowledgment Status',icon: '📜', freq: 'Monthly',   chartType: 'donut',    desc: 'Employees acknowledged vs pending per policy.' },
  { key: 'ip-register',             label: 'IP & Trademark Register',     icon: '💡', freq: 'Quarterly', chartType: 'kpiTable', desc: 'Filed, granted and renewal-due IP assets.' },
];

// ── Audit ─────────────────────────────────────────────────────────────────────
const AUDIT: ReportMeta[] = [
  { key: 'audit-trail-summary',     label: 'Audit Trail Summary',         icon: '🔍', freq: 'Monthly',   chartType: 'bar',      desc: 'User actions, changes and access events by module.' },
  { key: 'user-access-review',      label: 'User Access Review',          icon: '👁️', freq: 'Quarterly', chartType: 'kpiTable', desc: 'Active accounts, role changes and orphaned accounts.' },
  { key: 'data-change-log',         label: 'Data Change Log',             icon: '📝', freq: 'Monthly',   chartType: 'bar',      desc: 'Critical field edits per module with before/after.' },
  { key: 'login-activity',          label: 'Login Activity Report',       icon: '🔐', freq: 'Monthly',   chartType: 'bar',      desc: 'Login attempts, failures and suspicious activity.' },
  { key: 'privilege-usage',         label: 'Privilege Usage Report',      icon: '🛡️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Super admin and elevated-privilege actions log.' },
  { key: 'data-export-log',         label: 'Data Export Log',             icon: '📤', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Who exported what data, when and from which module.' },
  { key: 'system-config-changes',   label: 'System Config Changes',       icon: '⚙️', freq: 'Monthly',   chartType: 'bar',      desc: 'Config and settings changes with rollback details.' },
];

// ── Compliance ────────────────────────────────────────────────────────────────
const COMPLIANCE: ReportMeta[] = [
  { key: 'statutory-compliance',    label: 'Statutory Compliance Tracker',icon: '🏛️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'PF, ESI, PT, TDS filing status and due dates.' },
  { key: 'regulatory-filing',       label: 'Regulatory Filing Status',    icon: '📁', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Filed, due and overdue regulatory submissions.' },
  { key: 'compliance-violations',   label: 'Compliance Violation Log',    icon: '⚠️', freq: 'Monthly',   chartType: 'bar',      desc: 'Policy breaches and corrective actions by dept.' },
  { key: 'esg-report',              label: 'ESG & Sustainability Report', icon: '🌿', freq: 'Quarterly', chartType: 'donut',    desc: 'Environment, social and governance metrics.' },
  { key: 'equal-pay-audit',         label: 'Equal Pay Audit',             icon: '⚖️', freq: 'Quarterly', chartType: 'bar',      desc: 'Pay gap analysis by gender and grade.' },
  { key: 'hr-policy-compliance',    label: 'HR Policy Compliance',        icon: '📋', freq: 'Monthly',   chartType: 'donut',    desc: 'Employee adherence to HR policies across modules.' },
  { key: 'statutory-deduction',     label: 'Statutory Deduction Summary', icon: '💳', freq: 'Monthly',   chartType: 'bar',      desc: 'TDS, PF, ESI deductions vs remittances per month.' },
  { key: 'workplace-safety',        label: 'Workplace Safety Report',     icon: '🦺', freq: 'Monthly',   chartType: 'bar',      desc: 'Incidents, near-misses and safety training compliance.' },
];

const CATEGORIES = [
  { key: 'hr-recruitment', label: 'HR Recruitment', icon: '🔍', color: '#6b4df0' },
  { key: 'hr-ld',          label: 'HR L&D',         icon: '🎓', color: '#0ea5e9' },
  { key: 'hr-ops',         label: 'HR Operations',  icon: '👥', color: '#10b981' },
  { key: 'admin',          label: 'Admin',           icon: '🏢', color: '#f59e0b' },
  { key: 'it',             label: 'IT',              icon: '💻', color: '#3b82f6' },
  { key: 'legal',          label: 'Legal',           icon: '⚖️', color: '#8b5cf6' },
  { key: 'audit',          label: 'Audit',           icon: '🔍', color: '#ef4444' },
  { key: 'compliance',     label: 'Compliance',      icon: '✅', color: '#14b8a6' },
];

const SECTIONS_MAP: Record<string, Section[]> = { 'hr-recruitment': [
    { label: 'Standard Reports', reports: HR_REC_STANDARD },
    { label: 'Talent Acquisition P3', sub: 'Advanced TA metrics with org-unit breakdown', reports: HR_REC_P3 },
  ],
  'hr-ld':  [{ label: 'Learning & Development', reports: HR_LD }],
  'hr-ops': [{ label: 'HR Operations (Core)', reports: HR_OPS }],
  'admin':  [{ label: 'Administration', reports: ADMIN }],
  'it':     [{ label: 'Information Technology', reports: IT }],
  'legal':  [{ label: 'Legal', reports: LEGAL }],
  'audit':  [{ label: 'Audit', reports: AUDIT }],
  'compliance': [{ label: 'Compliance', reports: COMPLIANCE }],
};

@Component({ selector: 'app-reports',
  template: `
    <section class="stack-page">
      <div class="card" style="padding:20px 24px">
        <h2 style="margin:0 0 4px;font-size:20px;font-weight:700">Reports</h2>
        <p style="margin:0 0 16px;color:#64748b;font-size:13px">Select a category, then a report to view KPIs, charts and data.</p>

        <!-- Category Tab Strip -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #e2e8f0">
          <button *ngFor="let cat of categories" type="button"
            (click)="selectCategory(cat.key)"
            [style.background]="activeCategory === cat.key ? cat.color : '#f8fafc'"
            [style.color]="activeCategory === cat.key ? '#fff' : '#475569'"
            [style.border]="activeCategory === cat.key ? '1.5px solid ' + cat.color : '1.5px solid #e2e8f0'"
            style="padding:7px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:5px">
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>

        <!-- Global Controls -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:8px">
            <label style="font-size:12px;font-weight:600;color:#475569">Org unit label</label>
            <select class="input" [(ngModel)]="groupByLabel" style="width:140px;font-size:13px">
              <option value="Department">Department</option>
              <option value="Function">Function</option>
              <option value="BU">BU (Business Unit)</option>
              <option value="Division">Division</option>
              <option value="Team">Team</option>
              <option value="Vertical">Vertical</option>
            </select>
          </div>
          <div style="font-size:12px;color:#94a3b8">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#0ea5e9;margin-right:4px"></span>Monthly
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#f97316;margin-right:4px;margin-left:12px"></span>Weekly
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#8b5cf6;margin-right:4px;margin-left:12px"></span>Quarterly
          </div>
        </div>

        <!-- Report Sections for Active Category -->
        <ng-container *ngFor="let section of currentSections">
          <div style="margin-bottom:24px">
            <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px">
              {{ section.label }}
            </div>
            <div *ngIf="section.sub" style="font-size:12px;color:#94a3b8;margin-bottom:10px">
              {{ section.sub }} — Org unit: <strong style="color:#6b4df0">{{ groupByLabel }}</strong>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:8px">
              <div *ngFor="let r of section.reports"
                   (click)="selectReport(r)"
                   [style.border]="selected === r.key ? '2px solid #6b4df0' : '1.5px solid #e2e8f0'"
                   [style.background]="selected === r.key ? '#f5f3ff' : '#fff'"
                   style="padding:14px 16px;border-radius:10px;cursor:pointer;transition:all .15s;position:relative">
                <div style="font-size:18px;margin-bottom:6px">{{ r.icon }}</div>
                <div style="font-size:12px;font-weight:600;color:#0f172a;line-height:1.3;padding-right:40px">{{ r.label }}</div>
                <div style="font-size:11px;color:#94a3b8;margin-top:3px">{{ r.desc }}</div>
                <span [style.background]="freqColor(r.freq)"
                      style="position:absolute;top:8px;right:8px;font-size:10px;color:#fff;padding:2px 6px;border-radius:10px;font-weight:600">
                  {{ r.freq }}
                </span>
                <span style="position:absolute;bottom:8px;right:8px;font-size:10px;color:#6b4df0;opacity:.6">
                  {{ chartIcon(r.chartType) }}
                </span>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Date Range + Run -->
        <div *ngIf="selected" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;padding-top:4px;border-top:1px solid #e2e8f0">
          <label style="font-size:13px;font-weight:600">From</label>
          <input class="input" type="date" [(ngModel)]="fromDate" style="width:160px">
          <label style="font-size:13px;font-weight:600">To</label>
          <input class="input" type="date" [(ngModel)]="toDate" style="width:160px">
          <ng-container *ngIf="selected === 'full-year-demand'">
            <label style="font-size:13px;font-weight:600">Year</label>
            <input class="input" type="number" [(ngModel)]="fiscalYear" style="width:90px" min="2020" max="2030">
          </ng-container>
          <ng-container *ngIf="selected === 'avg-time-to-hire'">
            <label style="font-size:13px;font-weight:600">Target (days)</label>
            <input class="input" type="number" [(ngModel)]="targetDays" style="width:80px" min="1">
          </ng-container>
          <button class="btn btn-primary" type="button" (click)="runReport()" [disabled]="loading">
            {{ loading ? 'Loading…' : 'Run Report' }}
          </button>
          <button class="btn btn-secondary" type="button" (click)="exportExcel()" *ngIf="reportData">Export Excel</button>
          <button class="btn btn-secondary" type="button" (click)="exportPdf()"   *ngIf="reportData">Export PDF</button>
        </div>

        <!-- KPI Cards -->
        <div *ngIf="reportData" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
          <div *ngFor="let kpi of reportData.kpis" class="card"
               style="text-align:center;padding:16px 12px;background:#f8fafc;border:1.5px solid #e2e8f0">
            <div style="font-size:24px;font-weight:800;color:#6b4df0">{{ kpi.value }}</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px">{{ kpi.label }}</div>
          </div>
        </div>

        <!-- Chart Area -->
        <div *ngIf="reportData" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:24px;margin-bottom:20px;min-height:140px">
          <div *ngIf="reportData.chartType === 'funnel'" style="display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px">{{ selectedLabel }} — Funnel</div>
            <ng-container *ngFor="let row of reportData.rows; let i = index">
              <div [style.width]="funnelWidth(i, reportData.rows.length)"
                   style="background:linear-gradient(90deg,#6b4df0,#8b6cf6);color:#fff;padding:8px 16px;border-radius:4px;text-align:center;font-size:12px;font-weight:600;transition:width .3s">
                {{ row['Stage'] }} — {{ row['Count'] }} ({{ row['Conversion %'] }})
              </div>
            </ng-container>
          </div>
          <div *ngIf="reportData.chartType === 'dualLine'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:12px">{{ selectedLabel }} — Trend</div>
            <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap">
              <div *ngFor="let row of reportData.rows" style="display:flex;flex-direction:column;align-items:center;gap:2px;min-width:48px">
                <div style="font-size:11px;font-weight:700;color:#6b4df0">{{ row[reportData.series?.[0]] ?? row['Demand'] }}</div>
                <div style="font-size:11px;color:#10b981">{{ row[reportData.series?.[1]] ?? row['Fulfilled'] }}</div>
                <div style="font-size:10px;color:#94a3b8">{{ row['Month'] ?? row['Period'] }}</div>
              </div>
            </div>
            <div style="display:flex;gap:16px;justify-content:center;margin-top:8px;font-size:11px">
              <span><span style="color:#6b4df0">■</span> {{ reportData.series?.[0] ?? 'Series 1' }}</span>
              <span><span style="color:#10b981">■</span> {{ reportData.series?.[1] ?? 'Series 2' }}</span>
            </div>
          </div>
          <div *ngIf="reportData.chartType === 'donut'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:8px">{{ selectedLabel }} — Distribution</div>
            <div style="font-size:32px;margin-bottom:4px">🍩</div>
            <div style="font-size:12px;color:#64748b">Donut chart — data in table below</div>
          </div>
          <div *ngIf="reportData.chartType === 'bar'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:8px">{{ selectedLabel }} — Bar Chart per {{ groupByLabel }}</div>
            <div *ngIf="reportData.chartMeta?.benchmarkLine || reportData.chartMeta?.targetLine"
                 style="font-size:12px;color:#f97316;margin-bottom:4px">
              ── Benchmark / Target: {{ reportData.chartMeta?.benchmarkLine ?? reportData.chartMeta?.targetLine }}
            </div>
            <div style="font-size:32px;margin-bottom:4px">📊</div>
            <div style="font-size:12px;color:#64748b">Bar chart — data in table below</div>
          </div>
          <div *ngIf="reportData.chartType === 'kpiTable'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:4px">{{ selectedLabel }} — Detail Table</div>
            <div style="font-size:12px;color:#64748b">Inline KPIs above + detail table below</div>
          </div>
        </div>

        <!-- Note -->
        <div *ngIf="reportData?.note"
             style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:12px;color:#92400e">
          ℹ️ {{ reportData.note }}
        </div>

        <!-- BU Breakdown -->
        <div *ngIf="reportData?.buBreakdown?.length" style="margin-bottom:20px">
          <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px">Breakdown by {{ groupByLabel }}</div>
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;font-size:12px">
              <thead>
                <tr style="border-bottom:2px solid #e2e8f0;text-align:left">
                  <th *ngFor="let col of reportData.buBreakdownColumns" style="padding:8px 6px;font-weight:700;color:#475569">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of reportData.buBreakdown" style="border-bottom:1px solid #f1f5f9">
                  <td *ngFor="let col of reportData.buBreakdownColumns" style="padding:7px 6px">{{ row[col] ?? '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Data Table -->
        <div *ngIf="reportData && reportData.rows?.length" style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:2px solid #e2e8f0;text-align:left">
                <th *ngFor="let col of reportData.columns" style="padding:10px 8px;font-weight:700;color:#475569">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of reportData.rows" style="border-bottom:1px solid #f1f5f9">
                <td *ngFor="let col of reportData.columns"
                    [style.color]="cellColor(col, row[col])"
                    style="padding:9px 8px">{{ row[col] ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="reportData && !reportData.rows?.length" style="padding:32px;text-align:center;color:#94a3b8">
          No data for the selected date range.
        </div>
        <div *ngIf="!selected" style="padding:32px;text-align:center;color:#94a3b8">
          Select a report above to get started.
        </div>
      </div>
    </section>
  `
})
export class ReportsComponent implements OnInit { private readonly api = environment.apiUrl;

  categories    = CATEGORIES;
  activeCategory = 'hr-recruitment';
  selected       = '';
  selectedLabel  = '';
  fromDate       = '';
  toDate         = '';
  fiscalYear     = new Date().getFullYear();
  targetDays     = 30;
  groupByLabel   = 'Department';
  loading        = false;
  reportData: any = null;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() { const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    this.fromDate = new Date(y, m - 1, 1).toISOString().split('T')[0];
    this.toDate   = now.toISOString().split('T')[0]; }

  get currentSections(): Section[] { return SECTIONS_MAP[this.activeCategory] ?? []; }

  get activeCategoryColor(): string { return CATEGORIES.find(c => c.key === this.activeCategory)?.color ?? '#6b4df0'; }

  selectCategory(key: string) { this.activeCategory = key;
    this.selected       = '';
    this.reportData     = null; }

  selectReport(r: ReportMeta) { this.selected      = r.key;
    this.selectedLabel = r.label;
    this.reportData    = null; }

  runReport() { if (!this.selected) return;
    this.loading = true;
    let params = `?from=${this.fromDate}&to=${this.toDate}&groupBy=${encodeURIComponent(this.groupByLabel)}`;
    if (this.selected === 'full-year-demand')
      params = `?year=${this.fiscalYear}&groupBy=${encodeURIComponent(this.groupByLabel)}`;
    if (this.selected === 'avg-time-to-hire')
      params += `&targetDays=${this.targetDays}`;
    if (['open-positions-aging','positions-closed-mtd'].includes(this.selected))
      params = `?groupBy=${encodeURIComponent(this.groupByLabel)}`;

    this.http.get<any>(`${this.api}/api/reports/${this.selected}${params}`).subscribe({ next: data => { this.reportData = { ...data,
          rows:    [...(data.rows    || [])],
          columns: [...(data.columns || [])],
          kpis:    [...(data.kpis    || [])] };
        this.loading = false; },
      error: () => { // Fall back to mock data so the UI is always useful
        this.reportData = this.getMockData(this.selected);
        this.loading    = false;
        this.snack.open('Live data unavailable — showing sample data', 'Close', { duration: 3000 }); } }); }

  exportExcel() { window.open(`${this.api}/api/reports/${this.selected}/export/excel?from=${this.fromDate}&to=${this.toDate}`, '_blank'); }
  exportPdf() { window.open(`${this.api}/api/reports/${this.selected}/export/pdf?from=${this.fromDate}&to=${this.toDate}`, '_blank'); }

  freqColor(freq: string): string { return FREQ_COLORS[freq] ?? '#64748b'; }
  chartIcon(type: string): string  { return CHART_ICONS[type] ?? '📊'; }

  funnelWidth(index: number, total: number): string { return `${100 - (index / (total || 1)) * 40}%`; }

  cellColor(col: string, val: any): string { if (col === 'Status') { if (val === 'On Target')   return '#16a34a';
      if (val === 'Over Target') return '#dc2626';
      if (val === 'Overdue')     return '#dc2626';
      if (val === 'Warning')     return '#f97316'; }
    if (col === 'Criticality') { if (val === 'P1') return '#dc2626';
      if (val === 'P2') return '#f97316';
      if (val === 'P3') return '#eab308'; }
    if (col === 'Aging Band' && typeof val === 'string' && val.startsWith('60')) return '#dc2626';
    if (col === 'vs Target'  && typeof val === 'string' && val.startsWith('+'))  return '#dc2626';
    return ''; }

  getMockData(type: string): any { const bu = this.groupByLabel;
    const mock: Record<string, any> = { // ── HR Recruitment — Standard ─────────────────────────────────────────
      'requisition-aging':      { kpis:[{label:'Total Open',value:24},{label:'Overdue',value:7},{label:'Avg Days Open',value:34}], chartType:'bar', columns:['Requisition','Department','Days Open','Status'], rows:[] },
      'vendor-performance':     { kpis:[{label:'Total Vendors',value:12},{label:'Avg Quality',value:'84%'},{label:'Avg Joining Rate',value:'68%'}], chartType:'bar', columns:['Vendor','Submissions','Selections','Joining Rate','SLA Score'], rows:[] },
      'candidate-funnel':       { kpis:[{label:'Submitted',value:240},{label:'Screened',value:80},{label:'Selected',value:22},{label:'Joined',value:18}], chartType:'funnel', columns:['Stage','Count','Conversion %'], rows:[{Stage:'Submitted',Count:240,'Conversion %':'100%'},{Stage:'Screening',Count:80,'Conversion %':'33%'},{Stage:'Selected',Count:22,'Conversion %':'9.2%'},{Stage:'Joined',Count:18,'Conversion %':'7.5%'}] },
      'offer-dropout':          { kpis:[{label:'Offers Made',value:31},{label:'Accepted',value:24},{label:'Dropouts',value:7},{label:'Dropout Rate',value:'22.6%'}], chartType:'bar', columns:['Candidate','Requisition','Offer Date','Outcome','Reason'], rows:[] },
      'time-to-hire':           { kpis:[{label:'Avg TAT (days)',value:38},{label:'Fastest',value:12},{label:'Slowest',value:91}], chartType:'bar', columns:['Requisition','Department','Open Date','Close Date','TAT Days'], rows:[] },
      'source-effectiveness':   { kpis:[{label:'Sources Used',value:8},{label:'Top Source',value:'LinkedIn'}], chartType:'bar', columns:['Source','Submissions','Joinings','Joining Rate'], rows:[] },
      'budget-utilisation':     { kpis:[{label:'Total Budget',value:'₹2.5M'},{label:'Spent',value:'₹1.1M'},{label:'Utilisation',value:'44%'}], chartType:'bar', columns:['Department','Allocated','Spent','Remaining','Utilisation %'], rows:[] },
      'recruiter-productivity': { kpis:[{label:'Active Recruiters',value:8},{label:'Avg Submissions/mo',value:28}], chartType:'bar', columns:['Recruiter','Submissions','Selections','Joinings','Avg TAT (days)'], rows:[] },
      'sla-compliance':         { kpis:[{label:'On Track',value:14},{label:'Warning',value:6},{label:'Overdue',value:4}], chartType:'bar', columns:['Requisition','Stage','Days in Stage','Target Days','Status'], rows:[] },
      'diversity-hiring':       { kpis:[{label:'Total Hires',value:18},{label:'Dept Coverage',value:6}], chartType:'donut', columns:['Department','Headcount','Permanent','Contract','Intern'], rows:[] },
      'talent-pool-health':     { kpis:[{label:'Pool Size',value:142},{label:'Active',value:89},{label:'DoNotContact',value:12}], chartType:'donut', columns:['Candidate','Tags','Status','Last Contacted'], rows:[] },
      'internal-mobility':      { kpis:[{label:'Postings',value:9},{label:'Applications',value:31},{label:'Filled Internally',value:5}], chartType:'bar', columns:['Posting','Department','Applications','Status'], rows:[] },
      // ── HR Recruitment — TA P3 ──────────────────────────────────────────
      'ta-volume-by-bu':        { kpis:[{label:`Total ${bu}s`,value:4},{label:'Total Positions',value:38},{label:'Open',value:22},{label:'Closed',value:16}], chartType:'bar', columns:[bu,'Project','Total Positions','Open','Closed'], rows:[{[bu]:'Engineering',Project:'PROJ-001','Total Positions':12,Open:7,Closed:5},{[bu]:'Sales',Project:'PROJ-003','Total Positions':10,Open:6,Closed:4}] },
      'full-year-demand':       { kpis:[{label:'FY Demand',value:120},{label:'FY Fulfilled',value:84},{label:'Fulfillment %',value:'70%'}], chartType:'dualLine', series:['Demand','Fulfilled'], year:this.fiscalYear, columns:['Month','Demand','Fulfilled'], rows:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i)=>({Month:m,Demand:[8,6,10,9,11,12,10,8,9,12,14,11][i],Fulfilled:[5,4,7,6,8,9,7,5,7,9,10,7][i]})) },
      'open-positions-aging':   { kpis:[{label:'Total Open',value:22},{label:'P1 (Critical)',value:4},{label:'P2 (High)',value:8},{label:'Aged >45d',value:6}], chartType:'kpiTable', columns:[bu,'Role','Grade','Criticality','Positions','Days Open','Aging Band'], rows:[{[bu]:'Engineering',Role:'Sr. Engineer',Grade:'5-8 yrs',Criticality:'P1',Positions:2,'Days Open':62,'Aging Band':'60d+'},{[bu]:'Sales',Role:'Account Mgr',Grade:'3-5 yrs',Criticality:'P2',Positions:3,'Days Open':28,'Aging Band':'15-29d'}] },
      'positions-closed-mtd':   { kpis:[{label:'Closed MTD',value:14},{label:`${bu}s Active`,value:4}], chartType:'bar', columns:[bu,'Positions Closed'], rows:[{[bu]:'Engineering','Positions Closed':6},{[bu]:'Sales','Positions Closed':4},{[bu]:'HR','Positions Closed':2},{[bu]:'Finance','Positions Closed':2}] },
      'cost-per-hire':          { kpis:[{label:'Total Hires',value:14},{label:'Org Avg Cost',value:'₹850K'},{label:`${bu}s`,value:4}], chartType:'bar', chartMeta:{benchmarkLine:850000}, columns:[bu,'Hires','Avg Cost','vs Org Avg'], rows:[{[bu]:'Engineering',Hires:6,'Avg Cost':'₹1.1M','vs Org Avg':'+29.4%'},{[bu]:'Sales',Hires:4,'Avg Cost':'₹750K','vs Org Avg':'-11.8%'}] },
      'hiring-pipeline-stage':  { kpis:[{label:'Total in Pipeline',value:186},{label:'At Offer Stage',value:21},{label:'Offer Conversion',value:'11.3%'}], chartType:'funnel', columns:['Stage','Count','Conversion %'], rows:[{Stage:'Screen',Count:186,'Conversion %':'100%'},{Stage:'Phone',Count:94,'Conversion %':'50.5%'},{Stage:'Tech',Count:52,'Conversion %':'28%'},{Stage:'Final',Count:31,'Conversion %':'16.7%'},{Stage:'Offer',Count:21,'Conversion %':'11.3%'}], buBreakdownColumns:[bu,'Screen','Phone','Tech','Final','Offer'], buBreakdown:[{[bu]:'Engineering',Screen:80,Phone:40,Tech:22,Final:14,Offer:9},{[bu]:'Sales',Screen:60,Phone:30,Tech:16,Final:10,Offer:7}] },
      'avg-time-to-hire':       { kpis:[{label:'Org Avg (days)',value:34},{label:'Target (days)',value:this.targetDays},{label:'On Target BUs',value:2}], chartType:'bar', chartMeta:{targetLine:this.targetDays}, columns:[bu,'Hires','Avg Days','Target Days','vs Target','Status'], rows:[{[bu]:'Sales',Hires:4,'Avg Days':24,'Target Days':this.targetDays,'vs Target':'-6d',Status:'On Target'},{[bu]:'Engineering',Hires:6,'Avg Days':45,'Target Days':this.targetDays,'vs Target':'+15d',Status:'Over Target'}] },
      'gender-ratio-hiring':    { kpis:[{label:'Total New Joins',value:14},{label:'Male',value:9},{label:'Female',value:5},{label:'Female %',value:'35.7%'}], chartType:'donut', note:"Add a 'Gender' field to the Candidate model for live tracking.", columns:[bu,'Total','Male','Female','Other','Female %'], rows:[{[bu]:'Engineering',Total:6,Male:5,Female:1,Other:0,'Female %':'16.7%'},{[bu]:'HR',Total:2,Male:0,Female:2,Other:0,'Female %':'100%'}] },
      // ── HR L&D ───────────────────────────────────────────────────────────
      'training-completion':    { kpis:[{label:'Courses Active',value:24},{label:'Avg Completion',value:'68%'},{label:'Overdue',value:31}], chartType:'bar', columns:['Department','Enrolled','Completed','Completion %','Overdue'], rows:[{Department:'Engineering',Enrolled:45,Completed:32,'Completion %':'71%',Overdue:13},{Department:'Sales',Enrolled:30,Completed:22,'Completion %':'73%',Overdue:8},{Department:'HR',Enrolled:18,Completed:14,'Completion %':'78%',Overdue:4}] },
      'skill-gap-analysis':     { kpis:[{label:'Roles Assessed',value:18},{label:'Critical Gaps',value:7},{label:'Avg Gap Score',value:2.1}], chartType:'bar', columns:['Role','Skill','Required Level','Current Level','Gap'], rows:[{Role:'Sr. Engineer',Skill:'Cloud Architecture','Required Level':4,'Current Level':2,Gap:2},{Role:'Sales Manager',Skill:'CRM Tools','Required Level':3,'Current Level':1,Gap:2}] },
      'certification-status':   { kpis:[{label:'Total Certs',value:142},{label:'Valid',value:98},{label:'Expiring 90d',value:22},{label:'Expired',value:22}], chartType:'kpiTable', columns:['Employee','Certification','Issue Date','Expiry Date','Status'], rows:[{Employee:'Rahul Verma',Certification:'AWS Solutions Architect','Issue Date':'2023-03-01','Expiry Date':'2026-03-01',Status:'Valid'},{Employee:'Priya Desai',Certification:'PMP','Issue Date':'2022-06-01','Expiry Date':'2025-06-01',Status:'Expiring'}] },
      'enrollment-completion':  { kpis:[{label:'Total Enrolled',value:186},{label:'Total Completed',value:124},{label:'Completion Rate',value:'66.7%'}], chartType:'dualLine', series:['Enrolled','Completed'], columns:['Month','Enrolled','Completed'], rows:['Jan','Feb','Mar','Apr','May','Jun'].map((m,i)=>({Month:m,Enrolled:[30,28,35,32,38,23][i],Completed:[18,20,24,22,28,12][i]})) },
      'training-cost-per-emp':  { kpis:[{label:'Total L&D Spend',value:'₹4.2L'},{label:'Avg per Employee',value:'₹8,400'},{label:'Employees Trained',value:50}], chartType:'bar', columns:['Department','Employees','Total Spend','Cost per Employee'], rows:[{Department:'Engineering',Employees:20,'Total Spend':'₹2.1L','Cost per Employee':'₹10,500'},{Department:'Sales',Employees:15,'Total Spend':'₹1.1L','Cost per Employee':'₹7,333'}] },
      'ld-budget-utilisation':  { kpis:[{label:'Annual Budget',value:'₹8L'},{label:'Spent',value:'₹4.2L'},{label:'Utilisation',value:'52.5%'}], chartType:'bar', columns:['Department','Allocated','Spent','Remaining','Utilisation %'], rows:[{Department:'Engineering',Allocated:'₹3L',Spent:'₹2.1L',Remaining:'₹0.9L','Utilisation %':'70%'},{Department:'Sales',Allocated:'₹2L',Spent:'₹1.1L',Remaining:'₹0.9L','Utilisation %':'55%'}] },
      'mandatory-compliance':   { kpis:[{label:'Total Employees',value:120},{label:'Compliant',value:89},{label:'Pending',value:31},{label:'Compliance Rate',value:'74.2%'}], chartType:'donut', columns:['Department','Total','Compliant','Pending','Compliance %'], rows:[{Department:'Engineering',Total:45,Compliant:38,Pending:7,'Compliance %':'84.4%'},{Department:'Sales',Total:30,Compliant:20,Pending:10,'Compliance %':'66.7%'}] },
      'learning-path-progress': { kpis:[{label:'Active Paths',value:8},{label:'Avg Progress',value:'54%'},{label:'Completed',value:18}], chartType:'bar', columns:['Learning Path','Enrolled','Completed','Avg Progress %'], rows:[{Learning:'Path Leadership Excellence',Enrolled:15,Completed:4,'Avg Progress %':'62%'},{Learning:'Path Data & Analytics',Enrolled:22,Completed:8,'Avg Progress %':'58%'}] },
      'trainer-effectiveness':  { kpis:[{label:'Training Events',value:18},{label:'Avg Rating',value:'4.1/5'},{label:'Total Participants',value:186}], chartType:'bar', columns:['Trainer','Events','Participants','Avg Rating','Feedback Score'], rows:[] },
      'knowledge-retention':    { kpis:[{label:'Assessments Done',value:24},{label:'Avg Pre-Score',value:'48%'},{label:'Avg Post-Score',value:'76%'},{label:'Improvement',value:'+28pp'}], chartType:'bar', columns:['Course','Participants','Pre-Score','Post-Score','Improvement'], rows:[] },
      // ── HR Operations ────────────────────────────────────────────────────
      'headcount-report':       { kpis:[{label:'Total Headcount',value:248},{label:'Permanent',value:190},{label:'Contract',value:42},{label:'Intern',value:16}], chartType:'bar', columns:['Department','Permanent','Contract','Intern','Total'], rows:[{Department:'Engineering',Permanent:80,Contract:20,Intern:8,Total:108},{Department:'Sales',Permanent:55,Contract:12,Intern:4,Total:71},{Department:'HR',Permanent:28,Contract:6,Intern:2,Total:36}] },
      'attrition-analysis':     { kpis:[{label:'Attrition MTD',value:4},{label:'Attrition YTD',value:31},{label:'Attrition Rate',value:'12.5%'},{label:'Regrettable',value:'67%'}], chartType:'bar', columns:['Department','Attritions','Attrition %','Regrettable','Avg Tenure (yrs)'], rows:[{Department:'Engineering',Attritions:14,'Attrition %':'13%',Regrettable:10,'Avg Tenure (yrs)':2.3},{Department:'Sales',Attritions:9,'Attrition %':'12.7%',Regrettable:7,'Avg Tenure (yrs)':1.8}] },
      'attendance-absenteeism': { kpis:[{label:'Working Days',value:22},{label:'Avg Attendance %',value:'91.4%'},{label:'Late Arrivals',value:84},{label:'Absent Days',value:412}], chartType:'bar', columns:['Department','Avg Attendance %','Late Arrivals','Absent Days','Absenteeism %'], rows:[{Department:'Engineering','Avg Attendance %':'93%','Late Arrivals':22,'Absent Days':112,'Absenteeism %':'7%'},{Department:'Sales','Avg Attendance %':'89%','Late Arrivals':31,'Absent Days':142,'Absenteeism %':'11%'}] },
      'leave-utilisation':      { kpis:[{label:'Leave Requests',value:142},{label:'Approved',value:128},{label:'Avg Balance Used',value:'38%'}], chartType:'donut', columns:['Leave Type','Allocated Days','Used Days','Balance','Utilisation %'], rows:[{'Leave Type':'Earned Leave','Allocated Days':1200,'Used Days':482,'Balance':718,'Utilisation %':'40.2%'},{'Leave Type':'Sick Leave','Allocated Days':600,'Used Days':134,'Balance':466,'Utilisation %':'22.3%'}] },
      'overtime-analysis':      { kpis:[{label:'Total OT Hours',value:842},{label:'OT Cost',value:'₹2.8L'},{label:'Employees with OT',value:64}], chartType:'bar', columns:['Department','OT Hours','OT Cost','Employees with OT'], rows:[{Department:'Engineering','OT Hours':380,'OT Cost':'₹1.4L','Employees with OT':28},{Department:'Sales','OT Hours':242,'OT Cost':'₹0.8L','Employees with OT':20}] },
      'payroll-summary':        { kpis:[{label:'Total Gross',value:'₹48.2L'},{label:'Total Deductions',value:'₹9.4L'},{label:'Total Net',value:'₹38.8L'},{label:'Employees',value:190}], chartType:'bar', columns:['Department','Employees','Gross Pay','Deductions','Net Pay'], rows:[{Department:'Engineering',Employees:80,'Gross Pay':'₹22L',Deductions:'₹4.2L','Net Pay':'₹17.8L'},{Department:'Sales',Employees:55,'Gross Pay':'₹14L',Deductions:'₹2.7L','Net Pay':'₹11.3L'}] },
      'pf-esi-compliance':      { kpis:[{label:'PF Contributors',value:190},{label:'PF Remitted',value:'₹3.8L'},{label:'ESI Eligible',value:82},{label:'ESI Remitted',value:'₹0.6L'}], chartType:'kpiTable', columns:['Month','PF Employee','PF Employer','ESI Employee','ESI Employer','Status'], rows:[{Month:'Apr 2026','PF Employee':'₹1.92L','PF Employer':'₹1.92L','ESI Employee':'₹21K','ESI Employer':'₹48K',Status:'Filed'},{Month:'Mar 2026','PF Employee':'₹1.9L','PF Employer':'₹1.9L','ESI Employee':'₹21K','ESI Employer':'₹48K',Status:'Filed'}] },
      'performance-rating-dist':{ kpis:[{label:'Employees Reviewed',value:182},{label:'Avg Rating',value:'3.4/5'},{label:'Top Performers (4+)',value:48}], chartType:'donut', columns:['Rating Band','Count','% of Total','Avg Hike %'], rows:[{'Rating Band':'5 - Outstanding','Count':14,'% of Total':'7.7%','Avg Hike %':'18%'},{'Rating Band':'4 - Exceeds Expectations','Count':34,'% of Total':'18.7%','Avg Hike %':'14%'},{'Rating Band':'3 - Meets Expectations','Count':96,'% of Total':'52.7%','Avg Hike %':'10%'},{'Rating Band':'2 - Needs Improvement','Count':28,'% of Total':'15.4%','Avg Hike %':'5%'},{'Rating Band':'1 - Below Expectations','Count':10,'% of Total':'5.5%','Avg Hike %':'0%'}] },
      'probation-tracker':      { kpis:[{label:'On Probation',value:18},{label:'Due This Month',value:6},{label:'Extended',value:3},{label:'Confirmed',value:42}], chartType:'kpiTable', columns:['Employee','Department','Joining Date','Probation End','Status'], rows:[] },
      'exit-interview-summary': { kpis:[{label:'Exits MTD',value:4},{label:'Exit Interviews Done',value:3},{label:'Regrettable',value:2}], chartType:'donut', columns:['Exit Reason','Count','%'], rows:[{'Exit Reason':'Better Opportunity',Count:14,'%':'45.2%'},{'Exit Reason':'Work Culture',Count:8,'%':'25.8%'},{'Exit Reason':'Compensation',Count:6,'%':'19.4%'},{'Exit Reason':'Personal',Count:3,'%':'9.7%'}] },
      'onboarding-completion':  { kpis:[{label:'New Joiners',value:8},{label:'Checklist Complete',value:6},{label:'Avg Days to Productivity',value:18}], chartType:'bar', columns:['Employee','Department','Joining Date','Checklist %','Days to Productivity'], rows:[] },
      'salary-benchmarking-hr': { kpis:[{label:'Roles Benchmarked',value:24},{label:'Below P50',value:8},{label:'Above P75',value:6}], chartType:'bar', columns:['Role','Internal Median','Market P25','Market P50','Market P75','Position'], rows:[] },
      'increment-planning':     { kpis:[{label:'Employees Reviewed',value:190},{label:'Avg Hike %',value:'11.2%'},{label:'Total Impact',value:'₹12.4L/mo'}], chartType:'bar', columns:['Department','Headcount','Avg Hike %','Total Annual Impact'], rows:[] },
      'new-joiners-report':     { kpis:[{label:'Joined MTD',value:8},{label:'Joined YTD',value:42},{label:'Departments',value:6}], chartType:'bar', columns:['Employee','Department','Location','Source','Grade','Joining Date'], rows:[] },
      // ── Admin ────────────────────────────────────────────────────────────
      'travel-expense-summary': { kpis:[{label:'Trips MTD',value:28},{label:'Total Spend',value:'₹3.4L'},{label:'Avg per Trip',value:'₹12,142'},{label:'Pending Claims',value:6}], chartType:'bar', columns:['Employee','Department','From','To','Amount','Status'], rows:[] },
      'advance-settlement':     { kpis:[{label:'Advances Given',value:14},{label:'Settled',value:9},{label:'Outstanding',value:5},{label:'Outstanding Amt',value:'₹42K'}], chartType:'kpiTable', columns:['Employee','Advance Date','Amount','Settlement Date','Outstanding','Age (days)'], rows:[] },
      'helpdesk-ticket-summary':{ kpis:[{label:'Tickets MTD',value:84},{label:'Resolved',value:71},{label:'Open',value:13},{label:'Avg Resolution',value:'1.4 days'}], chartType:'bar', columns:['Category','Open','Resolved','Avg Resolution Days','SLA Met %'], rows:[{Category:'IT',Open:6,Resolved:28,'Avg Resolution Days':0.8,'SLA Met %':'96%'},{Category:'HR',Open:4,Resolved:22,'Avg Resolution Days':1.2,'SLA Met %':'91%'},{Category:'Admin',Open:3,Resolved:21,'Avg Resolution Days':2.1,'SLA Met %':'85%'}] },
      'helpdesk-sla':           { kpis:[{label:'Tickets Total',value:84},{label:'Within SLA',value:76},{label:'Breached',value:8},{label:'SLA Rate',value:'90.5%'}], chartType:'bar', columns:['Priority','Total','Within SLA','Breached','SLA %'], rows:[{Priority:'P1 - Critical',Total:4,Within:'4','Breached':0,'SLA %':'100%'},{Priority:'P2 - High',Total:18,Within:'16','Breached':2,'SLA %':'88.9%'},{Priority:'P3 - Medium',Total:42,Within:'38','Breached':4,'SLA %':'90.5%'},{Priority:'P4 - Low',Total:20,Within:'18','Breached':2,'SLA %':'90%'}] },
      'admin-budget':           { kpis:[{label:'Annual Budget',value:'₹18L'},{label:'Spent YTD',value:'₹7.2L'},{label:'Utilisation',value:'40%'}], chartType:'bar', columns:['Category','Allocated','Spent','Remaining','Utilisation %'], rows:[{Category:'Travel',Allocated:'₹8L',Spent:'₹3.4L',Remaining:'₹4.6L','Utilisation %':'42.5%'},{Category:'Facilities',Allocated:'₹4L',Spent:'₹1.8L',Remaining:'₹2.2L','Utilisation %':'45%'},{Category:'Supplies',Allocated:'₹3L',Spent:'₹1.2L',Remaining:'₹1.8L','Utilisation %':'40%'}] },
      'travel-advance-aging':   { kpis:[{label:'Outstanding',value:5},{label:'Total Amt',value:'₹42K'},{label:'>30 days',value:2}], chartType:'kpiTable', columns:['Employee','Advance Date','Amount','Age (days)','Band'], rows:[] },
      'expense-category-split': { kpis:[{label:'Total Claims',value:48},{label:'Total Amount',value:'₹3.4L'}], chartType:'donut', columns:['Category','Amount','% of Total'], rows:[{Category:'Hotel & Stay',Amount:'₹1.2L','% of Total':'35.3%'},{Category:'Air/Train Travel',Amount:'₹0.9L','% of Total':'26.5%'},{Category:'Meals & Entertainment',Amount:'₹0.7L','% of Total':'20.6%'},{Category:'Local Transport',Amount:'₹0.4L','% of Total':'11.8%'},{Category:'Other',Amount:'₹0.2L','% of Total':'5.9%'}] },
      'vendor-invoice-aging':   { kpis:[{label:'Outstanding Invoices',value:12},{label:'Total Amount',value:'₹8.4L'},{label:'>60 days',value:3}], chartType:'kpiTable', columns:['Vendor','Invoice Date','Amount','Age (days)','Band','Status'], rows:[] },
      'facility-utilisation':   { kpis:[{label:'Meeting Rooms',value:12},{label:'Avg Utilisation',value:'64%'},{label:'Peak Hour',value:'11am-1pm'}], chartType:'bar', columns:['Room','Capacity','Bookings MTD','Avg Utilisation %','Peak Day'], rows:[] },
      // ── IT ───────────────────────────────────────────────────────────────
      'it-helpdesk-analysis':   { kpis:[{label:'Tickets MTD',value:124},{label:'Resolved',value:112},{label:'Open',value:12},{label:'Avg Resolution',value:'0.8 days'}], chartType:'bar', columns:['Category','Open','Resolved','Avg Resolution Days','SLA Met %'], rows:[{Category:'Hardware',Open:3,Resolved:28,'Avg Resolution Days':1.2,'SLA Met %':'89%'},{Category:'Software',Open:5,Resolved:42,'Avg Resolution Days':0.6,'SLA Met %':'97%'},{Category:'Network',Open:4,Resolved:22,'Avg Resolution Days':0.9,'SLA Met %':'93%'}] },
      'it-sla-compliance':      { kpis:[{label:'Total Tickets',value:124},{label:'Within SLA',value:118},{label:'Breached',value:6},{label:'SLA Rate',value:'95.2%'}], chartType:'bar', columns:['Priority','Total','Within SLA','Breached','SLA %'], rows:[{Priority:'P1 - Critical',Total:2,'Within SLA':2,Breached:0,'SLA %':'100%'},{Priority:'P2 - High',Total:14,'Within SLA':13,Breached:1,'SLA %':'92.9%'},{Priority:'P3 - Medium',Total:62,'Within SLA':59,Breached:3,'SLA %':'95.2%'},{Priority:'P4 - Low',Total:46,'Within SLA':44,Breached:2,'SLA %':'95.7%'}] },
      'software-license':       { kpis:[{label:'Applications',value:18},{label:'Total Seats',value:420},{label:'Active Users',value:312},{label:'Unused',value:108}], chartType:'kpiTable', columns:['Application','Licensed Seats','Active Users','Unused','Utilisation %','Renewal Date'], rows:[{Application:'Microsoft 365',Licensed:250,'Active Users':248,Unused:2,'Utilisation %':'99.2%','Renewal Date':'2026-12-31'},{Application:'Slack',Licensed:200,'Active Users':186,Unused:14,'Utilisation %':'93%','Renewal Date':'2026-08-01'},{Application:'Figma',Licensed:20,'Active Users':12,Unused:8,'Utilisation %':'60%','Renewal Date':'2026-06-30'}] },
      'integration-health':     { kpis:[{label:'Active Integrations',value:8},{label:'Healthy',value:7},{label:'Degraded',value:1},{label:'Avg Uptime',value:'99.1%'}], chartType:'kpiTable', columns:['Integration','Status','Uptime %','Last Sync','Error Rate'], rows:[{Integration:'Slack Notifications',Status:'Healthy','Uptime %':'99.9%','Last Sync':'5 min ago','Error Rate':'0.01%'},{Integration:'Email Service',Status:'Healthy','Uptime %':'99.7%','Last Sync':'2 min ago','Error Rate':'0.03%'},{Integration:'Payment Gateway',Status:'Degraded','Uptime %':'96.4%','Last Sync':'18 min ago','Error Rate':'1.2%'}] },
      'security-incidents':     { kpis:[{label:'Incidents MTD',value:3},{label:'Resolved',value:2},{label:'Open',value:1},{label:'Critical',value:0}], chartType:'bar', columns:['Date','Severity','Type','Description','Status','Resolution Time'], rows:[] },
      'system-uptime':          { kpis:[{label:'Systems Monitored',value:14},{label:'Avg Uptime',value:'99.3%'},{label:'Incidents',value:3},{label:'SLA Target',value:'99.5%'}], chartType:'bar', columns:['System','Uptime %','Downtime (hrs)','Incidents','SLA Status'], rows:[{System:'Web App','Uptime %':'99.8%','Downtime (hrs)':0.4,Incidents:1,'SLA Status':'Met'},{System:'API Gateway','Uptime %':'99.6%','Downtime (hrs)':0.8,Incidents:1,'SLA Status':'Met'},{System:'Database','Uptime %':'98.9%','Downtime (hrs)':2.4,Incidents:1,'SLA Status':'Missed'}] },
      'asset-inventory':        { kpis:[{label:'Total Assets',value:342},{label:'Assigned',value:298},{label:'In Stock',value:32},{label:'Under Repair',value:12}], chartType:'kpiTable', columns:['Asset Type','Total','Assigned','In Stock','Under Repair'], rows:[{'Asset Type':'Laptops',Total:220,Assigned:198,'In Stock':16,'Under Repair':6},{'Asset Type':'Monitors',Total:84,Assigned:72,'In Stock':10,'Under Repair':2},{'Asset Type':'Mobile Phones',Total:38,Assigned:28,'In Stock':6,'Under Repair':4}] },
      'change-management-log':  { kpis:[{label:'Changes MTD',value:8},{label:'Successful',value:7},{label:'Failed',value:1},{label:'Rollbacks',value:1}], chartType:'bar', columns:['Date','Change','Risk Level','Requester','Status','Rollback'], rows:[] },
      'data-backup-status':     { kpis:[{label:'Backup Jobs',value:14},{label:'Successful',value:13},{label:'Failed',value:1},{label:'Last Full Backup',value:'4 hrs ago'}], chartType:'kpiTable', columns:['System','Last Backup','Status','Size','Duration'], rows:[] },
      // ── Legal ────────────────────────────────────────────────────────────
      'contract-expiry':        { kpis:[{label:'Active Contracts',value:42},{label:'Expiring 30d',value:4},{label:'Expiring 60d',value:9},{label:'Expiring 90d',value:14}], chartType:'kpiTable', columns:['Contract','Party','Type','Start Date','Expiry Date','Days Remaining','Status'], rows:[] },
      'nda-status':             { kpis:[{label:'Total NDAs',value:68},{label:'Active',value:58},{label:'Pending Sign',value:6},{label:'Expired',value:4}], chartType:'kpiTable', columns:['Party','Type','Signed Date','Expiry','Status'], rows:[] },
      'data-privacy-compliance':{ kpis:[{label:'Modules Assessed',value:14},{label:'Compliant',value:11},{label:'Partial',value:2},{label:'Non-Compliant',value:1}], chartType:'donut', columns:['Module','Data Category','GDPR Status','Last Reviewed'], rows:[] },
      'legal-matter-tracker':   { kpis:[{label:'Open Matters',value:3},{label:'Closed YTD',value:7},{label:'Est. Liability',value:'₹12L'}], chartType:'kpiTable', columns:['Matter','Type','Status','Opened Date','Est. Liability','Next Hearing'], rows:[] },
      'background-verification':{ kpis:[{label:'BGV Initiated',value:18},{label:'Completed',value:14},{label:'Pending',value:3},{label:'Flagged',value:1}], chartType:'kpiTable', columns:['Employee','Joining Date','BGV Type','Status','Verified Date','Result'], rows:[] },
      'policy-acknowledgment':  { kpis:[{label:'Active Policies',value:12},{label:'Avg Acknowledgment',value:'74%'},{label:'Overdue',value:31}], chartType:'donut', columns:['Policy','Employees Required','Acknowledged','Pending','Acknowledgment %'], rows:[{Policy:'Code of Conduct',Employees:248,Acknowledged:238,Pending:10,'Acknowledgment %':'96%'},{Policy:'IT Security Policy',Employees:248,Acknowledged:192,Pending:56,'Acknowledgment %':'77.4%'},{Policy:'Leave Policy',Employees:248,Acknowledged:180,Pending:68,'Acknowledgment %':'72.6%'}] },
      'ip-register':            { kpis:[{label:'IP Assets',value:8},{label:'Granted',value:5},{label:'Pending',value:2},{label:'Renewal Due',value:1}], chartType:'kpiTable', columns:['IP Title','Type','Filed Date','Grant Date','Renewal Date','Status'], rows:[] },
      // ── Audit ────────────────────────────────────────────────────────────
      'audit-trail-summary':    { kpis:[{label:'Total Events MTD',value:4842},{label:'Users Active',value:98},{label:'Critical Changes',value:12},{label:'Modules',value:14}], chartType:'bar', columns:['Module','Total Events','Create','Update','Delete','Top User'], rows:[{Module:'Candidates','Total Events':1240,Create:142,Update:980,Delete:118,'Top User':'recruiter@decypher.app'},{Module:'Payroll','Total Events':842,Create:18,Update:796,Delete:28,'Top User':'admin@decypher.app'},{Module:'Settings','Total Events':214,Create:4,Update:196,Delete:14,'Top User':'admin@decypher.app'}] },
      'user-access-review':     { kpis:[{label:'Total Users',value:102},{label:'Active',value:94},{label:'Inactive 30d+',value:8},{label:'Role Changes MTD',value:3}], chartType:'kpiTable', columns:['User','Role','Last Login','Status','Access Modules'], rows:[] },
      'data-change-log':        { kpis:[{label:'Critical Edits MTD',value:84},{label:'Modules Affected',value:8},{label:'Users',value:12}], chartType:'bar', columns:['Module','Field','Old Value','New Value','Changed By','Changed At'], rows:[] },
      'login-activity':         { kpis:[{label:'Login Attempts MTD',value:1842},{label:'Successful',value:1798},{label:'Failed',value:44},{label:'Unique Users',value:98}], chartType:'bar', columns:['Date','Successful Logins','Failed Logins','Unique Users','Suspicious Flags'], rows:[] },
      'privilege-usage':        { kpis:[{label:'Privileged Actions MTD',value:142},{label:'Super Admin',value:98},{label:'Elevated Role',value:44}], chartType:'kpiTable', columns:['User','Role','Action','Module','Timestamp','IP Address'], rows:[] },
      'data-export-log':        { kpis:[{label:'Exports MTD',value:28},{label:'Users',value:12},{label:'Records Exported',value:14842}], chartType:'kpiTable', columns:['User','Module','Record Count','Export Format','Timestamp'], rows:[] },
      'system-config-changes':  { kpis:[{label:'Config Changes MTD',value:14},{label:'Rollbacks',value:1},{label:'Users',value:4}], chartType:'bar', columns:['Setting','Old Value','New Value','Changed By','Changed At','Rollback?'], rows:[] },
      // ── Compliance ───────────────────────────────────────────────────────
      'statutory-compliance':   { kpis:[{label:'Filings Due MTD',value:6},{label:'Filed',value:4},{label:'Pending',value:2},{label:'Overdue',value:0}], chartType:'kpiTable', columns:['Filing Type','Period','Due Date','Filed Date','Amount','Status'], rows:[{'Filing Type':'PF',Period:'Apr 2026','Due Date':'2026-05-15','Filed Date':'2026-05-12',Amount:'₹3.84L',Status:'Filed'},{'Filing Type':'ESI',Period:'Apr 2026','Due Date':'2026-05-21','Filed Date':'2026-05-18',Amount:'₹0.69L',Status:'Filed'},{'Filing Type':'PT (MH)',Period:'Apr 2026','Due Date':'2026-05-30','Filed Date':'—',Amount:'₹42K',Status:'Pending'},{'Filing Type':'TDS (Q1)',Period:'Apr–Jun 2026','Due Date':'2026-07-07','Filed Date':'—',Amount:'TBD',Status:'Upcoming'}] },
      'regulatory-filing':      { kpis:[{label:'Total Filings YTD',value:18},{label:'Filed',value:16},{label:'Due This Month',value:2},{label:'Overdue',value:0}], chartType:'kpiTable', columns:['Regulation','Filing','Period','Due Date','Status'], rows:[] },
      'compliance-violations':  { kpis:[{label:'Violations MTD',value:2},{label:'Corrected',value:1},{label:'Pending',value:1},{label:'Repeat Offenders',value:0}], chartType:'bar', columns:['Department','Policy','Violation Type','Date','Corrective Action','Status'], rows:[] },
      'esg-report':             { kpis:[{label:'ESG Score',value:'68/100'},{label:'Environment',value:'71'},{label:'Social',value:'74'},{label:'Governance',value:'59'}], chartType:'donut', columns:['Pillar','Metric','Current','Target','Score'], rows:[] },
      'equal-pay-audit':        { kpis:[{label:'Roles Audited',value:24},{label:'Pay Gap > 10%',value:3},{label:'Avg Gender Pay Gap',value:'6.2%'}], chartType:'bar', columns:['Role','Grade','Male Median','Female Median','Pay Gap %','Status'], rows:[] },
      'hr-policy-compliance':   { kpis:[{label:'Policies Active',value:12},{label:'Avg Compliance',value:'82%'},{label:'Non-Compliant',value:2}], chartType:'donut', columns:['Policy','Scope','Compliance %','Violations','Status'], rows:[] },
      'statutory-deduction':    { kpis:[{label:'PF Deducted',value:'₹3.84L'},{label:'ESI Deducted',value:'₹0.69L'},{label:'TDS Deducted',value:'₹2.1L'},{label:'PT Deducted',value:'₹42K'}], chartType:'bar', columns:['Month','PF Employee','PF Employer','ESI','TDS','PT','Total'], rows:[] },
      'workplace-safety':       { kpis:[{label:'Incidents MTD',value:0},{label:'Near Misses',value:2},{label:'Safety Training Done',value:'88%'}], chartType:'bar', columns:['Month','Incidents','Near Misses','Safety Training %','Status'], rows:[] }, };
    return mock[type] ?? { kpis:[], chartType:'bar', columns:[], rows:[] }; }
}

