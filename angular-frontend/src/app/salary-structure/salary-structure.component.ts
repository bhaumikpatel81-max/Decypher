import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-salary-structure',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Salary Structure</h1>
          <p style="color:var(--text-3);font-size:13px;">Grade Bands · Component Builder · CTC Breakup Preview</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='grades'" (click)="tab='grades'">Grade Bands</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='builder'" (click)="tab='builder'">Component Builder</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='preview'" (click)="tab='preview'">CTC Preview</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='assign'" (click)="tab='assign'">Assign</button>
        </div>
      </div>

      <!-- GRADES -->
      <div *ngIf="tab==='grades'">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
          <div *ngFor="let g of grades" class="grade-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="grade-badge" [style.background]="g.color+'22'" [style.color]="g.color">{{g.level}}</span>
              <span style="font-size:12px;color:var(--text-3);">{{g.title}}</span>
            </div>
            <div style="font-size:22px;font-weight:800;color:#6b4df0;">₹{{g.min | number}} – {{g.max | number}}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:4px;">CTC per annum</div>
            <div style="margin-top:10px;font-size:12px;color:var(--text-3);">{{g.headcount}} employees</div>
          </div>
        </div>
        <div class="card">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Level</th><th class="th">Title</th><th class="th">Min CTC</th><th class="th">Max CTC</th><th class="th">Headcount</th><th class="th">Basic %</th><th class="th">HRA %</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let g of grades" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><span class="grade-badge" [style.background]="g.color+'22'" [style.color]="g.color">{{g.level}}</span></td>
                <td class="td"><strong>{{g.title}}</strong></td>
                <td class="td">₹{{g.min | number}}</td>
                <td class="td">₹{{g.max | number}}</td>
                <td class="td">{{g.headcount}}</td>
                <td class="td">{{g.basicPct}}%</td>
                <td class="td">{{g.hraPct}}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- BUILDER -->
      <div *ngIf="tab==='builder'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div class="card">
            <h3 style="font-weight:700;margin-bottom:16px;">Salary Components (%)</h3>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div *ngFor="let c of components">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <label style="font-size:13px;font-weight:600;">{{c.name}}</label>
                  <span style="font-size:13px;font-weight:700;color:#6b4df0;">{{c.value}}{{c.fixed?'':' %'}}</span>
                </div>
                <input type="range" [(ngModel)]="c.value" [min]="c.min" [max]="c.max" [step]="c.step" style="width:100%;">
                <div style="font-size:11px;color:var(--text-3);">{{c.desc}}</div>
              </div>
              <div style="padding:12px;background:var(--surface-alt);border-radius:8px;font-size:13px;">
                Total Earnings %: <strong>{{totalEarningsPct}}%</strong> &nbsp;|&nbsp; Total Deduction %: <strong>{{totalDeductionPct}}%</strong>
              </div>
              <button class="btn btn-primary" (click)="saveComponents()">Save Structure</button>
            </div>
          </div>
          <div class="card">
            <h3 style="font-weight:700;margin-bottom:16px;">Live Preview (for ₹12,00,000 CTC)</h3>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div *ngFor="let c of components.slice(0,4)" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
                <span style="font-size:13px;">{{c.name}}</span>
                <span style="font-weight:700;color:#10b981;">₹{{(1200000*(c.value/100)/12) | number:'1.0-0'}}</span>
              </div>
              <div style="padding:8px 0;border-top:2px solid var(--border);display:flex;justify-content:space-between;">
                <span style="font-size:13px;font-weight:700;">Gross Earnings</span>
                <span style="font-weight:800;color:#6b4df0;">₹{{grossPreview | number:'1.0-0'}}</span>
              </div>
              <div *ngFor="let c of components.slice(4)" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
                <span style="font-size:13px;color:#ef4444;">{{c.name}}</span>
                <span style="font-weight:700;color:#ef4444;">(₹{{(c.fixed ? c.value : 1200000*(c.value/100)/12) | number:'1.0-0'}})</span>
              </div>
              <div style="padding:8px 0;border-top:2px solid var(--border);display:flex;justify-content:space-between;">
                <span style="font-size:14px;font-weight:800;">Net Pay / Month</span>
                <span style="font-size:18px;font-weight:800;color:#10b981;">₹{{netPayPreview | number:'1.0-0'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PREVIEW -->
      <div *ngIf="tab==='preview'" class="card" style="max-width:540px;">
        <h3 style="font-weight:700;margin-bottom:16px;">CTC Breakup Calculator</h3>
        <div style="margin-bottom:16px;">
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Enter Annual CTC (₹)</label>
          <input class="input" type="number" [(ngModel)]="previewCTC" (ngModelChange)="calcPreview()" style="margin-top:4px;font-size:18px;font-weight:700;" placeholder="e.g. 1200000">
        </div>
        <div *ngIf="previewCTC>0" style="display:flex;flex-direction:column;gap:0;">
          <div style="padding:12px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;" *ngFor="let row of previewRows">
            <span style="font-size:13px;" [style.color]="row.type==='deduction'?'#ef4444':'inherit'">{{row.label}}</span>
            <div style="text-align:right;">
              <div style="font-weight:700;" [style.color]="row.type==='deduction'?'#ef4444':row.type==='total'?'#10b981':'inherit'">₹{{row.monthly | number:'1.0-0'}}/mo</div>
              <div style="font-size:11px;color:var(--text-3);">₹{{row.annual | number}}/yr</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSIGN -->
      <div *ngIf="tab==='assign'" class="card" style="max-width:460px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Assign Salary Structure</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
            <select class="select" [(ngModel)]="assignForm.emp" style="margin-top:4px;">
              <option value="">Select employee</option>
              <option *ngFor="let e of empList">{{e}}</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Grade / Band</label>
            <select class="select" [(ngModel)]="assignForm.grade" style="margin-top:4px;">
              <option value="">Select grade</option>
              <option *ngFor="let g of grades">{{g.level}} — {{g.title}}</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Annual CTC (₹)</label>
            <input class="input" type="number" [(ngModel)]="assignForm.ctc" style="margin-top:4px;">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Effective Date</label>
            <input class="input" type="date" [(ngModel)]="assignForm.date" style="margin-top:4px;">
          </div>
          <button class="btn btn-primary" (click)="assignStructure()">Assign Structure</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grade-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px; }
    .grade-badge { padding:3px 10px;border-radius:6px;font-size:12px;font-weight:700; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class SalaryStructureComponent implements OnInit {
  private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient) {}
  tab = 'grades';
  previewCTC = 1200000;
  previewRows: any[] = [];

  grades = [
    { level: 'L1', title: 'Junior', min: 300000, max: 600000, headcount: 12, color: '#10b981', basicPct: 50, hraPct: 20 },
    { level: 'L3', title: 'Mid-Level', min: 600000, max: 1200000, headcount: 18, color: '#3b82f6', basicPct: 50, hraPct: 20 },
    { level: 'L5', title: 'Senior', min: 1200000, max: 2000000, headcount: 10, color: '#6b4df0', basicPct: 50, hraPct: 20 },
    { level: 'L8', title: 'Leadership', min: 2000000, max: 5000000, headcount: 4, color: '#f59e0b', basicPct: 50, hraPct: 20 },
  ];

  components = [
    { name: 'Basic Salary', value: 50, min: 30, max: 70, step: 1, fixed: false, type: 'earning', desc: '% of CTC' },
    { name: 'HRA', value: 20, min: 10, max: 40, step: 1, fixed: false, type: 'earning', desc: '% of CTC (tax exempt)' },
    { name: 'DA (Dearness Allowance)', value: 5, min: 0, max: 15, step: 1, fixed: false, type: 'earning', desc: '% of CTC' },
    { name: 'Special Allowance', value: 15, min: 0, max: 30, step: 1, fixed: false, type: 'earning', desc: 'Balance of CTC' },
    { name: 'PF (Employee)', value: 12, min: 0, max: 12, step: 1, fixed: false, type: 'deduction', desc: '% of Basic' },
    { name: 'Professional Tax', value: 200, min: 0, max: 2500, step: 100, fixed: true, type: 'deduction', desc: 'Fixed per month by state' },
    { name: 'TDS', value: 8, min: 0, max: 30, step: 1, fixed: false, type: 'deduction', desc: '% of gross (varies by slab)' },
  ];

  assignForm = { emp: '', grade: '', ctc: 0, date: '' };

  empList = ['Arjun Mehta', 'Priya Sharma', 'Rahul Gupta', 'Sneha Patel', 'Vikram Singh', 'Ananya Iyer', 'Kiran Desai', 'Rohan Nair'];

  get totalEarningsPct() { return this.components.filter(c => c.type === 'earning').reduce((s, c) => s + (c.fixed ? 0 : c.value), 0); }
  get totalDeductionPct() { return this.components.filter(c => c.type === 'deduction' && !c.fixed).reduce((s, c) => s + c.value, 0); }
  get grossPreview() { return this.components.filter(c => c.type === 'earning').reduce((s, c) => s + (c.fixed ? c.value : 1200000 * c.value / 100 / 12), 0); }
  get netPayPreview() { return this.grossPreview - this.components.filter(c => c.type === 'deduction').reduce((s, c) => s + (c.fixed ? c.value : 1200000 * c.value / 100 / 12), 0); }

  ngOnInit() { this.calcPreview(); }

  calcPreview() {
    if (!this.previewCTC) return;
    const ctc = this.previewCTC;
    const basic = ctc * 0.5 / 12;
    const hra = ctc * 0.20 / 12;
    const da = ctc * 0.05 / 12;
    const special = ctc * 0.15 / 12;
    const gross = basic + hra + da + special;
    const pf = basic * 0.12;
    const pt = 200;
    const tds = gross * 0.08;
    const net = gross - pf - pt - tds;
    this.previewRows = [
      { label: 'Basic Salary', monthly: basic, annual: basic * 12, type: 'earning' },
      { label: 'HRA', monthly: hra, annual: hra * 12, type: 'earning' },
      { label: 'Dearness Allowance', monthly: da, annual: da * 12, type: 'earning' },
      { label: 'Special Allowance', monthly: special, annual: special * 12, type: 'earning' },
      { label: 'Gross Earnings', monthly: gross, annual: gross * 12, type: 'total' },
      { label: 'PF Deduction', monthly: pf, annual: pf * 12, type: 'deduction' },
      { label: 'Professional Tax', monthly: pt, annual: pt * 12, type: 'deduction' },
      { label: 'TDS', monthly: tds, annual: tds * 12, type: 'deduction' },
      { label: 'Net Take Home', monthly: net, annual: net * 12, type: 'total' },
    ];
  }

  saveComponents() { alert('Salary structure saved'); }
  assignStructure() { if (!this.assignForm.emp || !this.assignForm.grade) { alert('Fill all fields'); return; } alert(`Salary structure assigned to ${this.assignForm.emp}`); this.assignForm = { emp: '', grade: '', ctc: 0, date: '' }; }
}
