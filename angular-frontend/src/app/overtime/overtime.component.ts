import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface OTRecord {
  id: number; employee: string; empId: string; date: string;
  from: string; to: string; hours: number; reason: string;
  status: string; rate: number; pay: number;
}

@Component({
  selector: 'app-overtime',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Overtime Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Request · Approve · Track · Auto-Calculate</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='request'" (click)="tab='request'">OT Request</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='approvals'" (click)="tab='approvals'">Approvals</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='records'" (click)="tab='records'">OT Records</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{totalOTHours}}</div><div class="kpi-lbl">OT Hours This Month</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">₹{{totalOTCost | number}}</div><div class="kpi-lbl">OT Cost This Month</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{topOTEmployee}}</div><div class="kpi-lbl">Most OT Hours</div></div>
        <div class="kpi-card">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:4px;">
            <span style="font-size:12px;color:var(--text-3);">Auto Calc 1.5x</span>
            <div class="toggle" [class.on]="autoCalc" (click)="autoCalc=!autoCalc">
              <div class="toggle-knob"></div>
            </div>
          </div>
          <div class="kpi-lbl">OT Policy</div>
        </div>
      </div>

      <!-- REQUEST -->
      <div *ngIf="tab==='request'" class="card" style="max-width:580px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New OT Request</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of employees">{{e.name}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label>
              <input class="input" type="date" [(ngModel)]="form.date" style="margin-top:4px;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">From Time</label>
              <input class="input" type="time" [(ngModel)]="form.from" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">To Time</label>
              <input class="input" type="time" [(ngModel)]="form.to" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reason</label>
            <textarea class="textarea" [(ngModel)]="form.reason" rows="3" placeholder="Why overtime is required..." style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div *ngIf="form.from && form.to && autoCalc" style="padding:12px;background:rgba(107,77,240,.06);border-radius:8px;border:1px solid rgba(107,77,240,.2);">
            <div style="font-size:13px;font-weight:600;color:#6b4df0;">Estimated OT: {{calcFormHours()}} hrs at 1.5x rate</div>
          </div>
          <button class="btn btn-primary" (click)="submitOT()">Submit OT Request</button>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>

      <!-- APPROVALS -->
      <div *ngIf="tab==='approvals'">
        <h3 style="font-weight:700;margin-bottom:16px;">Pending OT Approvals</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let r of pendingOT" class="card" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-weight:700;font-size:14px;">{{r.employee}} <span style="font-size:12px;color:var(--text-3);">({{r.empId}})</span></div>
              <div style="font-size:12px;color:var(--text-3);margin-top:4px;">{{r.date}} · {{r.from}} – {{r.to}} · <strong>{{r.hours}}h</strong></div>
              <div style="font-size:12px;color:var(--text-3);">{{r.reason}}</div>
              <div *ngIf="autoCalc" style="font-size:12px;font-weight:600;color:#6b4df0;margin-top:4px;">Est. Pay: ₹{{r.pay | number}}</div>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-sm" style="background:#d1fae5;color:#065f46;" (click)="r.status='Approved'">Approve</button>
              <button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;" (click)="r.status='Rejected'">Reject</button>
            </div>
          </div>
          <div *ngIf="pendingOT.length===0" style="text-align:center;padding:32px;color:var(--text-3);">No pending OT requests</div>
        </div>
      </div>

      <!-- RECORDS -->
      <div *ngIf="tab==='records'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <input class="input" style="max-width:220px;" placeholder="Search..." [(ngModel)]="search">
          <select class="select" style="max-width:150px;" [(ngModel)]="filterStatus">
            <option value="">All</option><option>Approved</option><option>Rejected</option><option>Pending</option>
          </select>
        </div>
        <div class="card">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th><th class="th">Date</th><th class="th">From</th><th class="th">To</th>
              <th class="th">Hours</th><th class="th">Pay (1.5x)</th><th class="th">Status</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let r of filteredRecords" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><div style="font-weight:600;">{{r.employee}}</div><div style="font-size:11px;color:var(--text-3);">{{r.empId}}</div></td>
                <td class="td">{{r.date}}</td>
                <td class="td">{{r.from}}</td>
                <td class="td">{{r.to}}</td>
                <td class="td"><strong>{{r.hours}}h</strong></td>
                <td class="td" style="color:#10b981;font-weight:600;">₹{{r.pay | number}}</td>
                <td class="td"><span class="spill" [class.approved]="r.status==='Approved'" [class.pending]="r.status==='Pending'" [class.rejected]="r.status==='Rejected'">{{r.status}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .toggle { width:44px;height:24px;border-radius:12px;background:var(--border);cursor:pointer;position:relative;transition:background .2s; }
    .toggle.on { background:#6b4df0; }
    .toggle-knob { width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2); }
    .toggle.on .toggle-knob { left:22px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.approved { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
    .spill.rejected { background:#fee2e2;color:#991b1b; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class OvertimeComponent implements OnInit {
  private api = `${environment.apiUrl}/api/attendance`;
  constructor(private http: HttpClient) {}
  tab = 'request';
  autoCalc = true;
  search = '';
  filterStatus = '';
  msg = '';

  employees = [
    { name: 'Arjun Mehta', empId: 'EMP001', hourlyRate: 625 },
    { name: 'Priya Sharma', empId: 'EMP002', hourlyRate: 562 },
    { name: 'Rahul Gupta', empId: 'EMP003', hourlyRate: 500 },
    { name: 'Sneha Patel', empId: 'EMP004', hourlyRate: 468 },
    { name: 'Vikram Singh', empId: 'EMP005', hourlyRate: 437 },
    { name: 'Ananya Iyer', empId: 'EMP006', hourlyRate: 593 },
    { name: 'Kiran Desai', empId: 'EMP007', hourlyRate: 531 },
    { name: 'Rohan Nair', empId: 'EMP008', hourlyRate: 406 },
  ];

  form = { employee: '', date: '', from: '', to: '', reason: '' };

  records: OTRecord[] = [
    { id: 1, employee: 'Arjun Mehta', empId: 'EMP001', date: '2026-05-01', from: '18:00', to: '22:00', hours: 4, reason: 'Sprint deadline', status: 'Approved', rate: 937, pay: 3750 },
    { id: 2, employee: 'Rahul Gupta', empId: 'EMP003', date: '2026-05-02', from: '19:00', to: '23:00', hours: 4, reason: 'Server migration', status: 'Approved', rate: 750, pay: 3000 },
    { id: 3, employee: 'Sneha Patel', empId: 'EMP004', date: '2026-05-03', from: '18:00', to: '20:00', hours: 2, reason: 'UAT support', status: 'Pending', rate: 703, pay: 1406 },
    { id: 4, employee: 'Arjun Mehta', empId: 'EMP001', date: '2026-05-04', from: '18:00', to: '21:00', hours: 3, reason: 'Feature delivery', status: 'Pending', rate: 937, pay: 2812 },
    { id: 5, employee: 'Vikram Singh', empId: 'EMP005', date: '2026-04-28', from: '22:00', to: '02:00', hours: 4, reason: 'Night support', status: 'Approved', rate: 656, pay: 2625 },
    { id: 6, employee: 'Ananya Iyer', empId: 'EMP006', date: '2026-04-30', from: '18:00', to: '20:00', hours: 2, reason: 'Client presentation', status: 'Approved', rate: 890, pay: 1780 },
    { id: 7, employee: 'Kiran Desai', empId: 'EMP007', date: '2026-05-05', from: '18:00', to: '22:00', hours: 4, reason: 'Data reconciliation', status: 'Rejected', rate: 797, pay: 3187 },
    { id: 8, employee: 'Rohan Nair', empId: 'EMP008', date: '2026-05-05', from: '20:00', to: '23:00', hours: 3, reason: 'Network upgrade', status: 'Pending', rate: 609, pay: 1828 },
  ];

  get pendingOT() { return this.records.filter(r => r.status === 'Pending'); }
  get totalOTHours() { return this.records.filter(r => r.status === 'Approved').reduce((s, r) => s + r.hours, 0); }
  get totalOTCost() { return this.records.filter(r => r.status === 'Approved').reduce((s, r) => s + r.pay, 0); }
  get topOTEmployee() {
    const emp = this.employees.map(e => ({ name: e.name.split(' ')[0], hrs: this.records.filter(r => r.employee === e.name && r.status === 'Approved').reduce((s, r) => s + r.hours, 0) }));
    return emp.sort((a, b) => b.hrs - a.hrs)[0]?.name || 'N/A';
  }
  get filteredRecords() {
    return this.records.filter(r => {
      return (!this.search || r.employee.toLowerCase().includes(this.search.toLowerCase())) &&
        (!this.filterStatus || r.status === this.filterStatus);
    });
  }

  ngOnInit() {}

  calcFormHours(): number {
    if (!this.form.from || !this.form.to) return 0;
    const [fh, fm] = this.form.from.split(':').map(Number);
    const [th, tm] = this.form.to.split(':').map(Number);
    let diff = (th * 60 + tm) - (fh * 60 + fm);
    if (diff < 0) diff += 1440;
    return Math.round(diff / 60 * 10) / 10;
  }

  submitOT() {
    if (!this.form.employee || !this.form.date) { alert('Fill all fields'); return; }
    const emp = this.employees.find(e => e.name === this.form.employee)!;
    const hrs = this.calcFormHours();
    this.records.unshift({ id: Date.now(), employee: this.form.employee, empId: emp.empId, date: this.form.date, from: this.form.from, to: this.form.to, hours: hrs, reason: this.form.reason, status: 'Pending', rate: emp.hourlyRate * 1.5, pay: Math.round(hrs * emp.hourlyRate * 1.5) });
    this.msg = `OT request submitted for ${this.form.employee}`;
    this.form = { employee: '', date: '', from: '', to: '', reason: '' };
    setTimeout(() => this.msg = '', 3000);
  }
}
