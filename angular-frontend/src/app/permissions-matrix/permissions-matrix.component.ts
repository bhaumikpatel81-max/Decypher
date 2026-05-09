import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

interface PermCell {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  saving: { read: boolean; write: boolean; delete: boolean };
}

type Matrix = Record<string, Record<string, PermCell>>;

@Component({
  selector: 'app-permissions-matrix',
  templateUrl: './permissions-matrix.component.html',
  styles: [`
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px; }
  `]
})
export class PermissionsMatrixComponent implements OnInit {
  private api = `${environment.apiUrl}/api/permissions`;

  loading = true;
  matrix: Matrix = {};

  readonly configRoles = ['Operations', 'LnD', 'TalentAcq'];

  readonly moduleGroups = [
    { label: 'Core HR', modules: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'employee-directory', label: 'Employee Directory' },
      { key: 'org-chart', label: 'Org Chart' },
      { key: 'document-management', label: 'Document Management' },
      { key: 'letters-certificates', label: 'Letters & Certificates' },
      { key: 'exit-management', label: 'Exit Management' },
    ]},
    { label: 'Attendance & Time', modules: [
      { key: 'attendance', label: 'Attendance' },
      { key: 'leave-management', label: 'Leave Management' },
      { key: 'shift-management', label: 'Shift Management' },
      { key: 'timesheet', label: 'Timesheet' },
      { key: 'overtime', label: 'Overtime' },
    ]},
    { label: 'Payroll', modules: [
      { key: 'payroll', label: 'Payroll' },
      { key: 'salary-structure', label: 'Salary Structure' },
      { key: 'tax-statutory', label: 'Tax & Statutory' },
      { key: 'expense-management', label: 'Expense Management' },
      { key: 'payslip-portal', label: 'Payslip Portal' },
    ]},
    { label: 'Compensation & Benefits', modules: [
      { key: 'compensation-planning', label: 'Compensation Planning' },
      { key: 'benefits-admin', label: 'Benefits Admin' },
      { key: 'salary-benchmarking', label: 'Salary Benchmarking' },
      { key: 'bonus-incentives', label: 'Bonus & Incentives' },
    ]},
    { label: 'Performance', modules: [
      { key: 'goals-okr', label: 'Goals & OKR' },
      { key: 'performance-reviews', label: 'Performance Reviews' },
      { key: 'feedback-360', label: '360° Feedback' },
      { key: 'continuous-feedback', label: 'Continuous Feedback' },
    ]},
    { label: 'Learning & Development', modules: [
      { key: 'learning-management', label: 'Learning Management' },
      { key: 'training-calendar', label: 'Training Calendar' },
      { key: 'skill-gap', label: 'Skill Gap' },
      { key: 'certification-tracker', label: 'Certification Tracker' },
    ]},
    { label: 'Recruitment', modules: [
      { key: 'candidates', label: 'Candidates' },
      { key: 'requirements', label: 'Requisitions' },
      { key: 'pipeline-board', label: 'Pipeline Board' },
      { key: 'interview-scheduler', label: 'Interview Scheduler' },
      { key: 'offer-management', label: 'Offer Management' },
      { key: 'source-tracking', label: 'Source Tracking' },
      { key: 'resume-parser', label: 'Resume Parser' },
    ]},
    { label: 'Compliance & Analytics', modules: [
      { key: 'policy-management', label: 'Policy Management' },
      { key: 'statutory-compliance', label: 'Statutory Compliance' },
      { key: 'compliance', label: 'Compliance' },
      { key: 'audit-trail', label: 'Audit Trail' },
      { key: 'reports', label: 'Reports' },
      { key: 'budget', label: 'Budget' },
    ]},
    { label: 'Administration', modules: [
      { key: 'helpdesk', label: 'Helpdesk' },
      { key: 'admin-travel', label: 'Travel & Admin' },
      { key: 'portal', label: 'Employee Portal' },
      { key: 'import-center', label: 'Import Center' },
      { key: 'integrations', label: 'Integrations Hub' },
      { key: 'settings', label: 'Settings' },
    ]},
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snack: MatSnackBar
  ) {}

  get isSuperAdmin(): boolean {
    return this.auth.getCurrentUser()?.role === 'SuperAdmin';
  }

  ngOnInit(): void {
    if (this.isSuperAdmin) this.loadMatrix();
    else this.loading = false;
  }

  loadMatrix(): void {
    this.loading = true;
    this.http.get<Record<string, Record<string, { canRead: boolean; canWrite: boolean; canDelete: boolean }>>>(
      `${this.api}/matrix`
    ).subscribe({
      next: data => {
        const built: Matrix = {};
        for (const role of this.configRoles) {
          built[role] = {};
          for (const group of this.moduleGroups) {
            for (const mod of group.modules) {
              const raw = data[role]?.[mod.key];
              built[role][mod.key] = {
                canRead: raw?.canRead ?? false,
                canWrite: raw?.canWrite ?? false,
                canDelete: raw?.canDelete ?? false,
                saving: { read: false, write: false, delete: false }
              };
            }
          }
        }
        this.matrix = { ...built };
        this.loading = false;
      },
      error: () => {
        this.snack.open('Failed to load permissions matrix', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  cell(role: string, moduleKey: string): PermCell {
    return this.matrix[role]?.[moduleKey] ?? { canRead: false, canWrite: false, canDelete: false, saving: { read: false, write: false, delete: false } };
  }

  isSaving(role: string, moduleKey: string, field: 'read' | 'write' | 'delete'): boolean {
    return this.matrix[role]?.[moduleKey]?.saving[field] ?? false;
  }

  toggle(role: string, moduleKey: string, field: 'canRead' | 'canWrite' | 'canDelete'): void {
    const current = this.cell(role, moduleKey);

    // Dependency enforcement
    if (field === 'canWrite' && !current.canRead) return;
    if (field === 'canDelete' && !current.canWrite) return;

    const newValue = !current[field];

    // Cascade: revoking read → also revoke write + delete; revoking write → also revoke delete
    const updated: Partial<PermCell> = { [field]: newValue };
    if (field === 'canRead' && !newValue) {
      updated.canWrite = false;
      updated.canDelete = false;
    }
    if (field === 'canWrite' && !newValue) {
      updated.canDelete = false;
    }

    const savingField = field === 'canRead' ? 'read' : field === 'canWrite' ? 'write' : 'delete';

    // Optimistic update
    this.matrix = {
      ...this.matrix,
      [role]: {
        ...this.matrix[role],
        [moduleKey]: {
          ...current,
          ...updated,
          saving: { ...current.saving, [savingField]: true }
        }
      }
    };

    const payload = {
      canRead: this.matrix[role][moduleKey].canRead,
      canWrite: this.matrix[role][moduleKey].canWrite,
      canDelete: this.matrix[role][moduleKey].canDelete
    };

    this.http.put<{ canRead: boolean; canWrite: boolean; canDelete: boolean }>(
      `${this.api}/matrix/${encodeURIComponent(role)}/${encodeURIComponent(moduleKey)}`,
      payload
    ).subscribe({
      next: saved => {
        this.matrix = {
          ...this.matrix,
          [role]: {
            ...this.matrix[role],
            [moduleKey]: {
              canRead: saved.canRead,
              canWrite: saved.canWrite,
              canDelete: saved.canDelete,
              saving: { ...this.matrix[role][moduleKey].saving, [savingField]: false }
            }
          }
        };
      },
      error: () => {
        // Revert optimistic update
        this.matrix = {
          ...this.matrix,
          [role]: {
            ...this.matrix[role],
            [moduleKey]: {
              ...current,
              saving: { ...current.saving, [savingField]: false }
            }
          }
        };
        this.snack.open(`Failed to update ${role} › ${moduleKey}`, 'Close', { duration: 3000 });
      }
    });
  }

  trackByKey(_: number, item: { key: string }): string {
    return item.key;
  }
}
