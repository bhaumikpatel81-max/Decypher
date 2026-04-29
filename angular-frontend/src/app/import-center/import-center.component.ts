import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ColumnMapping { csvColumn: string; systemField: string; skip: boolean; }
interface ImportHistory { id: string; feature: string; fileName: string; status: string; totalRows: number; importedRows: number; warningRows: number; errorRows: number; importedAt: string; hasErrors: boolean; }
interface ImportError { row: number; message: string; rawData: string; }
interface ImportWarning { row: number; message: string; }

const FEATURES = [
  { key: 'Requisitions',          label: 'Requisitions' },
  { key: 'Candidates',            label: 'Candidates' },
  { key: 'Vendors',               label: 'Vendors' },
  { key: 'BudgetFiscalYears',     label: 'Budget — Fiscal Years' },
  { key: 'BudgetAllocations',     label: 'Budget — Department Allocations' },
  { key: 'BudgetLineItems',       label: 'Budget — Line Items' },
  { key: 'BudgetActuals',         label: 'Budget — Actual Spend' },
  { key: 'RecruiterPerformances', label: 'Recruiter Performance' },
  { key: 'TalentPool',            label: 'Talent Pool' },
  { key: 'CandidateSources',      label: 'Candidate Sources' },
  { key: 'InterviewSchedule',     label: 'Interview Schedule' },
  { key: 'InternalJobPostings',   label: 'Internal Job Postings' },
];

const FEATURE_NOTES: Record<string, string> = {
  Requisitions: 'Dates must be dd-mm-yyyy. Priority: Low/Medium/High/Critical. Headcount is an integer. Requisition IDs must be unique.',
  Candidates: 'Skills are semicolon-separated. Stage must match: Submitted/Screening/L1/L2/L3/HR/Selected/Rejected/Joined/Dropped. Vendor Name will be resolved to Vendor ID.',
  Vendors: 'Category: General/Recruiter/Staffing/Executive. Status: Active/Inactive/Blacklisted/Suspended. Existing vendors are updated by name.',
  BudgetFiscalYears: 'FiscalYearLabel is used as the key in all other budget sheets — it must be unique and match exactly.',
  BudgetAllocations: 'FiscalYearLabel must match an existing Fiscal Year. Quarter: Q1/Q2/Q3/Q4. Category: Permanent/Contract/Intern/Replacement/NewRole.',
  BudgetLineItems: 'Department Name + Quarter + Fiscal Year Label resolves to parent allocation. LineItemType must match exactly.',
  BudgetActuals: 'SpendDate must be dd-mm-yyyy. IsApproved Yes = included in TotalSpent KPI. Vendor Name resolved to Vendor ID.',
  RecruiterPerformances: 'Month is numeric 1–12. Employee ID must match an existing user in the system.',
  TalentPool: 'Candidate Email must match an existing Candidate record. NurtureStatus: Active/Passive/DoNotContact.',
  CandidateSources: 'Source must match exactly: LinkedIn/Indeed/Referral/Portal/Agency/Other.',
  InterviewSchedule: 'Multiple recruiters for panel — separate Employee IDs by semicolons. Meeting Link required for Video type.',
  InternalJobPostings: 'ShowSalary No = salary bands hidden from employees. RequisitionID links posting to an approved requisition.',
};

