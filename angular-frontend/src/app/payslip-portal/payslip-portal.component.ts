import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payslip-portal',
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
                <div style="font-size:22px;font-weight:900;color:#6b4df0;letter-spacing:-0.5px;">AMNEX</div>
                <div style="font-size:12px;color:rgba(255,255,255,.7);">Amnex Infotechnologies Pvt. Ltd.</div>
                <div style="font-size:11px;color:rgba(255,255,255,.6);">GIFT City, Gandhinagar, Gujarat 382355</div>
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
export class PayslipPortalComponent implements OnInit {
  selectedEmp = 'EMP001';
  selectedMonthIdx = 0;

  employees = [
    { id: 'EMP001', name: 'Arjun Mehta', role: 'Sr. Developer', dept: 'Engineering', ctc: 1500000, pan: 'AAAPX1234A', bank: 'HDFC ****6789' },
    { id: 'EMP002', name: 'Priya Sharma', role: 'HR Manager', dept: 'Human Resources', ctc: 1350000, pan: 'BBBPY5678B', bank: 'ICICI ****4321' },
    { id: 'EMP003', name: 'Rahul Gupta', role: 'DevOps Engineer', dept: 'Infrastructure', ctc: 1200000, pan: 'CCCQZ9012C', bank: 'SBI ****8765' },
  ];

  months = [
    { idx: 0, label: 'Apr 2026', net: 105050 }, { idx: 1, label: 'Mar 2026', net: 105050 },
    { idx: 2, label: 'Feb 2026', net: 101200 }, { idx: 3, label: 'Jan 2026', net: 101200 },
    { idx: 4, label: 'Dec 2025', net: 101200 }, { idx: 5, label: 'Nov 2025', net: 98500 },
    { idx: 6, label: 'Oct 2025', net: 98500 }, { idx: 7, label: 'Sep 2025', net: 98500 },
    { idx: 8, label: 'Aug 2025', net: 95000 }, { idx: 9, label: 'Jul 2025', net: 95000 },
    { idx: 10, label: 'Jun 2025', net: 95000 }, { idx: 11, label: 'May 2025', net: 92000 },
  ];

  slip: any = null;

  get currentEmp() { return this.employees.find(e => e.id === this.selectedEmp); }

  ngOnInit() { this.loadPayslip(); }

  loadPayslip() {
    const emp = this.currentEmp;
    if (!emp) return;
    const monthly = emp.ctc / 12;
    const basic = monthly * 0.5;
    const hra = monthly * 0.20;
    const da = monthly * 0.05;
    const special = monthly * 0.15;
    const gross = basic + hra + da + special;
    const pf = basic * 0.12;
    const pt = 200;
    const tds = gross * 0.08;
    const net = Math.round(gross - pf - pt - tds);
    const m = this.months[this.selectedMonthIdx];
    this.slip = {
      monthLabel: m.label.split(' ')[0], year: m.label.split(' ')[1],
      daysWorked: 26,
      earnings: [
        { label: 'Basic Salary', amount: Math.round(basic) },
        { label: 'House Rent Allowance', amount: Math.round(hra) },
        { label: 'Dearness Allowance', amount: Math.round(da) },
        { label: 'Special Allowance', amount: Math.round(special) },
      ],
      deductions: [
        { label: 'Provident Fund', amount: Math.round(pf) },
        { label: 'Professional Tax', amount: pt },
        { label: 'Tax Deducted at Source', amount: Math.round(tds) },
      ],
      gross: Math.round(gross), totalDeductions: Math.round(pf + pt + tds),
      netPay: net, netInWords: 'Rupees One Lakh Five Thousand Fifty Only',
    };
  }

  selectMonth(idx: number) { this.selectedMonthIdx = idx; this.loadPayslip(); }
  downloadPayslip() { alert('Payslip PDF downloaded'); }
  emailPayslip() { alert('Payslip emailed to employee'); }
}
