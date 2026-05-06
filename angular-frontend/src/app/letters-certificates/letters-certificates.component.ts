import { Component } from '@angular/core';

@Component({
  selector: 'app-letters-certificates',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Letters & Certificates</h1>
          <p style="color:var(--text-3);font-size:13px;">Auto-generate HR letters and certificates</p>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Generator -->
        <div>
          <div class="card mb-4">
            <h3 style="font-weight:700;margin-bottom:16px;">Generate Letter / Certificate</h3>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <select class="select" [(ngModel)]="gen.type" (change)="updateTemplate()">
                <option value="">Select type</option>
                <option *ngFor="let t of letterTypes" [value]="t.id">{{t.label}}</option>
              </select>
              <input class="input" placeholder="Employee Name" [(ngModel)]="gen.employeeName">
              <input class="input" placeholder="Employee ID" [(ngModel)]="gen.empId">
              <input class="input" placeholder="Designation" [(ngModel)]="gen.designation">
              <input class="input" placeholder="Department" [(ngModel)]="gen.department">
              <input class="input" type="date" [(ngModel)]="gen.date" title="Letter date">
              <input class="input" placeholder="Additional info (e.g. salary, duration)" [(ngModel)]="gen.extra" *ngIf="gen.type">
              <div style="display:flex;gap:8px;">
                <button class="btn btn-primary" (click)="generate()" [disabled]="!gen.type || !gen.employeeName">Generate</button>
                <button class="btn btn-ghost" (click)="reset()">Reset</button>
              </div>
            </div>
          </div>

          <!-- History -->
          <div class="card">
            <h3 style="font-weight:700;margin-bottom:12px;">Generated History</h3>
            <div class="hist-row" *ngFor="let h of history">
              <div>
                <div style="font-weight:600;font-size:13px;">{{h.type}} — {{h.employee}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{h.date}} · {{h.empId}}</div>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-ghost btn-sm" (click)="previewHistory(h)">Preview</button>
                <button class="btn btn-primary btn-sm">Download</button>
              </div>
            </div>
            <div *ngIf="!history.length" style="text-align:center;padding:24px;color:var(--text-3);font-size:13px;">No letters generated yet.</div>
          </div>
        </div>

        <!-- Preview -->
        <div class="card letter-preview" *ngIf="preview">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="font-weight:700;">Preview</h3>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-primary btn-sm" (click)="download()">Download PDF</button>
              <button class="btn btn-ghost btn-sm" (click)="preview=null">✕</button>
            </div>
          </div>
          <div class="letter-paper">
            <div class="letter-header">
              <div style="font-size:20px;font-weight:900;color:#292966;">AMNEX INFOTECHNOLOGIES</div>
              <div style="font-size:11px;color:#666;margin-top:2px;">Plot No 10, IT Park, Gandhinagar, Gujarat - 382009</div>
              <div style="height:2px;background:linear-gradient(90deg,#292966,#6b4df0);margin:10px 0;"></div>
            </div>
            <div style="font-size:13px;color:#333;margin-bottom:12px;">Date: {{preview.date}}</div>
            <div style="font-size:15px;font-weight:700;text-align:center;margin-bottom:16px;text-decoration:underline;">{{preview.title}}</div>
            <div style="font-size:13px;line-height:1.8;color:#333;" [innerHTML]="preview.body"></div>
            <div style="margin-top:32px;">
              <div style="font-size:13px;font-weight:700;">Authorised Signatory</div>
              <div style="font-size:12px;color:#666;margin-top:4px;">HR Department</div>
              <div style="font-size:12px;color:#666;">Amnex Infotechnologies Pvt. Ltd.</div>
            </div>
          </div>
        </div>

        <div class="card" *ngIf="!preview" style="display:flex;align-items:center;justify-content:center;min-height:400px;color:var(--text-3);">
          <div style="text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">📄</div>
            <div>Select type and fill details to preview letter</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hist-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border); }
    .hist-row:last-child { border-bottom:none; }
    .letter-preview { overflow-y:auto; max-height:80vh; }
    .letter-paper { background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:32px; font-family:'Times New Roman',serif; }
    .letter-header { margin-bottom:20px; }
  `]
})
export class LettersCertificatesComponent {
  preview: any = null;
  history: any[] = [
    { type:'Experience Certificate', employee:'Divya Reddy', empId:'EMP008', date:'2024-02-10' },
    { type:'Appointment Letter', employee:'Anjali Nair', empId:'EMP006', date:'2022-09-12' },
  ];

  letterTypes = [
    { id:'appointment', label:'Appointment Letter' },
    { id:'experience', label:'Experience Certificate' },
    { id:'salary', label:'Salary Certificate' },
    { id:'relieving', label:'Relieving Letter' },
    { id:'noc', label:'No Objection Certificate (NOC)' },
    { id:'bonafide', label:'Bonafide Certificate' },
    { id:'increment', label:'Increment Letter' },
    { id:'promotion', label:'Promotion Letter' },
    { id:'warning', label:'Warning Letter' },
    { id:'termination', label:'Termination Letter' },
  ];

  gen: any = { type:'', employeeName:'', empId:'', designation:'', department:'', date:new Date().toISOString().slice(0,10), extra:'' };

  updateTemplate() {}

  generate() {
    const t = this.letterTypes.find(x => x.id === this.gen.type);
    const body = this.buildBody();
    this.preview = { title: t?.label, date: this.gen.date, body, ...this.gen };
    this.history.unshift({ type: t?.label, employee: this.gen.employeeName, empId: this.gen.empId, date: this.gen.date });
  }

  buildBody(): string {
    const { employeeName, empId, designation, department, date, extra } = this.gen;
    const bodies: Record<string, string> = {
      appointment: `Dear <b>${employeeName}</b>,<br><br>We are pleased to appoint you as <b>${designation}</b> in the <b>${department}</b> department effective from <b>${date}</b>.<br><br>Your employment is subject to the terms and conditions detailed in your offer letter. We look forward to your valuable contribution to our organisation.<br><br>Please report to the HR department on your date of joining with all original documents.`,
      experience: `To Whom It May Concern,<br><br>This is to certify that <b>${employeeName}</b> (Employee ID: ${empId}) has worked with Amnex Infotechnologies Pvt. Ltd. as <b>${designation}</b> in the <b>${department}</b> department.<br><br>${extra ? `Period of employment: ${extra}.` : ''}<br><br>During the tenure, the employee demonstrated excellent professional skills and conduct. We wish them the very best in their future endeavours.`,
      salary: `To Whom It May Concern,<br><br>This is to certify that <b>${employeeName}</b> (Employee ID: ${empId}) is working as <b>${designation}</b> in our organisation.<br><br>${extra ? `The current CTC of the employee is <b>${extra}</b> per annum.` : ''}<br><br>This certificate is issued at the request of the employee for the purpose stated by them.`,
      relieving: `Dear <b>${employeeName}</b>,<br><br>This is to confirm that you have been relieved from your duties as <b>${designation}</b> in the <b>${department}</b> department with effect from <b>${date}</b>.<br><br>Your full and final settlement is being processed. We appreciate your contributions during your tenure and wish you success in your future career.`,
      increment: `Dear <b>${employeeName}</b>,<br><br>We are pleased to inform you that based on your performance and contribution, your salary has been revised ${extra ? `to <b>${extra}</b>` : ''} effective from <b>${date}</b>.<br><br>We appreciate your dedication and look forward to your continued contribution.`,
      promotion: `Dear <b>${employeeName}</b>,<br><br>We are delighted to inform you that you have been promoted to the position of <b>${extra || designation}</b> effective from <b>${date}</b>.<br><br>This decision reflects our confidence in your abilities and the outstanding work you have consistently delivered. Congratulations on this well-deserved achievement.`,
    };
    return bodies[this.gen.type] || `This letter pertains to <b>${employeeName}</b> (${empId}), ${designation}, ${department}. ${extra}`;
  }

  previewHistory(h: any) {
    this.gen = { ...h, type: this.letterTypes.find(t => t.label === h.type)?.id || '' };
    this.generate();
  }

  download() { alert('PDF download would trigger here in a production build (e.g. via jsPDF or server-side generation).'); }
  reset() { this.gen = { type:'', employeeName:'', empId:'', designation:'', department:'', date:new Date().toISOString().slice(0,10), extra:'' }; this.preview = null; }
}