@Component({
  selector: 'app-import-center',
  template: `
<div class="import-shell">

  <!-- Page Header -->
  <div class="page-header">
    <div class="page-header-left">
      <span class="material-icons page-icon">upload_file</span>
      <div>
        <h2 class="page-title">Import Center</h2>
        <p class="page-sub">Bulk-import data into any Decypher module using CSV or Excel files</p>
      </div>
    </div>
    <button class="btn btn-ghost" (click)="activeTab = 'history'; loadHistory()">
      <span class="material-icons" style="font-size:18px;vertical-align:middle">history</span>
      Import History
    </button>
  </div>

  <!-- Tab Bar -->
  <div class="import-tabs">
    <button class="import-tab" [class.active]="activeTab === 'import'" (click)="activeTab = 'import'">New Import</button>
    <button class="import-tab" [class.active]="activeTab === 'history'" (click)="activeTab = 'history'; loadHistory()">History</button>
  </div>

  <!-- ── NEW IMPORT FLOW ─────────────────────────────────────────────────── -->
  <div *ngIf="activeTab === 'import'">

    <!-- STEP INDICATOR -->
    <div class="step-bar">
      <div class="step" [class.active]="step === 1" [class.done]="step > 1">
        <span class="step-num">1</span> Configure
      </div>
      <div class="step-connector"></div>
      <div class="step" [class.active]="step === 2" [class.done]="step > 2">
        <span class="step-num">2</span> Map Fields
      </div>
      <div class="step-connector"></div>
      <div class="step" [class.active]="step === 3">
        <span class="step-num">3</span> Results
      </div>
    </div>

    <!-- STEP 1: Configure ─────────────────────────────────────────────────── -->
    <div class="card import-card" *ngIf="step === 1">
      <div class="import-card-title">Initiate Import</div>

      <!-- Feature Select -->
      <div class="form-row">
        <label class="form-label">Select Feature <span class="req">*</span></label>
        <select class="select" [(ngModel)]="selectedFeature" (change)="onFeatureChange()">
          <option value="">— Choose a module —</option>
          <option *ngFor="let f of features" [value]="f.key">{{f.label}}</option>
        </select>
      </div>

      <!-- File Upload -->
      <div class="form-row" *ngIf="selectedFeature">
        <label class="form-label">Select File to Import <span class="req">*</span></label>
        <div class="file-drop-zone" [class.has-file]="selectedFile" (click)="fileInput.click()" (dragover)="$event.preventDefault()" (drop)="onFileDrop($event)">
          <input #fileInput type="file" accept=".csv,.xlsx" style="display:none" (change)="onFileSelect($event)">
          <span class="material-icons file-icon">{{selectedFile ? 'insert_drive_file' : 'cloud_upload'}}</span>
          <span *ngIf="!selectedFile" class="file-hint">Click to browse or drag & drop<br><small>.csv or .xlsx accepted</small></span>
          <span *ngIf="selectedFile" class="file-name">{{selectedFile.name}}<br><small>{{(selectedFile.size/1024).toFixed(1)}} KB — click to change</small></span>
        </div>
      </div>

      <!-- Options Row -->
      <div class="options-row" *ngIf="selectedFeature">
        <div class="form-check">
          <input type="checkbox" id="hasHeader" [(ngModel)]="hasHeader">
          <label for="hasHeader">First row contains column headers</label>
        </div>

        <div class="option-group">
          <label class="form-label-sm">Delimiter</label>
          <select class="select-sm" [(ngModel)]="delimiter">
            <option value=",">Comma  ,</option>
            <option value=";">Semicolon  ;</option>
            <option value="&#9;">Tab</option>
          </select>
        </div>

        <div class="option-group">
          <label class="form-label-sm">Schedule Import</label>
          <select class="select-sm" [(ngModel)]="scheduleMode">
            <option value="immediate">Immediate</option>
            <option value="later">Schedule for later</option>
          </select>
        </div>
      </div>

      <!-- Sample Download -->
      <div class="sample-row" *ngIf="selectedFeature">
        <span class="material-icons" style="font-size:18px;vertical-align:middle;color:#6b4df0">download</span>
        Are you a first timer?
        <a class="sample-link" (click)="downloadTemplate()">VIEW & DOWNLOAD SAMPLE</a>
      </div>

      <!-- Notes Box -->
      <div class="notes-box" *ngIf="selectedFeature">
        <span class="material-icons" style="font-size:16px;vertical-align:middle;color:#e8912a">info</span>
        {{featureNote}}
      </div>

      <!-- Actions -->
      <div class="card-actions">
        <button class="btn btn-ghost" (click)="resetWizard()">Close</button>
        <button class="btn btn-primary" [disabled]="!selectedFeature || !selectedFile || validating" (click)="validate()">
          <span *ngIf="!validating">Proceed to Field Mapping ›</span>
          <span *ngIf="validating">Parsing file…</span>
        </button>
      </div>
    </div>

    <!-- STEP 2: Field Mapping ───────────────────────────────────────────────── -->
    <div class="card import-card" *ngIf="step === 2">
      <div class="import-card-title">Map Your Columns → System Fields</div>
      <p class="import-sub">{{detectedColumns.length}} column(s) detected · {{previewRows.length}} data row(s)</p>

      <!-- Preview Table -->
      <div class="preview-table-wrap" *ngIf="previewRows.length">
        <div class="preview-label">Preview (first 5 rows)</div>
        <div class="table-scroll">
          <table class="preview-table">
            <thead>
              <tr>
                <th *ngFor="let col of detectedColumns">{{col}}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of previewRows">
                <td *ngFor="let cell of row">{{cell}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mapping Table -->
      <div class="mapping-table">
        <div class="mapping-header">
          <span>Your CSV Column</span>
          <span>→</span>
          <span>System Field</span>
          <span>Skip?</span>
        </div>
        <div class="mapping-row" *ngFor="let m of mappings; let i = index">
          <span class="col-name">{{m.csvColumn}}</span>
          <span class="arrow">→</span>
          <select class="select-sm" [(ngModel)]="m.systemField">
            <option value="">— Ignore —</option>
            <option *ngFor="let f of systemFields" [value]="f">{{f}}</option>
          </select>
          <input type="checkbox" [(ngModel)]="m.skip" title="Skip this column">
        </div>
      </div>

      <div class="card-actions">
        <button class="btn btn-ghost" (click)="step = 1">‹ Back</button>
        <button class="btn btn-ghost" (click)="autoMap()">Auto-Map</button>
        <button class="btn btn-primary" [disabled]="importing" (click)="executeImport()">
          <span *ngIf="!importing">Import Now</span>
          <span *ngIf="importing">Importing…</span>
        </button>
      </div>
    </div>

    <!-- STEP 3: Results ──────────────────────────────────────────────────────── -->
    <div class="card import-card" *ngIf="step === 3">
      <div class="import-card-title">Import Complete</div>

      <div class="result-stats">
        <div class="result-stat result-stat--success">
          <span class="result-icon">✅</span>
          <div>
            <div class="result-num">{{importResult?.imported}}</div>
            <div class="result-lbl">Rows imported</div>
          </div>
        </div>
        <div class="result-stat result-stat--warn" *ngIf="importResult?.warnings?.length">
          <span class="result-icon">⚠️</span>
          <div>
            <div class="result-num">{{importResult?.warnings?.length}}</div>
            <div class="result-lbl">Warnings</div>
          </div>
        </div>
        <div class="result-stat result-stat--error" *ngIf="importResult?.errors?.length">
          <span class="result-icon">❌</span>
          <div>
            <div class="result-num">{{importResult?.errors?.length}}</div>
            <div class="result-lbl">Errors</div>
          </div>
        </div>
      </div>

      <!-- Warnings List -->
      <div class="result-list" *ngIf="importResult?.warnings?.length">
        <div class="result-list-title">Warnings</div>
        <div class="result-item result-item--warn" *ngFor="let w of importResult!.warnings">
          Row {{w.row}}: {{w.message}}
        </div>
      </div>

      <!-- Errors List -->
      <div class="result-list" *ngIf="importResult?.errors?.length">
        <div class="result-list-title">Errors</div>
        <div class="result-item result-item--error" *ngFor="let e of importResult!.errors">
          Row {{e.row}}: {{e.message}}
          <span *ngIf="e.rawData" class="raw-data"> — {{e.rawData | slice:0:80}}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn btn-outline" (click)="resetWizard()">Import Another File</button>
        <button class="btn btn-ghost" (click)="activeTab = 'history'; loadHistory()">View History</button>
      </div>
    </div>
  </div>

  <!-- ── HISTORY ────────────────────────────────────────────────────────────── -->
  <div *ngIf="activeTab === 'history'" class="card import-card">
    <div class="import-card-title">Import History</div>

    <div *ngIf="historyLoading" class="loading-state">Loading history…</div>
    <div *ngIf="!historyLoading && !history.length" class="empty-state">No imports recorded yet.</div>

    <div class="table-scroll" *ngIf="!historyLoading && history.length">
      <table class="data-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>File Name</th>
            <th>Status</th>
            <th>Total</th>
            <th>Imported</th>
            <th>Warnings</th>
            <th>Errors</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let h of history">
            <td>{{h.feature}}</td>
            <td class="file-cell">{{h.fileName}}</td>
            <td><span class="status-badge" [attr.data-status]="h.status.toLowerCase()">{{h.status}}</span></td>
            <td>{{h.totalRows}}</td>
            <td class="num-cell success">{{h.importedRows}}</td>
            <td class="num-cell warn">{{h.warningRows}}</td>
            <td class="num-cell error">{{h.errorRows}}</td>
            <td>{{h.importedAt | date:'dd MMM yyyy HH:mm'}}</td>
            <td>
              <button class="btn btn-xs" *ngIf="h.hasErrors" (click)="downloadErrorReport(h.id)">Error Report</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>

<!-- ─── Styles ──────────────────────────────────────────────────────────────── -->
<style>
.import-shell {
  padding: 24px 28px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: inherit;
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.page-header-left { display: flex; align-items: center; gap: 14px; }
.page-icon { font-size: 32px; color: #6b4df0; }
.page-title { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a3e; }
.page-sub { margin: 2px 0 0; font-size: 13px; color: #6b7280; }

.import-tabs { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
.import-tab { background: none; border: none; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .2s; }
.import-tab.active { color: #6b4df0; border-bottom-color: #6b4df0; }
.import-tab:hover:not(.active) { color: #374151; }

/* Step bar */
.step-bar { display: flex; align-items: center; margin-bottom: 24px; }
.step { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #9ca3af; }
.step.active { color: #6b4df0; }
.step.done { color: #059669; }
.step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: #e5e7eb; color: #6b7280; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
}
.step.active .step-num { background: #6b4df0; color: #fff; }
.step.done .step-num { background: #059669; color: #fff; }
.step-connector { flex: 1; height: 2px; background: #e5e7eb; margin: 0 12px; }

.import-card { padding: 28px 32px; margin-bottom: 20px; }
.import-card-title { font-size: 17px; font-weight: 700; color: #1a1a3e; margin-bottom: 20px; }
.import-sub { font-size: 13px; color: #6b7280; margin: -12px 0 16px; }

.form-row { margin-bottom: 18px; }
.form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.form-label-sm { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; display: block; }
.req { color: #ef4444; }
.select { width: 100%; padding: 9px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; background: #fff; }
.select-sm { padding: 6px 10px; border: 1.5px solid #d1d5db; border-radius: 6px; font-size: 13px; background: #fff; }

/* File drop zone */
.file-drop-zone {
  border: 2px dashed #d1d5db; border-radius: 10px; padding: 32px 20px;
  text-align: center; cursor: pointer; transition: all .2s; background: #fafafa;
}
.file-drop-zone:hover, .file-drop-zone.has-file { border-color: #6b4df0; background: #f5f3ff; }
.file-icon { font-size: 36px; color: #9ca3af; display: block; margin-bottom: 8px; }
.file-drop-zone.has-file .file-icon { color: #6b4df0; }
.file-hint { font-size: 14px; color: #6b7280; }
.file-name { font-size: 14px; color: #6b4df0; font-weight: 500; }

.options-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 18px; }
.form-check { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }
.form-check input { width: 16px; height: 16px; cursor: pointer; }
.option-group { display: flex; flex-direction: column; }

.sample-row { font-size: 13px; color: #374151; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
.sample-link { color: #6b4df0; font-weight: 600; cursor: pointer; text-decoration: underline; }
.sample-link:hover { color: #4f37cc; }

.notes-box { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #92400e; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 8px; }

.card-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid #f3f4f6; padding-top: 20px; }

/* Preview */
.preview-table-wrap { margin-bottom: 20px; }
.preview-label { font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 6px; }
.preview-table { border-collapse: collapse; width: 100%; font-size: 12px; }
.preview-table th { background: #f3f4f6; padding: 6px 10px; text-align: left; font-weight: 600; border: 1px solid #e5e7eb; white-space: nowrap; }
.preview-table td { padding: 5px 10px; border: 1px solid #e5e7eb; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Mapping */
.mapping-table { margin-bottom: 20px; }
.mapping-header { display: grid; grid-template-columns: 1fr 24px 1fr 60px; gap: 12px; padding: 8px 12px; background: #f3f4f6; border-radius: 6px; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
.mapping-row { display: grid; grid-template-columns: 1fr 24px 1fr 60px; gap: 12px; padding: 8px 12px; align-items: center; border-bottom: 1px solid #f3f4f6; }
.mapping-row:hover { background: #fafafa; }
.col-name { font-size: 13px; color: #374151; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.arrow { color: #9ca3af; font-size: 16px; text-align: center; }

/* Results */
.result-stats { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.result-stat { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-radius: 10px; min-width: 140px; }
.result-stat--success { background: #f0fdf4; border: 1px solid #86efac; }
.result-stat--warn { background: #fffbeb; border: 1px solid #fcd34d; }
.result-stat--error { background: #fef2f2; border: 1px solid #fca5a5; }
.result-icon { font-size: 24px; }
.result-num { font-size: 24px; font-weight: 700; color: #1a1a3e; }
.result-lbl { font-size: 12px; color: #6b7280; }

.result-list { margin-bottom: 16px; }
.result-list-title { font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #374151; }
.result-item { font-size: 13px; padding: 6px 10px; border-radius: 6px; margin-bottom: 4px; }
.result-item--warn { background: #fffbeb; color: #92400e; }
.result-item--error { background: #fef2f2; color: #991b1b; }
.raw-data { opacity: .6; font-size: 11px; }

/* History table */
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: #f3f4f6; padding: 10px 14px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb; }
.data-table td { padding: 10px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; }
.data-table tr:hover td { background: #fafafa; }
.file-cell { font-size: 12px; color: #6b7280; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.num-cell { text-align: right; font-weight: 600; }
.num-cell.success { color: #059669; }
.num-cell.warn { color: #d97706; }
.num-cell.error { color: #dc2626; }

.status-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #f3f4f6; color: #374151; }
.status-badge[data-status="completed"] { background: #f0fdf4; color: #059669; }
.status-badge[data-status="completedwitherrors"] { background: #fffbeb; color: #d97706; }
.status-badge[data-status="failed"] { background: #fef2f2; color: #dc2626; }
.status-badge[data-status="processing"] { background: #eff6ff; color: #2563eb; }

.btn { padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all .15s; }
.btn-primary { background: #6b4df0; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #4f37cc; }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; }
.btn-ghost { background: none; color: #6b7280; border: 1.5px solid #e5e7eb; }
.btn-ghost:hover { background: #f9fafb; }
.btn-outline { background: none; color: #6b4df0; border: 1.5px solid #6b4df0; }
.btn-outline:hover { background: #f5f3ff; }
.btn-xs { padding: 4px 10px; font-size: 11px; border-radius: 6px; background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; cursor: pointer; }
.btn-xs:hover { background: #e5e7eb; }

.table-scroll { overflow-x: auto; }
.loading-state, .empty-state { text-align: center; padding: 40px; color: #9ca3af; font-size: 14px; }

/* Card passthrough */
.card { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.07); border: 1px solid #f3f4f6; }
</style>
`,
})
export class ImportCenterComponent implements OnInit {
  readonly features = FEATURES;
  readonly featureNotes = FEATURE_NOTES;

