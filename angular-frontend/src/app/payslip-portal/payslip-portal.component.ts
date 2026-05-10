import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-payslip-portal',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Payslip Portal</h1>
          <p style="color:var(--text-3);font-size:13px;">Employee Self-Service · Download · Email</p>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:280px 1fr;gap:24px;">
        <!-- Left: Employee + Month Picker -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:12px;">Employee</h4>
            <select class="select" [(ngModel)]="selectedEmp" (ngModelChange)="loadPayslip()" style="margin-bottom:16px;">
              <option *ngFor="let e of employees" [value]="e.id">{{e.name}}</option>
            </select>
            <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--surface-alt);border-radius:10px;">
              <div class="avatar">{{currentEmp?.name[0]}}</div>
              <div>
                <div style="font-weight:700;font-size:14px;">{{currentEmp?.name}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{currentEmp?.role}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{currentEmp?.dept}}</div>
              </div>
            </div>
          </div>

          <div class="card">
            <h4 style="font-weight:700;margin-bottom:12px;">Payslip History</h4>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div *ngFor="let m of months" class="month-item" [class.active]="selectedMonthIdx===m.idx" (click)="selectMonth(m.idx)">
                <span>{{m.label}}</span>
                <span style="font-size:12px;font-weight:700;color:#6b4df0;">₹{{m.net | number}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Payslip Display -->
        <div>
          <div class="payslip-doc" *ngIf="slip">
            <!-- Header -->
            <div class="payslip-header">
              <div>
                <div style="font-size:22px;font-weight:900;color:#6b4df0;letter-spacing:-0.5px;">{{companyShortName}}</div>
                <div style="font-size:12px;color:rgba(255,255,255,.7);">{{companyName}}</div>
                <div style="font-size:11px;color:rgba(255,255,255,.6);">{{companyAddress}}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:14px;font-weight:700;color:#fff;">PAYSLIP</div>
                <div style="font-size:13px;color:rgba(255,255,255,.8);">{{slip.monthLabel}} {{slip.year}}</div>
              </div>
            </div>

            <!-- Employee Info -->
            <div class="payslip-emp-row">
              <div class="payslip-emp-field"><span class="pef-label">Employee Name</span><span class="pef-val">{{currentEmp?.name}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Employee ID</span><span class="pef-val">{{currentEmp?.id}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Department</span><span class="pef-val">{{currentEmp?.dept}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Designation</span><span class="pef-val">{{currentEmp?.role}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">PAN</span><span class="pef-val">{{currentEmp?.pan}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Bank Account</span><span class="pef-val">{{currentEmp?.bank}}</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Days Worked</span><span class="pef-val">{{slip.daysWorked}} / 26</span></div>
              <div class="payslip-emp-field"><span class="pef-label">Pay Period</span><span class="pef-val">{{slip.monthLabel}} 1 – {{slip.monthLabel}} 31</span></div>
            </div>

            <!-- Earnings & Deductions -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
              <div style="border-right:1px solid var(--border);">
                <div class="section-header">EARNINGS</div>
                <div *ngFor="let e of slip.earnings" class="sl-row">
                  <span>{{e.label}}</span>
                  <span style="font-weight:600;">₹{{e.amount | number}}</span>
                </div>
                <div class="sl-total-row">
                  <span>Gross Earnings</span>
                  <span>₹{{slip.gross | number}}</span>
                </div>
              </div>
              <div>
                <div class="section-header">DEDUCTIONS</div>
                <div *ngFor="let d of slip.deductions" class="sl-row">
                  <span>{{d.label}}</span>
                  <span style="font-weight:600;color:#ef4444;">₹{{d.amount | number}}</span>
                </div>
                <div class="sl-total-row">
                  <span>Total Deductions</span>
                  <span style="color:#ef4444;">₹{{slip.totalDeductions | number}}</span>
                </div>
              </div>
            </div>

            <!-- Net Pay Box -->
            <div class="net-pay-box">
              <div>
                <div style="font-size:12px;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;">Net Pay</div>
                <div style="font-size:32px;font-weight:900;color:#fff;margin-top:4px;">₹{{slip.netPay | number}}</div>
              </div>
              <div style="text-align:right;font-size:12px;color:rgba(255,255,255,.7);">
                <div>{{slip.netInWords}}</div>
                <div style="margin-top:4px;">Credit to: {{currentEmp?.bank}}</div>
              </div>
            </div>

            <!-- Actions -->
            <div style="display:flex;gap:10px;margin-top:16px;">
              <button class="btn btn-primary" (click)="downloadPayslip()">⬇ Download PDF</button>
              <button class="btn btn-ghost" (click)="emailPayslip()">✉ Email Payslip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar { width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#6b4df0,#a78bfa);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;flex-shrink:0; }
    .month-item { display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:13px;transition:background .15s; }
    .month-item:hover,.month-item.active { background:rgba(107,77,240,.1);color:#6b4df0;font-weight:600; }
    .payslip-doc { background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden; }
    .payslip-header { background:linear-gradient(135deg,#2d1b69,#6b4df0);padding:24px;display:flex;justify-content:space-between;align-items:center; }
    .payslip-emp-row { display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:16px;background:var(--surface-alt);border-bottom:1px solid var(--border); }
    .payslip-emp-field { padding:8px;display:flex;flex-direction:column;gap:3px; }
    .pef-label { font-size:10px;text-transform:uppercase;color:var(--text-3);font-weight:600;letter-spacing:.5px; }
    .pef-val { font-size:13px;font-weight:600; }
    .section-header { padding:10px 16px;background:var(--surface-alt);font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);letter-spacing:1px; }
    .sl-row { display:flex;justify-content:space-between;padding:9px 16px;border-bottom:1px solid var(--border);font-size:13px; }
    .sl-total-row { display:flex;justify-content:space-between;padding:12px 16px;font-weight:800;font-size:14px;background:rgba(107,77,240,.05); }
    .net-pay-box { background:linear-gradient(135deg,#2d1b69,#6b4df0);margin:16px;border-radius:12px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:0; }
  `]
})
export class PayslipPortalComponent implements OnInit { private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient) {}

  selectedEmp = '';
  selectedMonthIdx = 0;

  companyName      = 'Your Company';
  companyShortName = '';
  companyAddress   = '';

  employees: any[] = [];
  months: any[] = [];
  slip: any = null;
  allPayslips: any[] = [];

  get currentEmp() { return this.employees.find(e => e.id === this.selectedEmp); }

  ngOnInit() { this.loadCompanyInfo();
    this.loadEmployees(); }

  loadCompanyInfo() { this.http.get<any>(`${environment.apiUrl}/api/settings/company`).subscribe({ next: r => { const d = r?.data || r;
        this.companyName      = d?.companyName    || d?.name    || 'Your Company';
        this.companyShortName = d?.shortName       || d?.abbreviation || this.companyName.split(' ')[0].toUpperCase();
        this.companyAddress   = d?.address || d?.companyAddress || ''; },
      error: () => {} }); }

  loadEmployees() { this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => { this.employees = (data || []).map(e => ({ id: e.id || e.employeeCode, name: `${e.firstName} ${e.lastName}`.trim(),
        role: e.designation || '', dept: e.department || '',
        ctc: e.salary || 0, pan: e.pan || 'N/A', bank: e.bankAccount || 'N/A' }));
      if (this.employees.length) { this.selectedEmp = this.employees[0].id; this.loadPayslips(); } }); }

  loadPayslips() { this.http.get<any[]>(`${this.api}/payslips`).subscribe(data => { this.allPayslips = data || [];
      this.buildMonthList(); }); }

  buildMonthList() { const empSlips = this.allPayslips.filter(s => s.employeeId === this.selectedEmp);
    if (empSlips.length) { this.months = empSlips.map((s, i) => ({ idx: i, label: s.periodLabel || s.period || '', net: s.netPay || 0, data: s }));
      this.selectedMonthIdx = 0;
      this.buildSlipFromData(this.months[0].data); } else { this.months = [];
      this.slip = null; } }

  buildSlipFromData(s: any) { const parts = (s.periodLabel || '').split(' ');
    this.slip = { id: s.id,
      monthLabel: parts[0] || '', year: parts[1] || '',
      daysWorked: s.daysWorked || 26,
      earnings: s.earnings || [
        { label: 'Basic Salary', amount: s.basicSalary || 0 },
        { label: 'House Rent Allowance', amount: s.hra || 0 },
        { label: 'Dearness Allowance', amount: s.da || 0 },
        { label: 'Special Allowance', amount: s.specialAllowance || 0 },
      ],
      deductions: s.deductions || [
        { label: 'Provident Fund', amount: s.pf || 0 },
        { label: 'Professional Tax', amount: s.pt || 200 },
        { label: 'Tax Deducted at Source', amount: s.tds || 0 },
      ],
      gross: s.grossPay || 0, totalDeductions: s.totalDeductions || 0,
      netPay: s.netPay || 0, netInWords: s.netInWords || '' }; }

  loadPayslip() { if (!this.selectedEmp) return;
    this.buildMonthList(); }

  selectMonth(idx: number) { this.selectedMonthIdx = idx;
    if (this.months[idx]?.data) this.buildSlipFromData(this.months[idx].data); }

  downloadPayslip() { const id = this.slip?.id;
    if (!id) return;
    this.http.get(`${this.api}/payslips/${id}/download`, { responseType: 'blob' }).subscribe(blob => { const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `payslip-${id}.pdf`;
      a.click(); URL.revokeObjectURL(url); }); }

  emailPayslip() { const id = this.slip?.id;
    if (!id) return;
    this.http.post(`${this.api}/payslips/${id}/email`, {}).subscribe(); }
}

