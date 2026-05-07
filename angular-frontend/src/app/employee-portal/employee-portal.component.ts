import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-employee-portal',
  template: `
    <div class="portal-layout">
      <!-- Sidebar -->
      <div class="portal-sidebar">
        <div class="portal-brand">
          <div style="font-size:18px;font-weight:900;color:#6b4df0;">DECYPHER</div>
          <div style="font-size:11px;color:var(--text-3);">Employee Portal</div>
        </div>
        <nav class="portal-nav">
          <button *ngFor="let item of navItems" class="nav-btn" [class.active]="activeSection===item.id" (click)="activeSection=item.id">
            <span style="font-size:16px;">{{item.icon}}</span>
            <span>{{item.label}}</span>
          </button>
        </nav>
        <div class="portal-user-card">
          <div class="emp-avatar">{{profile?.firstName?.[0]||'?'}}</div>
          <div>
            <div style="font-weight:700;font-size:13px;">{{profile?.firstName}} {{profile?.lastName}}</div>
            <div style="font-size:11px;color:var(--text-3);">{{profile?.designation}}</div>
          </div>
        </div>
      </div>

      <!-- Main -->
      <div class="portal-main">

        <!-- HOME -->
        <div *ngIf="activeSection==='home'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">Welcome back, {{profile?.firstName||'there'}} 👋</h2>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
            <div class="kpi-card" *ngFor="let k of homeKpis">
              <div class="kpi-val" [style.color]="k.color">{{k.val}}</div>
              <div class="kpi-lbl">{{k.lbl}}</div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card mb-6">
            <h4 style="font-weight:700;margin-bottom:12px;">Quick Actions</h4>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm" (click)="activeSection='leave'">Apply Leave</button>
              <button class="btn btn-ghost btn-sm" (click)="activeSection='payslips'">Download Payslip</button>
              <button class="btn btn-ghost btn-sm" (click)="activeSection='helpdesk'">Raise Ticket</button>
              <button class="btn btn-ghost btn-sm" (click)="activeSection='profile'">Update Profile</button>
            </div>
          </div>

          <!-- Announcements -->
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:12px;">Announcements</h4>
            <div *ngFor="let a of announcements" style="padding:12px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <div style="font-weight:600;font-size:14px;">{{a.title}}</div>
                  <div style="font-size:13px;color:var(--text-3);margin-top:4px;">{{a.content}}</div>
                </div>
                <span style="font-size:11px;color:var(--text-3);white-space:nowrap;margin-left:12px;">{{a.publishedAt|date:'dd MMM'}}</span>
              </div>
            </div>
            <div *ngIf="!announcements.length" style="padding:20px;text-align:center;color:var(--text-3);font-size:13px;">No announcements.</div>
          </div>
        </div>

        <!-- PROFILE -->
        <div *ngIf="activeSection==='profile'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">My Profile</h2>
          <div class="card" style="max-width:640px;">
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
              <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6b4df0,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#fff;">
                {{profile?.firstName?.[0]}}
              </div>
              <div>
                <div style="font-size:20px;font-weight:800;">{{profile?.firstName}} {{profile?.lastName}}</div>
                <div style="font-size:13px;color:var(--text-3);">{{profile?.designation}} · {{profile?.department}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{profile?.employeeCode}} · {{profile?.email}}</div>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="prof-field"><span class="pf-label">Employee ID</span><span class="pf-val">{{profile?.employeeCode}}</span></div>
              <div class="prof-field"><span class="pf-label">Department</span><span class="pf-val">{{profile?.department}}</span></div>
              <div class="prof-field"><span class="pf-label">Date of Joining</span><span class="pf-val">{{profile?.dateOfJoining|date:'dd MMM yyyy'}}</span></div>
              <div class="prof-field"><span class="pf-label">Employment Type</span><span class="pf-val">{{profile?.employmentType}}</span></div>
              <div class="prof-field"><span class="pf-label">Phone</span><span class="pf-val">{{profile?.phone||'—'}}</span></div>
              <div class="prof-field"><span class="pf-label">Location</span><span class="pf-val">{{profile?.location||'—'}}</span></div>
            </div>
          </div>
        </div>

        <!-- PAYSLIPS -->
        <div *ngIf="activeSection==='payslips'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">My Payslips</h2>
          <div class="card" style="padding:0;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;">
              <thead style="background:var(--surface-alt);">
                <tr>
                  <th class="th">Period</th>
                  <th class="th">Gross Pay</th>
                  <th class="th">Deductions</th>
                  <th class="th">Net Pay</th>
                  <th class="th">Status</th>
                  <th class="th"></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let p of payslips" style="border-bottom:1px solid var(--border);">
                  <td class="td" style="font-weight:600;">{{p.periodLabel}}</td>
                  <td class="td">₹{{p.grossPay|number}}</td>
                  <td class="td" style="color:#ef4444;">₹{{p.totalDeductions|number}}</td>
                  <td class="td" style="font-weight:700;color:#6b4df0;">₹{{p.netPay|number}}</td>
                  <td class="td"><span style="padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;background:#d1fae5;color:#065f46;">{{p.status||'Processed'}}</span></td>
                  <td class="td"><button class="btn btn-ghost btn-sm" (click)="downloadPayslip(p.id)">Download</button></td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="!payslips.length" style="padding:40px;text-align:center;color:var(--text-3);">No payslips found.</div>
          </div>
        </div>

        <!-- LEAVE -->
        <div *ngIf="activeSection==='leave'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">Leave Management</h2>

          <!-- Balances -->
          <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
            <div *ngFor="let b of leaveBalances" class="leave-bal-card">
              <div style="font-size:24px;font-weight:800;color:#6b4df0;">{{b.remaining}}</div>
              <div style="font-size:12px;color:var(--text-3);">{{b.leaveTypeName||b.type}}</div>
              <div style="font-size:11px;color:var(--text-3);">of {{b.totalAllotted||b.total}} days</div>
            </div>
          </div>

          <!-- Apply form -->
          <div class="card" style="max-width:520px;margin-bottom:20px;">
            <h4 style="font-weight:700;margin-bottom:14px;">Apply for Leave</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <select class="select" [(ngModel)]="leaveForm.type">
                <option value="">Select leave type</option>
                <option *ngFor="let b of leaveBalances">{{b.leaveTypeName||b.type}}</option>
              </select>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">From Date</label>
                  <input class="input" type="date" [(ngModel)]="leaveForm.from" style="margin-top:4px;">
                </div>
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">To Date</label>
                  <input class="input" type="date" [(ngModel)]="leaveForm.to" style="margin-top:4px;">
                </div>
              </div>
              <textarea class="textarea" [(ngModel)]="leaveForm.reason" rows="3" placeholder="Reason for leave" style="width:100%;"></textarea>
              <div *ngIf="leaveMsg" [style.background]="leaveMsg.includes('submitted')?'#d1fae5':'#fee2e2'" style="padding:8px 12px;border-radius:8px;font-size:13px;font-weight:600;" [style.color]="leaveMsg.includes('submitted')?'#065f46':'#991b1b'">{{leaveMsg}}</div>
              <button class="btn btn-primary" (click)="applyLeave()">Submit Leave Request</button>
            </div>
          </div>

          <!-- Leave History -->
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:12px;">My Leave Requests</h4>
            <div *ngFor="let l of leaveRequests" style="padding:10px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-weight:600;font-size:13px;">{{l.leaveTypeName||l.leaveType}} — {{l.reason}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{l.startDate|date:'dd MMM'}} – {{l.endDate|date:'dd MMM yyyy'}}</div>
              </div>
              <span style="padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;" [style.background]="l.status==='Approved'?'#d1fae5':l.status==='Rejected'?'#fee2e2':'#fef3c7'" [style.color]="l.status==='Approved'?'#065f46':l.status==='Rejected'?'#991b1b':'#92400e'">{{l.status}}</span>
            </div>
            <div *ngIf="!leaveRequests.length" style="padding:20px;text-align:center;color:var(--text-3);font-size:13px;">No leave requests found.</div>
          </div>
        </div>

        <!-- ANNOUNCEMENTS -->
        <div *ngIf="activeSection==='announcements'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">Announcements</h2>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div *ngFor="let a of announcements" class="card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <h4 style="font-weight:700;font-size:15px;">{{a.title}}</h4>
                <span style="font-size:11px;color:var(--text-3);">{{a.publishedAt|date:'dd MMM yyyy'}}</span>
              </div>
              <p style="font-size:13px;color:var(--text-3);line-height:1.6;">{{a.content}}</p>
            </div>
            <div *ngIf="!announcements.length" style="padding:40px;text-align:center;color:var(--text-3);">No announcements.</div>
          </div>
        </div>

        <!-- POLICIES -->
        <div *ngIf="activeSection==='policies'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">HR Policies</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div *ngFor="let p of policies" class="card" style="cursor:pointer;" (click)="viewPolicy(p)">
              <div style="font-size:28px;margin-bottom:8px;">📄</div>
              <div style="font-weight:700;font-size:14px;">{{p.title}}</div>
              <div style="font-size:12px;color:var(--text-3);margin-top:4px;">v{{p.version}} · {{p.category}}</div>
              <div style="margin-top:8px;">
                <span *ngIf="!p.acknowledged" style="font-size:11px;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:20px;font-weight:700;">Acknowledgment Pending</span>
                <span *ngIf="p.acknowledged" style="font-size:11px;background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:20px;font-weight:700;">✓ Acknowledged</span>
              </div>
            </div>
            <div *ngIf="!policies.length" style="padding:40px;text-align:center;color:var(--text-3);">No policies available.</div>
          </div>
        </div>

        <!-- HELPDESK (quick raise) -->
        <div *ngIf="activeSection==='helpdesk'">
          <h2 style="font-weight:800;font-size:20px;margin-bottom:20px;">Raise a Support Ticket</h2>
          <div class="card" style="max-width:560px;">
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">Category</label>
                  <select class="select" [(ngModel)]="ticketForm.category" style="margin-top:4px;">
                    <option>IT</option><option>HR</option><option>Finance</option><option>Admin</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">Priority</label>
                  <select class="select" [(ngModel)]="ticketForm.priority" style="margin-top:4px;">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">Title</label>
                <input class="input" [(ngModel)]="ticketForm.title" placeholder="Brief description of issue" style="margin-top:4px;">
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">Description</label>
                <textarea class="textarea" [(ngModel)]="ticketForm.description" rows="4" placeholder="Detailed description..." style="margin-top:4px;width:100%;"></textarea>
              </div>
              <div *ngIf="ticketMsg" [style.background]="ticketMsg.includes('success')?'#d1fae5':'#fee2e2'" style="padding:8px 12px;border-radius:8px;font-size:13px;font-weight:600;" [style.color]="ticketMsg.includes('success')?'#065f46':'#991b1b'">{{ticketMsg}}</div>
              <button class="btn btn-primary" (click)="submitTicket()">Submit Ticket</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .portal-layout { display:flex;min-height:100vh;background:var(--bg); }
    .portal-sidebar { width:220px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:0; }
    .portal-brand { padding:20px 16px;border-bottom:1px solid var(--border); }
    .portal-nav { flex:1;padding:12px 8px;display:flex;flex-direction:column;gap:2px; }
    .nav-btn { display:flex;align-items:center;gap:10px;padding:10px 12px;border:none;background:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:var(--text-2);width:100%;text-align:left;transition:background .15s; }
    .nav-btn:hover,.nav-btn.active { background:rgba(107,77,240,.1);color:#6b4df0;font-weight:700; }
    .portal-user-card { padding:16px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px; }
    .emp-avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6b4df0,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0; }
    .portal-main { flex:1;padding:28px;overflow-y:auto; }
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:26px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .th { padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.5px; }
    .td { padding:10px 12px;font-size:13px;vertical-align:middle; }
    .leave-bal-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;min-width:100px; }
    .prof-field { padding:8px 0;display:flex;flex-direction:column;gap:3px;border-bottom:1px solid var(--border); }
    .pf-label { font-size:11px;text-transform:uppercase;color:var(--text-3);font-weight:600;letter-spacing:.5px; }
    .pf-val { font-size:13px;font-weight:600; }
    .mb-6 { margin-bottom:24px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:13px; }
  `]
})
export class EmployeePortalComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  activeSection = 'home';
  profile: any = null;
  announcements: any[] = [];
  payslips: any[] = [];
  leaveBalances: any[] = [];
  leaveRequests: any[] = [];
  policies: any[] = [];
  leaveMsg = '';
  ticketMsg = '';

  navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'profile', icon: '👤', label: 'My Profile' },
    { id: 'payslips', icon: '💰', label: 'Payslips' },
    { id: 'leave', icon: '📅', label: 'Leave' },
    { id: 'announcements', icon: '📢', label: 'Announcements' },
    { id: 'policies', icon: '📋', label: 'Policies' },
    { id: 'helpdesk', icon: '🎫', label: 'Support' },
  ];

  homeKpis: any[] = [
    { val: '—', lbl: 'Leave Balance', color: '#6b4df0' },
    { val: '—', lbl: 'Payslips', color: '#10b981' },
    { val: '—', lbl: 'Open Tickets', color: '#ef4444' },
    { val: '—', lbl: 'Policies Due', color: '#f59e0b' },
  ];

  leaveForm: any = { type: '', from: '', to: '', reason: '' };
  ticketForm: any = { category: 'IT', priority: 'Medium', title: '', description: '' };

  ngOnInit() {
    this.loadProfile();
    this.loadAnnouncements();
    this.loadPayslips();
    this.loadLeaveBalances();
    this.loadLeaveRequests();
    this.loadPolicies();
  }

  loadProfile() {
    this.http.get<any>(`${this.apiUrl}/api/employees/me`).subscribe({
      next: data => {
        this.profile = data;
        this.homeKpis[0].val = (data?.leaveBalance || '—');
      },
      error: () => {}
    });
  }

  loadAnnouncements() {
    this.http.get<any[]>(`${this.apiUrl}/api/portal/announcements`).subscribe({
      next: data => { this.announcements = data || []; },
      error: () => {}
    });
  }

  loadPayslips() {
    this.http.get<any[]>(`${this.apiUrl}/api/payroll/payslips`).subscribe({
      next: data => {
        this.payslips = data || [];
        this.homeKpis[1].val = this.payslips.length;
      },
      error: () => {}
    });
  }

  loadLeaveBalances() {
    this.http.get<any[]>(`${this.apiUrl}/api/attendance/leave/balances`).subscribe({
      next: data => {
        this.leaveBalances = data || [];
        const total = this.leaveBalances.reduce((s, b) => s + (b.remaining || 0), 0);
        this.homeKpis[0].val = `${total}d`;
      },
      error: () => {}
    });
  }

  loadLeaveRequests() {
    this.http.get<any[]>(`${this.apiUrl}/api/attendance/leave/requests`).subscribe({
      next: data => { this.leaveRequests = data || []; },
      error: () => {}
    });
  }

  loadPolicies() {
    this.http.get<any[]>(`${this.apiUrl}/api/policies`).subscribe({
      next: data => {
        this.policies = (data || []).map(p => ({ ...p, acknowledged: false }));
        const due = this.policies.filter(p => !p.acknowledged).length;
        this.homeKpis[3].val = due;
      },
      error: () => {}
    });
  }

  applyLeave() {
    if (!this.leaveForm.type || !this.leaveForm.from || !this.leaveForm.to) { this.leaveMsg = 'Please fill all required fields'; return; }
    const payload = { leaveTypeName: this.leaveForm.type, startDate: this.leaveForm.from, endDate: this.leaveForm.to, reason: this.leaveForm.reason };
    this.http.post(`${this.apiUrl}/api/attendance/leave/requests`, payload).subscribe({
      next: () => {
        this.leaveMsg = 'Leave request submitted successfully';
        this.leaveForm = { type: '', from: '', to: '', reason: '' };
        this.loadLeaveRequests();
        setTimeout(() => this.leaveMsg = '', 3000);
      },
      error: () => { this.leaveMsg = 'Failed to submit leave request'; setTimeout(() => this.leaveMsg = '', 3000); }
    });
  }

  downloadPayslip(id: string) {
    this.http.get(`${this.apiUrl}/api/payroll/payslips/${id}/download`, { responseType: 'blob' }).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `payslip-${id}.pdf`;
      a.click(); URL.revokeObjectURL(url);
    });
  }

  viewPolicy(p: any) {
    if (!p.acknowledged && p.id) {
      this.http.post(`${this.apiUrl}/api/policies/${p.id}/acknowledge`, {}).subscribe();
      p.acknowledged = true;
    }
    if (p.documentUrl) window.open(p.documentUrl, '_blank');
  }

  submitTicket() {
    if (!this.ticketForm.title) { this.ticketMsg = 'Title is required'; return; }
    const payload = { ...this.ticketForm, requesterName: `${this.profile?.firstName||''} ${this.profile?.lastName||''}`.trim(), requesterEmail: this.profile?.email };
    this.http.post(`${this.apiUrl}/api/helpdesk/tickets`, payload).subscribe({
      next: (res: any) => {
        this.ticketMsg = `Ticket ${res.ticketNumber} created successfully`;
        this.ticketForm = { category: 'IT', priority: 'Medium', title: '', description: '' };
        this.homeKpis[2].val = (Number(this.homeKpis[2].val) || 0) + 1;
        setTimeout(() => this.ticketMsg = '', 3000);
      },
      error: () => { this.ticketMsg = 'Failed to submit ticket'; setTimeout(() => this.ticketMsg = '', 3000); }
    });
  }
}