  activeTab: 'import' | 'history' = 'import';
  step = 1;

  // Step 1
  selectedFeature = '';
  selectedFile: File | null = null;
  hasHeader = true;
  delimiter = ',';
  scheduleMode = 'immediate';
  featureNote = '';

  // Step 2
  detectedColumns: string[] = [];
  previewRows: string[][] = [];
  mappings: ColumnMapping[] = [];
  systemFields: string[] = [];
  fileToken = '';
  validating = false;

  // Step 3
  importing = false;
  importResult: { imported: number; warnings: ImportWarning[]; errors: ImportError[] } | null = null;

  // History
  history: ImportHistory[] = [];
  historyLoading = false;

  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onFeatureChange() {
    this.featureNote = this.featureNotes[this.selectedFeature] ?? '';
    this.selectedFile = null;
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.selectedFile = input.files[0];
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) this.selectedFile = file;
  }

  downloadTemplate() {
    if (!this.selectedFeature) return;
    const url = `${this.api}/api/import/template/${this.selectedFeature}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${this.selectedFeature.toLowerCase()}_template.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  validate() {
    if (!this.selectedFile || !this.selectedFeature) return;
    this.validating = true;

    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('feature', this.selectedFeature);
    fd.append('hasHeader', String(this.hasHeader));
    fd.append('delimiter', this.delimiter);

    this.http.post<any>(`${this.api}/api/import/validate`, fd).subscribe({
      next: res => {
        this.validating = false;
        this.detectedColumns = res.columns ?? [];
        this.previewRows = (res.preview ?? []).map((r: any[]) => r.map(String));
        this.fileToken = res.fileToken ?? '';

        // Build initial mappings — auto-map where column name matches system field
        const sysFields = this.getSystemFields(this.selectedFeature);
        this.systemFields = sysFields;
        this.mappings = this.detectedColumns.map(col => {
          const matched = sysFields.find(f => f.toLowerCase() === col.toLowerCase().replace(/[^a-z0-9]/gi, '')) ?? '';
          return { csvColumn: col, systemField: matched, skip: false };
        });

        this.step = 2;
      },
      error: err => {
        this.validating = false;
        alert(err?.error?.error ?? 'Could not parse file. Please check format and try again.');
      }
    });
  }

  autoMap() {
    const sysFields = this.systemFields;
    this.mappings = this.mappings.map(m => {
      const clean = m.csvColumn.toLowerCase().replace(/[^a-z0-9]/gi, '');
      const match = sysFields.find(f => f.toLowerCase() === clean || f.toLowerCase().replace(/[^a-z0-9]/gi, '') === clean);
      return { ...m, systemField: match ?? m.systemField };
    });
  }

  executeImport() {
    this.importing = true;
    const payload = {
      feature: this.selectedFeature,
      mappings: this.mappings,
      fileToken: this.fileToken,
      scheduleAt: this.scheduleMode === 'immediate' ? null : null
    };

    this.http.post<any>(`${this.api}/api/import/execute`, payload).subscribe({
      next: res => {
        this.importing = false;
        this.importResult = res;
        this.step = 3;
      },
      error: err => {
        this.importing = false;
        alert(err?.error?.error ?? 'Import failed. Please try again.');
      }
    });
  }

  loadHistory() {
    this.historyLoading = true;
    this.http.get<ImportHistory[]>(`${this.api}/api/import/history`).subscribe({
      next: h => { this.history = h; this.historyLoading = false; },
      error: () => { this.historyLoading = false; }
    });
  }

  downloadErrorReport(id: string) {
    this.http.get(`${this.api}/api/import/history/${id}/error-report`, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `error_report_${id}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  resetWizard() {
    this.step = 1;
    this.selectedFeature = '';
    this.selectedFile = null;
    this.mappings = [];
    this.fileToken = '';
    this.importResult = null;
    this.featureNote = '';
  }

  private getSystemFields(feature: string): string[] {
    const map: Record<string, string[]> = {
      Requisitions: ['RequisitionId','Title','Department','Location','Headcount','BudgetMin','BudgetMax','Currency','Priority','Category','EmploymentType','ExperienceFrom','ExperienceTo','SalaryTimeframe','RecruitmentStartDate','ExpectedClosureDate','ReportingManagerId','HRBPId','EmployeeType','BillableNonBillable','OPEXCAPEX','BudgetedSalaryFixed','BudgetedSalaryVariable','BudgetedSalaryTotal','ProjectName','ProjectLocation','Comments','AutoApprove','IsReplacement','ReplacementEmployeeId','AssetRequirements','PayrollSpecification','RFPRequirement'],
      Candidates: ['CandidateName','Email','Phone','VendorName','RequisitionId','CurrentCompany','CurrentRole','TotalExperience','CurrentCTC','ExpectedCTC','Currency','NoticePeriod','Location','Skills','SubmissionDate','Stage','CVJDMatchScore','DropoutRiskScore','CompetencyScore','RejectionReason','DropoutReason','InterviewNotes'],
      Vendors: ['VendorName','ContactPerson','Email','Phone','Address','City','State','Category','Status','QualityScore','SLAScore','JoiningRatePercent','AvgTimeToSubmit','Notes'],
      BudgetFiscalYears: ['FiscalYearLabel','StartDate','EndDate','TotalBudgetAmount','Currency','Status','Notes'],
      BudgetAllocations: ['FiscalYearLabel','DepartmentName','DepartmentCode','HeadcountPlanned','AllottedAmount','Currency','Category','Quarter','ActualHiringStartDate','Notes'],
      BudgetLineItems: ['FiscalYearLabel','DepartmentName','Quarter','LineItemType','PlannedAmount','ActualAmount','Notes'],
      BudgetActuals: ['FiscalYearLabel','DepartmentName','SpendCategory','Amount','SpendDate','InvoiceReference','VendorName','RequisitionID','CandidateEmail','ApprovedById','IsApproved','Notes'],
      RecruiterPerformances: ['RecruiterName','EmployeeId','Month','Year','TotalSubmissions','TotalSelections','TotalJoinings','TotalRejections','TotalDropouts','OpenRequirements','ClosedRequirements','AvgTimeToJoin'],
      TalentPool: ['CandidateEmail','Tags','NurtureStatus','Notes','LastContactedDate'],
      CandidateSources: ['CandidateEmail','Source','CampaignCode','RecordedDate'],
      InterviewSchedule: ['CandidateEmail','RequisitionId','ScheduledDate','ScheduledTime','InterviewType','MeetingLink','RecruiterEmployeeIds','Notes','Status'],
      InternalJobPostings: ['Title','Department','Location','EmploymentType','PostingType','Description','Requirements','SalaryBandMin','SalaryBandMax','Currency','ShowSalary','PostedDate','ClosingDate','Status','RequisitionId','Notes'],
    };
    return map[feature] ?? [];
  }
}
