import { Component, OnInit } from '@angular/core';

interface Policy {
  id: number; title: string; category: string; version: string;
  effectiveDate: string; status: string; acknowledged: number; total: number;
}

@Component({
  selector: 'app-policy-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Policy Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Library · Upload · Acknowledgement · Version Control</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='library'" (click)="tab='library'">Policy Library</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='add'" (click)="tab='add'">Add Policy</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='ack'" (click)="tab='ack'">Acknowledgements</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{policies.length}}</div><div class="kpi-lbl">Total Policies</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{activePolicies}}</div><div class="kpi-lbl">Active</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{pendingAck}}</div><div class="kpi-lbl">Pending Acknowledgements</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{avgAckRate | number:'1.0-0'}}%</div><div class="kpi-lbl">Avg Ack Rate</div></div>
      </div>

      <!-- SEARCH -->
      <div style="display:flex;gap:12px;margin-bottom:16px;" *ngIf="tab!=='add'">
        <input class="input" style="max-width:280px;" [(ngModel)]="search" placeholder="Search policies...">
        <select class="select" style="max-width:160px;" [(ngModel)]="filterCat">
          <option value="">All Categories</option>
          <option *ngFor="let c of categories">{{c}}</option>
        </select>
        <select class="select" style="max-width:150px;" [(ngModel)]="filterStatus">
          <option value="">All Status</option>
          <option>Active</option><option>Draft</option><option>Archived</option>
        </select>
      </div>

      <!-- LIBRARY -->
      <div *ngIf="tab==='library'">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
          <div *ngFor="let p of filteredPolicies" class="policy-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                  <span class="cat-badge" [style.background]="catColor(p.category)+'22'" [style.color]="catColor(p.category)">{{catIcon(p.category)}} {{p.category}}</span>
                  <span class="status-chip" [class.active]="p.status==='Active'" [class.draft]="p.status==='Draft'" [class.archived]="p.status==='Archived'">{{p.status}}</span>
                </div>
                <div style="font-weight:700;font-size:15px;margin-bottom:4px;">{{p.title}}</div>
                <div style="font-size:12px;color:var(--text-3);">v{{p.version}} · Effective: {{p.effectiveDate}}</div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div style="font-size:12px;color:var(--text-3);">Acknowledgements: {{p.acknowledged}}/{{p.total}}</div>
              <span style="font-size:12px;font-weight:700;color:#6b4df0;">{{((p.acknowledged/p.total)*100)|number:'1.0-0'}}%</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:5px;margin-bottom:10px;">
              <div style="height:5px;border-radius:4px;background:#6b4df0;" [style.width.%]="(p.acknowledged/p.total)*100"></div>
            </div>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-ghost btn-sm" (click)="viewPolicy(p)">View</button>
              <button class="btn btn-ghost btn-sm" (click)="sendAck(p)" *ngIf="p.acknowledged<p.total">Send Reminder</button>
              <button class="btn btn-primary btn-sm" (click)="sendForAck(p)" *ngIf="p.status==='Draft'">Publish</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD -->
      <div *ngIf="tab==='add'" class="card" style="max-width:560px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Add / Upload Policy</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Policy Title</label>
            <input class="input" [(ngModel)]="form.title" style="margin-top:4px;" placeholder="e.g. Work From Home Policy">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Category</label>
              <select class="select" [(ngModel)]="form.category" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let c of categories">{{c}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Version</label>
              <input class="input" [(ngModel)]="form.version" style="margin-top:4px;" placeholder="1.0">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Effective Date</label>
            <input class="input" type="date" [(ngModel)]="form.effectiveDate" style="margin-top:4px;">
          </div>
          <div style="padding:24px;border:2px dashed var(--border);border-radius:8px;text-align:center;color:var(--text-3);cursor:pointer;" (click)="uploadPolicy()">
            📎 Upload policy document (PDF/DOCX)
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary" (click)="addPolicy('Active')">Publish Policy</button>
            <button class="btn btn-ghost" (click)="addPolicy('Draft')">Save as Draft</button>
          </div>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>

      <!-- ACKNOWLEDGEMENTS -->
      <div *ngIf="tab==='ack'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Acknowledgement Tracking</h3>
        <table style="width:100%;border-collapse:collapse;min-width:800px;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th>
            <th *ngFor="let p of policies" class="th" style="text-align:center;font-size:10px;max-width:80px;">{{p.title.slice(0,20)}}</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let e of employees" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{e.name}}</strong><div style="font-size:11px;color:var(--text-3);">{{e.dept}}</div></td>
              <td *ngFor="let p of policies" class="td" style="text-align:center;">
                <span style="font-size:18px;" [title]="ackStatus(e.id,p.id)?'Acknowledged':'Pending'">{{ackStatus(e.id,p.id)?'✅':'⏳'}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .policy-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px; }
    .cat-badge { padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700; }
    .status-chip { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .status-chip.active { background:#d1fae5;color:#065f46; }
    .status-chip.draft { background:#fef3c7;color:#92400e; }
    .status-chip.archived { background:var(--surface-alt);color:var(--text-3); }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px;vertical-align:middle; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class PolicyManagementComponent implements OnInit {
  tab = 'library';
  search = '';
  filterCat = '';
  filterStatus = '';
  msg = '';

  categories = ['HR', 'IT', 'Finance', 'Legal', 'Safety'];

  form = { title: '', category: '', version: '1.0', effectiveDate: '' };

  policies: Policy[] = [
    { id: 1, title: 'Work From Home Policy', category: 'HR', version: '2.1', effectiveDate: '2026-01-01', status: 'Active', acknowledged: 7, total: 8 },
    { id: 2, title: 'Code of Conduct', category: 'HR', version: '3.0', effectiveDate: '2025-07-01', status: 'Active', acknowledged: 8, total: 8 },
    { id: 3, title: 'Information Security Policy', category: 'IT', version: '1.5', effectiveDate: '2025-10-01', status: 'Active', acknowledged: 6, total: 8 },
    { id: 4, title: 'Data Privacy & GDPR', category: 'Legal', version: '2.0', effectiveDate: '2025-05-25', status: 'Active', acknowledged: 5, total: 8 },
    { id: 5, title: 'Travel & Expense Policy', category: 'Finance', version: '1.2', effectiveDate: '2026-04-01', status: 'Active', acknowledged: 4, total: 8 },
    { id: 6, title: 'Office Safety Guidelines', category: 'Safety', version: '1.0', effectiveDate: '2025-03-01', status: 'Active', acknowledged: 8, total: 8 },
    { id: 7, title: 'POSH Policy', category: 'HR', version: '2.0', effectiveDate: '2024-12-01', status: 'Active', acknowledged: 8, total: 8 },
    { id: 8, title: 'Leave Policy 2026', category: 'HR', version: '1.0', effectiveDate: '2026-01-01', status: 'Draft', acknowledged: 0, total: 8 },
  ];

  employees = [
    { id: 'EMP001', name: 'Arjun Mehta', dept: 'Engineering' },
    { id: 'EMP002', name: 'Priya Sharma', dept: 'HR' },
    { id: 'EMP003', name: 'Rahul Gupta', dept: 'DevOps' },
    { id: 'EMP004', name: 'Sneha Patel', dept: 'QA' },
    { id: 'EMP005', name: 'Vikram Singh', dept: 'Support' },
    { id: 'EMP006', name: 'Ananya Iyer', dept: 'Business' },
    { id: 'EMP007', name: 'Kiran Desai', dept: 'Analytics' },
    { id: 'EMP008', name: 'Rohan Nair', dept: 'Infrastructure' },
  ];

  // empId → policyId → acknowledged
  ackData: { [empId: string]: { [policyId: number]: boolean } } = {
    EMP001: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: false },
    EMP002: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: false },
    EMP003: { 1: false, 2: true, 3: true, 4: false, 5: false, 6: true, 7: true, 8: false },
    EMP004: { 1: true, 2: true, 3: false, 4: false, 5: false, 6: true, 7: true, 8: false },
    EMP005: { 1: true, 2: true, 3: false, 4: false, 5: false, 6: true, 7: true, 8: false },
    EMP006: { 1: true, 2: true, 3: true, 4: true, 5: false, 6: true, 7: true, 8: false },
    EMP007: { 1: true, 2: true, 3: true, 4: false, 5: false, 6: true, 7: true, 8: false },
    EMP008: { 1: true, 2: true, 3: true, 4: false, 5: false, 6: true, 7: true, 8: false },
  };

  get activePolicies() { return this.policies.filter(p => p.status === 'Active').length; }
  get pendingAck() { return this.policies.reduce((s, p) => s + (p.total - p.acknowledged), 0); }
  get avgAckRate() { const a = this.policies.filter(p => p.total > 0); return a.length ? a.reduce((s, p) => s + (p.acknowledged / p.total) * 100, 0) / a.length : 0; }

  get filteredPolicies() {
    return this.policies.filter(p =>
      (!this.search || p.title.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.filterCat || p.category === this.filterCat) &&
      (!this.filterStatus || p.status === this.filterStatus)
    );
  }

  ackStatus(empId: string, policyId: number): boolean { return this.ackData[empId]?.[policyId] || false; }

  catColor(cat: string): string { const m: { [k: string]: string } = { HR: '#6b4df0', IT: '#3b82f6', Finance: '#10b981', Legal: '#f59e0b', Safety: '#ef4444' }; return m[cat] || '#6b4df0'; }
  catIcon(cat: string): string { const m: { [k: string]: string } = { HR: '👥', IT: '💻', Finance: '💰', Legal: '⚖️', Safety: '🛡️' }; return m[cat] || '📄'; }

  ngOnInit() {}

  viewPolicy(p: Policy) { alert(`Viewing policy: ${p.title} v${p.version}`); }
  sendAck(p: Policy) { alert(`Reminder sent to employees who haven't acknowledged "${p.title}"`); }
  sendForAck(p: Policy) { p.status = 'Active'; alert(`"${p.title}" published and sent for acknowledgement`); }
  uploadPolicy() { alert('Policy upload triggered'); }

  addPolicy(status: string) {
    if (!this.form.title || !this.form.category) { alert('Fill required fields'); return; }
    this.policies.unshift({ id: Date.now(), ...this.form, status, acknowledged: 0, total: 8 });
    this.msg = `Policy "${this.form.title}" ${status === 'Draft' ? 'saved as draft' : 'published'}`;
    this.form = { title: '', category: '', version: '1.0', effectiveDate: '' };
    setTimeout(() => this.msg = '', 3000);
  }
}
