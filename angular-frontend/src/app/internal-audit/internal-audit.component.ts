import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

interface AuditReport {
  id: string;
  title: string;
  departmentType: string;
  status: string;
  financialYear: string;
  auditDate: string;
  auditedBy: string;
  totalObservations: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  closedCount: number;
  createdAt: string;
}

interface AuditObservation {
  id?: string;
  observationNumber?: number;
  title: string;
  riskLevel: string;
  status: string;
  processArea?: string;
  background?: string;
  detailedObservation?: string;
  risks?: string[];
  recommendations?: string[];
  mgmtCause?: string;
  mgmtCorrectiveAction?: string;
  mgmtPreventiveAction?: string;
  mgmtTargetDate?: string;
  mgmtResponsiblePerson?: string;
  mgmtResponsibleDesignation?: string;
  isAlreadyImplemented: boolean;
  isProcessImprovement: boolean;
  financialImpact?: number;
}

interface ReportDetail extends AuditReport {
  reviewedBy?: string;
  approvedBy?: string;
  executiveSummary?: string;
  scopeAreas: { id: string; name: string; description?: string; sortOrder: number }[];
  overviewStats: { id: string; category: string; label: string; value?: string; unit?: string }[];
  observations: AuditObservation[];
}

@Component({
  selector: 'app-internal-audit',
  templateUrl: './internal-audit.component.html',
  styles: [`
    .tabs { display:flex; gap:4px; border-bottom:2px solid var(--border); margin-bottom:24px; }
    .tab  { padding:10px 20px; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-3); border-bottom:2px solid transparent; margin-bottom:-2px; }
    .tab.active { color:#6b4df0; border-color:#6b4df0; }
    .kpi-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-bottom:24px; }
    .kpi-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; text-align:center; }
    .kpi-val  { font-size:28px; font-weight:800; }
    .kpi-lbl  { font-size:12px; color:var(--text-3); margin-top:4px; }
    .card     { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; }
    .table-wrap { overflow-x:auto; }
    table { width:100%; border-collapse:collapse; }
    th { padding:10px; text-align:left; font-size:12px; color:var(--text-3); font-weight:600; border-bottom:2px solid var(--border); }
    td { padding:10px; border-bottom:1px solid var(--border); font-size:13px; }
    tr:hover td { background:var(--surface-alt); }
    .badge { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; }
    .badge-draft     { background:#e0e7ff; color:#3730a3; }
    .badge-inprogress{ background:#fef3c7; color:#92400e; }
    .badge-completed { background:#d1fae5; color:#065f46; }
    .badge-approved  { background:#e0f2fe; color:#0369a1; }
    .risk-high   { background:#fee2e2; color:#991b1b; }
    .risk-medium { background:#fef3c7; color:#92400e; }
    .risk-low    { background:#d1fae5; color:#065f46; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .form-row  { display:flex; flex-direction:column; gap:4px; }
    .form-label{ font-size:12px; font-weight:700; color:var(--text-2); }
    .input, .select, .textarea { width:100%; padding:8px 12px; border:1.5px solid var(--border); border-radius:8px; font-size:13px; background:var(--surface); color:var(--text); box-sizing:border-box; }
    .textarea  { min-height:80px; resize:vertical; }
    .input:focus,.select:focus,.textarea:focus { outline:none; border-color:var(--primary); }
    .btn       { padding:8px 18px; border-radius:8px; font-weight:600; font-size:13px; cursor:pointer; border:none; }
    .btn-primary { background:#6b4df0; color:#fff; }
    .btn-primary:hover { background:#5a3edb; }
    .btn-ghost   { background:transparent; border:1.5px solid var(--border); color:var(--text); }
    .btn-danger  { background:#ef4444; color:#fff; }
    .btn-sm      { padding:5px 12px; font-size:12px; }
    .section-header { font-size:14px; font-weight:700; color:var(--text); margin:20px 0 10px; border-bottom:1.5px solid var(--border); padding-bottom:8px; }
    .obs-card { border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:12px; }
    .obs-card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .obs-title { font-weight:700; font-size:14px; }
    .detail-row { display:grid; grid-template-columns:160px 1fr; gap:8px; padding:6px 0; border-bottom:1px solid var(--border); font-size:13px; }
    .detail-lbl { font-weight:600; color:var(--text-2); font-size:12px; }
    .chart-bar-row { display:flex; align-items:center; gap:10px; margin-bottom:8px; font-size:13px; }
    .chart-bar-bg  { flex:1; height:20px; background:var(--surface-alt); border-radius:4px; overflow:hidden; }
    .chart-bar-fill{ height:100%; border-radius:4px; transition:width 0.4s ease; }
    .chart-label   { width:140px; font-weight:600; font-size:12px; }
    .chart-val     { width:32px; text-align:right; font-weight:700; font-size:13px; }
    .donut-wrap    { position:relative; width:160px; height:160px; margin:auto; }
    .donut-hole    { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:100px; height:100px; border-radius:50%; background:var(--surface); display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .donut-total   { font-size:24px; font-weight:800; }
    .donut-sub     { font-size:11px; color:var(--text-3); }
    .legend-row    { display:flex; align-items:center; gap:8px; font-size:12px; margin-bottom:4px; }
    .legend-dot    { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
    .flex-between  { display:flex; justify-content:space-between; align-items:center; }
    .gap-2         { gap:8px; }
    .mb-4          { margin-bottom:16px; }
    .mb-6          { margin-bottom:24px; }
    .tag-list { display:flex; flex-wrap:wrap; gap:6px; }
    .tag { padding:3px 10px; border-radius:20px; font-size:11px; background:rgba(107,77,240,.1); color:#6b4df0; font-weight:600; }
    .empty-state { display:flex; flex-direction:column; align-items:center; text-align:center; padding:56px 24px; background:var(--surface); border:1.5px dashed var(--border); border-radius:16px; margin-top:8px; }
    .empty-icon-wrap { width:88px; height:88px; border-radius:50%; background:rgba(107,77,240,.08); display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
    .empty-title { font-size:20px; font-weight:800; color:var(--text); margin:0 0 8px; }
    .empty-desc { font-size:14px; color:var(--text-3); max-width:420px; line-height:1.7; margin-bottom:20px; }
    .empty-hint { font-size:13px; color:var(--text-3); margin-top:10px; }
    .empty-features { display:grid; grid-template-columns:1fr 1fr; gap:10px 24px; margin-top:24px; text-align:left; }
    .empty-feature { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--text-2); }
    .ef-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .kpi-icon-box { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; }
    .kpi-sub { font-size:11px; color:var(--text-3); margin-top:4px; }
    .card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
    .card-title { font-size:13px; font-weight:700; }
    .card-badge { background:rgba(107,77,240,.1); color:#6b4df0; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:700; }
    .recent-report-row { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:8px; cursor:pointer; border:1px solid var(--border); gap:12px; transition:background .15s; }
    .recent-report-row:hover { background:var(--surface-alt); }
    .obs-chip { font-size:11px; font-weight:700; color:#6b4df0; background:rgba(107,77,240,.08); padding:2px 8px; border-radius:20px; white-space:nowrap; }
  `]
})
export class InternalAuditComponent implements OnInit {
  private api = `${environment.apiUrl}/api/internal-audit`;

