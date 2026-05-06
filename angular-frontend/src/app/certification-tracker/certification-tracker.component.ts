import { Component, OnInit } from '@angular/core';

interface Certification {
  id: number; employee: string; empId: string; name: string;
  issuer: string; obtained: string; expiry: string; certId: string;
  status: string; daysLeft: number;
}

@Component({
  selector: 'app-certification-tracker',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Certification Tracker</h1>
          <p style="color:var(--text-3);font-size:13px;">Track · Alert · Renew · Download</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='list'" (click)="tab='list'">All Certs</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='add'" (click)="tab='add'">Add Cert</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='expiring'" (click)="tab='expiring'">Expiring Soon</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{certs.length}}</div><div class="kpi-lbl">Total Certifications</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{activeCerts}}</div><div class="kpi-lbl">Active</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{expiringSoon30}}</div><div class="kpi-lbl">Expiring in 30 Days</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{expiredCerts}}</div><div class="kpi-lbl">Expired</div></div>
      </div>

      <!-- Expiry Filter -->
      <div style="display:flex;gap:8px;margin-bottom:16px;" *ngIf="tab!=='add'">
        <button class="btn btn-ghost btn-sm" [class.btn-primary]="expiryFilter===0" (click)="expiryFilter=0">All</button>
        <button class="btn btn-ghost btn-sm" [class.btn-primary]="expiryFilter===30" (click)="expiryFilter=30">Expiring 30d</button>
        <button class="btn btn-ghost btn-sm" [class.btn-primary]="expiryFilter===60" (click)="expiryFilter=60">Expiring 60d</button>
        <button class="btn btn-ghost btn-sm" [class.btn-primary]="expiryFilter===90" (click)="expiryFilter=90">Expiring 90d</button>
        <input class="input" style="max-width:220px;margin-left:auto;" [(ngModel)]="search" placeholder="Search...">
      </div>

      <!-- LIST -->
      <div *ngIf="tab==='list' || tab==='expiring'" class="card" style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th><th class="th">Certification</th><th class="th">Issuing Body</th>
            <th class="th">Cert ID</th><th class="th">Obtained</th><th class="th">Expiry</th>
            <th class="th">Days Left</th><th class="th">Status</th><th class="th">Actions</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let c of filteredCerts" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{c.employee}}</strong><div style="font-size:11px;color:var(--text-3);">{{c.empId}}</div></td>
              <td class="td"><div style="font-weight:600;">{{c.name}}</div></td>
              <td class="td" style="font-size:12px;color:var(--text-3);">{{c.issuer}}</td>
              <td class="td" style="font-size:12px;font-family:monospace;color:var(--text-3);">{{c.certId}}</td>
              <td class="td">{{c.obtained}}</td>
              <td class="td">{{c.expiry}}</td>
              <td class="td" style="font-weight:700;" [style.color]="c.daysLeft<0?'#ef4444':c.daysLeft<30?'#f59e0b':'#10b981'">
                {{c.daysLeft<0?'Expired':(c.daysLeft+' days')}}
              </td>
              <td class="td"><span class="spill" [class.active]="c.status==='Active'" [class.expiring]="c.status==='Expiring Soon'" [class.expired]="c.status==='Expired'">{{c.status}}</span></td>
              <td class="td" style="display:flex;gap:6px;">
                <button class="btn btn-ghost btn-sm" (click)="viewCert(c)">View</button>
                <button class="btn btn-ghost btn-sm" style="color:#6b4df0;" (click)="renewCert(c)" *ngIf="c.status!=='Active' || c.daysLeft<90">Renew</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="filteredCerts.length===0" style="text-align:center;padding:32px;color:var(--text-3);">No certifications match the filter</div>
      </div>

      <!-- ADD -->
      <div *ngIf="tab==='add'" class="card" style="max-width:580px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Add Certification</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of empList">{{e.name}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Certification Name</label>
              <input class="input" [(ngModel)]="form.name" placeholder="e.g. AWS Solutions Architect" style="margin-top:4px;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Issuing Body</label>
              <input class="input" [(ngModel)]="form.issuer" placeholder="e.g. Amazon Web Services" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Certificate ID</label>
              <input class="input" [(ngModel)]="form.certId" placeholder="e.g. AWS-SAA-123456" style="margin-top:4px;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date Obtained</label>
              <input class="input" type="date" [(ngModel)]="form.obtained" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Expiry Date</label>
              <input class="input" type="date" [(ngModel)]="form.expiry" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Certificate File</label>
            <div style="margin-top:4px;padding:20px;border:2px dashed var(--border);border-radius:8px;text-align:center;color:var(--text-3);cursor:pointer;" (click)="uploadCert()">📎 Upload certificate (PDF/PNG)</div>
          </div>
          <button class="btn btn-primary" (click)="addCert()">Add Certification</button>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.active { background:#d1fae5;color:#065f46; }
    .spill.expiring { background:#fef3c7;color:#92400e; }
    .spill.expired { background:#fee2e2;color:#991b1b; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px;vertical-align:middle; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class CertificationTrackerComponent implements OnInit {
  tab = 'list';
  search = '';
  expiryFilter = 0;
  msg = '';

  empList = [
    { name: 'Arjun Mehta', id: 'EMP001' }, { name: 'Priya Sharma', id: 'EMP002' },
    { name: 'Rahul Gupta', id: 'EMP003' }, { name: 'Sneha Patel', id: 'EMP004' },
    { name: 'Vikram Singh', id: 'EMP005' }, { name: 'Ananya Iyer', id: 'EMP006' },
    { name: 'Kiran Desai', id: 'EMP007' }, { name: 'Rohan Nair', id: 'EMP008' },
  ];

  form = { employee: '', name: '', issuer: '', certId: '', obtained: '', expiry: '' };

  certs: Certification[] = [
    { id: 1, employee: 'Arjun Mehta', empId: 'EMP001', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', obtained: '2024-05-15', expiry: '2026-05-15', certId: 'AWS-SAA-000123', status: 'Expiring Soon', daysLeft: 9 },
    { id: 2, employee: 'Arjun Mehta', empId: 'EMP001', name: 'Angular Certified Developer', issuer: 'Google', obtained: '2025-01-10', expiry: '2027-01-10', certId: 'GGL-ANG-056789', status: 'Active', daysLeft: 614 },
    { id: 3, employee: 'Rahul Gupta', empId: 'EMP003', name: 'Kubernetes Administrator', issuer: 'CNCF', obtained: '2024-08-20', expiry: '2026-08-20', certId: 'CNCF-CKA-009876', status: 'Active', daysLeft: 106 },
    { id: 4, employee: 'Rahul Gupta', empId: 'EMP003', name: 'AWS DevOps Engineer', issuer: 'Amazon Web Services', obtained: '2023-11-05', expiry: '2025-11-05', certId: 'AWS-DEV-001234', status: 'Expired', daysLeft: -182 },
    { id: 5, employee: 'Sneha Patel', empId: 'EMP004', name: 'ISTQB Foundation', issuer: 'ISTQB', obtained: '2024-03-12', expiry: '2027-03-12', certId: 'ISTQB-FL-054321', status: 'Active', daysLeft: 675 },
    { id: 6, employee: 'Kiran Desai', empId: 'EMP007', name: 'Microsoft Power BI', issuer: 'Microsoft', obtained: '2025-02-14', expiry: '2027-02-14', certId: 'MS-PBI-078901', status: 'Active', daysLeft: 649 },
    { id: 7, employee: 'Ananya Iyer', empId: 'EMP006', name: 'PMP', issuer: 'PMI', obtained: '2023-06-01', expiry: '2026-06-01', certId: 'PMI-PMP-334455', status: 'Expiring Soon', daysLeft: 26 },
    { id: 8, employee: 'Rohan Nair', empId: 'EMP008', name: 'CCNA', issuer: 'Cisco', obtained: '2024-09-18', expiry: '2027-09-18', certId: 'CSC-CCNA-112233', status: 'Active', daysLeft: 865 },
    { id: 9, employee: 'Priya Sharma', empId: 'EMP002', name: 'SHRM-CP', issuer: 'SHRM', obtained: '2025-01-20', expiry: '2028-01-20', certId: 'SHRM-CP-556677', status: 'Active', daysLeft: 989 },
    { id: 10, employee: 'Vikram Singh', empId: 'EMP005', name: 'CompTIA A+', issuer: 'CompTIA', obtained: '2022-11-30', expiry: '2025-11-30', certId: 'CTIA-AP-998877', status: 'Expired', daysLeft: -157 },
    { id: 11, employee: 'Arjun Mehta', empId: 'EMP001', name: 'Scrum Master (CSM)', issuer: 'Scrum Alliance', obtained: '2025-03-10', expiry: '2027-03-10', certId: 'SA-CSM-445566', status: 'Active', daysLeft: 673 },
    { id: 12, employee: 'Kiran Desai', empId: 'EMP007', name: 'Google Data Analytics', issuer: 'Google', obtained: '2025-04-01', expiry: '2027-04-01', certId: 'GGL-DA-889900', status: 'Active', daysLeft: 695 },
  ];

  get activeCerts() { return this.certs.filter(c => c.status === 'Active').length; }
  get expiredCerts() { return this.certs.filter(c => c.status === 'Expired').length; }
  get expiringSoon30() { return this.certs.filter(c => c.daysLeft >= 0 && c.daysLeft <= 30).length; }

  get filteredCerts() {
    return this.certs.filter(c => {
      const matchSearch = !this.search || c.employee.toLowerCase().includes(this.search.toLowerCase()) || c.name.toLowerCase().includes(this.search.toLowerCase());
      const matchExpiry = !this.expiryFilter || (c.daysLeft >= 0 && c.daysLeft <= this.expiryFilter);
      const matchTab = this.tab === 'expiring' ? c.daysLeft >= 0 && c.daysLeft <= 90 : true;
      return matchSearch && matchExpiry && matchTab;
    });
  }

  ngOnInit() {}

  addCert() {
    if (!this.form.employee || !this.form.name) { alert('Fill required fields'); return; }
    const emp = this.empList.find(e => e.name === this.form.employee)!;
    const expiry = new Date(this.form.expiry);
    const today = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / 86400000);
    this.certs.unshift({ id: Date.now(), employee: this.form.employee, empId: emp.id, name: this.form.name, issuer: this.form.issuer, obtained: this.form.obtained, expiry: this.form.expiry, certId: this.form.certId, status: daysLeft < 0 ? 'Expired' : daysLeft < 30 ? 'Expiring Soon' : 'Active', daysLeft });
    this.msg = `Certification added for ${this.form.employee}`;
    this.form = { employee: '', name: '', issuer: '', certId: '', obtained: '', expiry: '' };
    setTimeout(() => this.msg = '', 3000);
  }

  viewCert(c: Certification) { alert(`Viewing certificate: ${c.name} (${c.certId})`); }
  renewCert(c: Certification) { alert(`Renewal initiated for ${c.name}`); }
  uploadCert() { alert('Certificate upload triggered'); }
}
