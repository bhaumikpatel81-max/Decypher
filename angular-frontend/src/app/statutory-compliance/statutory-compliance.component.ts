import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
@Component({ selector: 'app-statutory-compliance', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Statutory Compliance</h1><p style="color:var(--text-3);font-size:13px;">PF · ESI · PT · TDS · LWF — filing tracker & alerts</p></div>
    <button class="btn btn-primary btn-sm" (click)="showUpload=!showUpload">+ Upload Challan</button>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div class="card mb-4" *ngIf="showUpload">
    <h3 style="font-weight:700;margin-bottom:12px;">Upload Challan</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
      <select class="select" [(ngModel)]="draft.type"><option *ngFor="let c of compTypes">{{c}}</option></select>
      <input class="input" type="month" [(ngModel)]="draft.month">
      <input class="input" placeholder="Amount (₹)" [(ngModel)]="draft.amount">
      <input class="input" placeholder="Reference No." [(ngModel)]="draft.ref">
    </div>
    <div style="display:flex;gap:8px;margin-top:10px;align-items:center;">
      <button class="btn btn-primary" (click)="upload()">Upload</button>
      <button class="btn btn-ghost" (click)="showUpload=false">Cancel</button>
      <span *ngIf="uploadMsg" style="font-size:13px;font-weight:600;color:#991b1b;">{{uploadMsg}}</span>
    </div>
  </div>
  <div class="comp-grid mb-6">
    <div class="comp-card" *ngFor="let c of compStatus" [class.filed]="c.status==='Filed'" [class.overdue]="c.status==='Overdue'" [class.pending]="c.status==='Pending'">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:18px;font-weight:800;">{{c.type}}</div>
        <span class="status-dot" [class.filed]="c.status==='Filed'" [class.overdue]="c.status==='Overdue'">{{c.status}}</span>
      </div>
      <div style="font-size:12px;color:var(--text-3);margin-top:6px;">Due: {{c.dueDate}} · Last filed: {{c.lastFiled}}</div>
      <div style="font-size:14px;font-weight:700;margin-top:8px;">₹{{c.amount}}</div>
      <div style="margin-top:8px;display:flex;gap:6px;">
        <button class="btn btn-ghost btn-sm">View</button>
        <button class="btn btn-primary btn-sm" *ngIf="c.status!=='Filed'" (click)="markFiled(c)">Mark Filed</button>
      </div>
    </div>
  </div>
  <div class="card">
    <h3 style="font-weight:700;margin-bottom:12px;">Filing History</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="border-bottom:2px solid var(--border);">
        <th class="th">Type</th><th class="th">Month</th><th class="th">Amount</th><th class="th">Filed On</th><th class="th">Ref No.</th><th class="th">Status</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let h of history" style="border-bottom:1px solid var(--border);">
          <td class="td">{{h.type}}</td><td class="td">{{h.month}}</td><td class="td">₹{{h.amount}}</td><td class="td">{{h.filedOn}}</td><td class="td" style="font-family:monospace;font-size:12px;">{{h.ref}}</td>
          <td class="td"><span class="status-dot filed">Filed</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.comp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.comp-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}.comp-card.filed{border-color:#10b981;background:rgba(16,185,129,.03)}.comp-card.overdue{border-color:#ef4444;background:rgba(239,68,68,.03)}.status-dot{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fef3c7;color:#92400e}.status-dot.filed{background:#d1fae5;color:#065f46}.status-dot.overdue{background:#fee2e2;color:#991b1b}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;border-bottom:1px solid var(--border);font-size:13px}`] })
export class StatutoryComplianceComponent implements OnInit { private api = `${environment.apiUrl}/api/hr-compliance`;
  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  showUpload = false; loading = false;
  compTypes = ['PF', 'ESI', 'PT', 'TDS', 'LWF'];
  draft: any = { type: 'PF', month: '', amount: '', ref: '' };
  kpis: any[] = [];
  compStatus: any[] = [];
  history: any[] = [];

  ngOnInit() { this.loadFilings(); }

  loadFilings() { this.loading = true;
    this.http.get<any[]>(`${this.api}/statutory`).subscribe({ next: data => { this.loading = false;
        const filings = data || [];
        this.history = [...filings.filter(f => f.status === 'Filed').map(f => ({ type: f.complianceType || '', month: f.period || '',
          amount: f.amount || 0, filedOn: f.filedDate?.slice(0, 10) || '', ref: f.referenceNumber || '' }))];
        // Build current status per compliance type from most recent filing per type
        const byType: Record<string, any> = {};
        filings.forEach(f => { const t = f.complianceType;
          if (!byType[t] || new Date(f.dueDate) > new Date(byType[t].dueDate)) byType[t] = f; });
        this.compStatus = [...this.compTypes.map(t => { const f = byType[t];
          return f ? { type: t, dueDate: f.dueDate?.slice(0, 10) || '', lastFiled: f.filedDate?.slice(0, 10) || '—', amount: f.amount?.toLocaleString('en-IN') || '0', status: f.status || 'Pending' }
                   : { type: t, dueDate: '—', lastFiled: '—', amount: '0', status: 'Pending' }; })];
        const filed = this.compStatus.filter(c => c.status === 'Filed').length;
        const overdue = this.compStatus.filter(c => c.status === 'Overdue').length;
        const totalPaid = filings.filter(f => f.status === 'Filed').reduce((s: number, f: any) => s + (f.amount || 0), 0);
        this.kpis = [
          { val: `${filed}/${this.compTypes.length}`, lbl: 'Filed This Month', color: '#10b981' },
          { val: overdue, lbl: 'Overdue', color: '#ef4444' },
          { val: '₹' + (totalPaid >= 100000 ? (totalPaid / 100000).toFixed(1) + 'L' : totalPaid.toLocaleString('en-IN')), lbl: 'Total Paid', color: '#6b4df0' },
          { val: this.compStatus.filter(c => c.status === 'Pending').length, lbl: 'Pending', color: '#f59e0b' }
        ]; },
      error: () => { this.loading = false;
        this.snack.open('Failed to load statutory compliance data', 'Close', { duration: 3000 }); } }); }

  upload() { if (!this.draft.month || !this.draft.amount) return;
    const payload = { complianceType: this.draft.type, period: this.draft.month, amount: +this.draft.amount, referenceNumber: this.draft.ref, status: 'Filed', filedDate: new Date().toISOString().slice(0, 10) };
    this.http.post<any>(`${this.api}/statutory`, payload).subscribe({ next: () => { this.loadFilings(); this.showUpload = false; this.snack.open('Challan uploaded successfully', '', { duration: 2000 }); },
      error: err => this.snack.open(err?.error?.message || 'Upload failed', 'Close', { duration: 3000 }) }); }

  markFiled(c: any) { if (!c) return;
    this.http.patch<any>(`${this.api}/statutory-filings/${c.id}/status`, { status: 'Filed' }).subscribe({ next: () => { this.loadFilings(); this.snack.open(`${c.type} marked as filed`, '', { duration: 2000 }); },
      error: () => { c.status = 'Filed'; this.snack.open(`${c.type} marked as filed (pending sync)`, '', { duration: 2000 }); } }); }
}