  activeTab = 'dashboard';
  loading = false;
  reports: AuditReport[] = [];
  selectedReport: ReportDetail | null = null;

  filterDept = '';
  filterStatus = '';
  filterYear = '';

  showCreateForm = false;
  showObsForm = false;
  editingObsId: string | null = null;

  deptTypes = ['HR','IT','Finance','Admin','Procurement','Safety','Legal','Operations'];
  statusOptions = ['Draft','InProgress','Completed','Approved'];
  riskLevels = ['High','Medium','Low'];
  obsStatuses = ['Open','InProgress','Closed'];

  createForm: any = {
    title: '', departmentType: 'HR', financialYear: '', auditDate: '',
    auditedBy: '', reviewedBy: '', approvedBy: '', executiveSummary: ''
  };

  obsForm: AuditObservation = {
    title: '', riskLevel: 'Medium', status: 'Open', processArea: '',
    background: '', detailedObservation: '',
    risks: [], recommendations: [],
    mgmtCause: '', mgmtCorrectiveAction: '', mgmtPreventiveAction: '',
    mgmtTargetDate: '', mgmtResponsiblePerson: '', mgmtResponsibleDesignation: '',
    isAlreadyImplemented: false, isProcessImprovement: false
  };

  risksInput = '';
  recsInput = '';

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private auth: AuthService
  ) {}

  get isSuperAdmin(): boolean {
    const role = this.auth.getCurrentUser()?.role;
    return role === 'SuperAdmin' || role === 'TenantAdmin';
  }

  ngOnInit(): void {
    this.loadReports();
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'reports' && !this.reports.length) this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    const params: any = {};
    if (this.filterDept) params.departmentType = this.filterDept;
    if (this.filterStatus) params.status = this.filterStatus;
    if (this.filterYear) params.financialYear = this.filterYear;

    this.http.get<AuditReport[]>(`${this.api}/reports`, { params }).subscribe({
      next: data => { this.reports = [...data]; this.loading = false; },
      error: () => { this.snack.open('Failed to load audit reports', 'Close', { duration: 3000 }); this.loading = false; }
    });
  }

  viewReport(report: AuditReport): void {
    this.loading = true;
    this.http.get<ReportDetail>(`${this.api}/reports/${report.id}`).subscribe({
      next: data => {
        this.selectedReport = data;
        this.activeTab = 'detail';
        this.loading = false;
      },
      error: () => { this.snack.open('Failed to load report details', 'Close', { duration: 3000 }); this.loading = false; }
    });
  }

  backToList(): void {
    this.selectedReport = null;
    this.activeTab = 'reports';
    this.showObsForm = false;
    this.editingObsId = null;
  }

  createReport(): void {
    this.loading = true;
    this.http.post<{ id: string }>(`${this.api}/reports`, this.createForm).subscribe({
      next: result => {
        this.snack.open('Report created successfully', 'Close', { duration: 2500 });
        this.showCreateForm = false;
        this.loading = false;
        this.loadReports();
        this.activeTab = 'reports';
      },
      error: () => { this.snack.open('Failed to create report', 'Close', { duration: 3000 }); this.loading = false; }
    });
  }

  deleteReport(report: AuditReport): void {
    this.http.delete(`${this.api}/reports/${report.id}`).subscribe({
      next: () => {
        this.reports = this.reports.filter(r => r.id !== report.id);
        this.snack.open('Report deleted', 'Close', { duration: 2000 });
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 })
    });
  }

  updateStatus(report: ReportDetail, status: string): void {
    this.http.put(`${this.api}/reports/${report.id}`, { ...report, status }).subscribe({
      next: () => {
        report.status = status;
        this.snack.open('Status updated', 'Close', { duration: 2000 });
      },
      error: () => this.snack.open('Update failed', 'Close', { duration: 3000 })
    });
  }

  openObsForm(obs?: AuditObservation): void {
    if (obs) {
      this.editingObsId = obs.id ?? null;
      this.obsForm = { ...obs };
      this.risksInput = (obs.risks ?? []).join('\n');
      this.recsInput = (obs.recommendations ?? []).join('\n');
    } else {
      this.editingObsId = null;
      this.obsForm = {
        title: '', riskLevel: 'Medium', status: 'Open', processArea: '',
        background: '', detailedObservation: '',
        risks: [], recommendations: [],
        mgmtCause: '', mgmtCorrectiveAction: '', mgmtPreventiveAction: '',
        mgmtTargetDate: '', mgmtResponsiblePerson: '', mgmtResponsibleDesignation: '',
        isAlreadyImplemented: false, isProcessImprovement: false
      };
      this.risksInput = '';
      this.recsInput = '';
    }
    this.showObsForm = true;
  }

  saveObservation(): void {
    if (!this.selectedReport) return;

    this.obsForm.risks = this.risksInput.split('\n').map(s => s.trim()).filter(Boolean);
    this.obsForm.recommendations = this.recsInput.split('\n').map(s => s.trim()).filter(Boolean);

    const isEdit = !!this.editingObsId;
    const url = isEdit
      ? `${this.api}/observations/${this.editingObsId}`
      : `${this.api}/reports/${this.selectedReport.id}/observations`;
    const req = isEdit
      ? this.http.put(url, this.obsForm)
      : this.http.post<{ id: string; observationNumber: number }>(url, this.obsForm);

    this.loading = true;
    req.subscribe({
      next: () => {
        this.showObsForm = false;
        this.loading = false;
        this.viewReport(this.selectedReport!);
        this.snack.open(isEdit ? 'Observation updated' : 'Observation added', 'Close', { duration: 2000 });
      },
      error: () => { this.snack.open('Failed to save observation', 'Close', { duration: 3000 }); this.loading = false; }
    });
  }

  deleteObservation(obs: AuditObservation): void {
    if (!obs.id) return;
    this.http.delete(`${this.api}/observations/${obs.id}`).subscribe({
      next: () => {
        if (this.selectedReport) {
          this.selectedReport.observations = this.selectedReport.observations.filter(o => o.id !== obs.id);
          this.recalcLocalCounts();
        }
        this.snack.open('Observation deleted', 'Close', { duration: 2000 });
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 })
    });
  }

  exportPdf(): void {
    if (!this.selectedReport) return;
    window.open(`${this.api}/reports/${this.selectedReport.id}/export/pdf`, '_blank');
  }

  private recalcLocalCounts(): void {
    const obs = this.selectedReport!.observations;
    this.selectedReport!.totalObservations = obs.length;
    this.selectedReport!.highRiskCount = obs.filter(o => o.riskLevel === 'High').length;
    this.selectedReport!.mediumRiskCount = obs.filter(o => o.riskLevel === 'Medium').length;
    this.selectedReport!.lowRiskCount = obs.filter(o => o.riskLevel === 'Low').length;
    this.selectedReport!.closedCount = obs.filter(o => o.status === 'Closed').length;
  }

  // ─── Dashboard computed ──────────────────────────────────────────

  get totalReports(): number { return this.reports.length; }
  get totalObservations(): number { return this.reports.reduce((s, r) => s + r.totalObservations, 0); }
  get totalHighRisk(): number { return this.reports.reduce((s, r) => s + r.highRiskCount, 0); }
  get totalClosed(): number { return this.reports.reduce((s, r) => s + r.closedCount, 0); }
  get openRate(): string {
    const total = this.totalObservations;
    if (!total) return '0%';
    return Math.round(((total - this.totalClosed) / total) * 100) + '%';
  }

  get deptBreakdown(): { dept: string; count: number; pct: number }[] {
    const map = new Map<string, number>();
    for (const r of this.reports) map.set(r.departmentType, (map.get(r.departmentType) ?? 0) + 1);
    const max = Math.max(...map.values(), 1);
    return Array.from(map.entries())
      .map(([dept, count]) => ({ dept, count, pct: Math.round((count / max) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }

  get statusBreakdown(): { status: string; count: number; color: string }[] {
    const map = new Map<string, number>();
    for (const r of this.reports) map.set(r.status, (map.get(r.status) ?? 0) + 1);
    const colors: Record<string, string> = {
      Draft: '#a5b4fc', InProgress: '#fcd34d', Completed: '#6ee7b7', Approved: '#67e8f9'
    };
    return Array.from(map.entries()).map(([status, count]) => ({
      status, count, color: colors[status] ?? '#cbd5e1'
    }));
  }

  get riskDonutStyle(): string {
    const h = this.totalHighRisk;
    const m = this.reports.reduce((s, r) => s + r.mediumRiskCount, 0);
    const l = this.reports.reduce((s, r) => s + r.lowRiskCount, 0);
    const total = h + m + l || 1;
    const hDeg = (h / total) * 360;
    const mDeg = (m / total) * 360;
    const lDeg = (l / total) * 360;
    return `conic-gradient(#ef4444 0deg ${hDeg}deg,#f59e0b ${hDeg}deg ${hDeg + mDeg}deg,#10b981 ${hDeg + mDeg}deg ${hDeg + mDeg + lDeg}deg,#e2e8f0 ${hDeg + mDeg + lDeg}deg 360deg)`;
  }

  get totalMediumRisk(): number { return this.reports.reduce((s, r) => s + r.mediumRiskCount, 0); }
  get totalLowRisk(): number { return this.reports.reduce((s, r) => s + r.lowRiskCount, 0); }
  get recentReports(): AuditReport[] { return this.reports.slice(0, 5); }
  get openObservations(): number { return this.totalObservations - this.totalClosed; }
  get avgObsPerReport(): string {
    if (!this.totalReports) return '0';
    return (this.totalObservations / this.totalReports).toFixed(1);
  }
  get highRiskPct(): string {
    if (!this.totalObservations) return '0%';
    return Math.round((this.totalHighRisk / this.totalObservations) * 100) + '%';
  }
  get closureRatePct(): string {
    if (!this.totalObservations) return '0%';
    return Math.round((this.totalClosed / this.totalObservations) * 100) + '%';
  }

  badgeClass(status: string): string {
    const map: Record<string, string> = {
      Draft: 'badge-draft', InProgress: 'badge-inprogress', Completed: 'badge-completed', Approved: 'badge-approved'
    };
    return 'badge ' + (map[status] ?? 'badge-draft');
  }

  riskClass(level: string): string {
    const map: Record<string, string> = { High: 'risk-high', Medium: 'risk-medium', Low: 'risk-low' };
    return 'badge ' + (map[level] ?? 'risk-low');
  }
}
