import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-document-management',
  template: `
    <div class="page-container page-enter">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <div>
          <h1 class="page-title">Document Management</h1>
          <p style="color:var(--text-3);font-size:13px;">{{docs.length}} documents · Secure HR document repository</p>
        </div>
        <button class="btn btn-primary" (click)="showUpload=!showUpload">
          {{showUpload ? '✕ Close' : '+ Upload Document'}}
        </button>
      </div>

      <!-- Upload Form -->
      <div class="card" style="margin-bottom:16px;" *ngIf="showUpload">
        <h3 style="font-weight:700;margin-bottom:16px;">Upload Document</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
          <select class="select" [(ngModel)]="draft.employeeId">
            <option value="">All Employees</option>
            <option *ngFor="let e of employees; trackBy: trackById" [value]="e.id">
              {{e.firstName}} {{e.lastName}}
            </option>
          </select>
          <input class="input" placeholder="Document title (required)" [(ngModel)]="draft.title">
          <select class="select" [(ngModel)]="draft.category">
            <option value="">Select category</option>
            <option *ngFor="let c of docCategories; trackBy: trackByStr" [value]="c">{{c}}</option>
          </select>
          <input class="input" type="date" [(ngModel)]="draft.expiryDate" title="Expiry date (optional)">
          <select class="select" [(ngModel)]="draft.access">
            <option value="HR Only">HR Only</option>
            <option value="Employee + HR">Employee + HR</option>
            <option value="All">All</option>
          </select>
          <label class="upload-box" style="cursor:pointer;">
            <mat-icon style="font-size:20px;">upload_file</mat-icon>
            <span style="font-size:12px;margin-top:2px;">{{draft.fileName || 'Choose file (.pdf, .doc, .docx, .jpg, .png)'}}</span>
            <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" style="display:none;" (change)="onFile($event)">
          </label>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;">
          <button class="btn btn-primary" (click)="uploadDoc()" [disabled]="uploading || !draft.title || !draft.category || !selectedFile">
            {{uploading ? 'Uploading…' : 'Upload'}}
          </button>
          <button class="btn btn-ghost" (click)="showUpload=false;resetDraft()">Cancel</button>
        </div>
      </div>

      <!-- Category filter chips -->
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
        <button class="cat-tab" [class.active]="activeCategory==='All'" (click)="activeCategory='All'">All</button>
        <button *ngFor="let c of docCategories; trackBy: trackByStr"
                class="cat-tab" [class.active]="activeCategory===c" (click)="activeCategory=c">{{c}}</button>
      </div>

      <!-- Search + employee filter -->
      <div class="card" style="padding:12px 16px;margin-bottom:16px;display:flex;gap:10px;align-items:center;">
        <input class="input" style="max-width:280px;" placeholder="Search documents…" [(ngModel)]="search">
        <select class="select" style="max-width:200px;" [(ngModel)]="filterEmployee">
          <option value="">All Employees</option>
          <option *ngFor="let e of employees; trackBy: trackById" [value]="e.id">{{e.firstName}} {{e.lastName}}</option>
        </select>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" style="text-align:center;padding:48px;color:var(--text-3);">
        <mat-spinner diameter="36" style="margin:0 auto 12px;"></mat-spinner>
        <p>Loading documents…</p>
      </div>

      <!-- Document list -->
      <div class="card" *ngIf="!loading">
        <div class="doc-row" *ngFor="let doc of filteredDocs; trackBy: trackById">
          <div class="doc-icon" [style.background]="typeColor(doc.type)">
            <mat-icon style="font-size:20px;" [style.color]="typeIconColor(doc.type)">{{typeIcon(doc.type)}}</mat-icon>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{doc.title}}</div>
            <div style="font-size:12px;color:var(--text-3);">
              {{doc.category}} · {{doc.employeeName || 'All'}} · Uploaded by {{doc.uploadedBy}} · {{doc.uploadDate}}
            </div>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-right:16px;white-space:nowrap;">{{doc.size}}</div>
          <span class="access-badge" [class.hr]="doc.access==='HR Only'" [class.all]="doc.access==='All'">{{doc.access}}</span>
          <span *ngIf="doc.expiryDate" class="expiry-badge" [class.expired]="isExpired(doc.expiryDate)">
            {{isExpired(doc.expiryDate) ? 'Expired' : 'Exp: '+doc.expiryDate}}
          </span>
          <button class="btn btn-ghost btn-sm" style="margin-left:8px;" (click)="downloadDoc(doc)">Download</button>
          <button class="btn btn-ghost btn-sm" style="color:#ef4444;margin-left:4px;" (click)="deleteDoc(doc)">Delete</button>
        </div>
        <!-- Empty state -->
        <div *ngIf="!loading && filteredDocs.length===0"
             style="text-align:center;padding:48px;color:var(--text-3);">
          <mat-icon style="font-size:48px;display:block;margin-bottom:8px;">description</mat-icon>
          <p>No documents found.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cat-tab { padding:6px 16px;border-radius:20px;border:1px solid var(--border);background:var(--surface);
               cursor:pointer;font-size:13px;font-weight:500;color:var(--text-3);transition:all 150ms; }
    .cat-tab.active { background:#6b4df0;color:#fff;border-color:#6b4df0; }
    .doc-row { display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--border); }
    .doc-row:last-child { border-bottom:none; }
    .doc-row:hover { background:var(--surface-alt); }
    .doc-icon { width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .access-badge { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:#e0e7ff;color:#3730a3;white-space:nowrap; }
    .access-badge.hr { background:#fef3c7;color:#92400e; }
    .access-badge.all { background:#d1fae5;color:#065f46; }
    .expiry-badge { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:#f3f4f6;color:#6b7280;
                    margin-left:6px;white-space:nowrap; }
    .expiry-badge.expired { background:#fee2e2;color:#991b1b; }
    .upload-box { display:flex;flex-direction:column;align-items:center;justify-content:center;
                  border:2px dashed var(--border);border-radius:8px;height:72px;color:var(--text-3);gap:2px; }
  `]
})
export class DocumentManagementComponent implements OnInit {
  private empApi = `${environment.apiUrl}/api/employees`;

  showUpload = false;
  loading = false;
  uploading = false;
  search = '';
  activeCategory = 'All';
  filterEmployee = '';
  selectedFile: File | null = null;

  employees: any[] = [];
  docs: any[] = [];
  docCategories = ['Contract', 'ID Proof', 'Certificate', 'Policy', 'Other'];
  draft: any = { employeeId: '', title: '', category: '', expiryDate: '', access: 'HR Only', fileName: '' };

  trackById = (_: number, item: any) => item.id;
  trackByStr = (_: number, s: string) => s;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadDocs();
  }

  loadEmployees() {
    this.http.get<any>(`${environment.apiUrl}/api/employees`).subscribe({
      next: r => { this.employees = [...(r?.data || r || [])]; },
      error: () => {}
    });
  }

  loadDocs() {
    this.loading = true;
    this.http.get<any>(`${this.empApi}/documents`).subscribe({
      next: r => {
        const data = r?.data || r || [];
        this.docs = [...data.map((d: any) => ({
          id: d.id,
          title: d.title || d.fileName || '',
          category: d.category || d.documentType || 'Other',
          employeeId: d.employeeId || '',
          employeeName: d.employeeName || d.employee || '',
          uploadedBy: d.uploadedByName || d.uploadedBy || 'HR',
          uploadDate: d.uploadedAt?.slice(0, 10) || d.uploadDate?.slice(0, 10) || '',
          size: d.fileSize || d.size || '—',
          type: (d.fileName || d.title || '').split('.').pop()?.toLowerCase() || 'pdf',
          access: d.accessLevel || d.access || 'HR Only',
          expiryDate: d.expiryDate?.slice(0, 10) || ''
        }))];
        this.loading = false;
      },
      error: err => {
        this.snack.open(err.status === 403 ? 'Access denied' : 'Failed to load documents', 'Close', { duration: 4000 });
        this.loading = false;
      }
    });
  }

  get filteredDocs() {
    return this.docs.filter(d => {
      const matchCat = this.activeCategory === 'All' || d.category === this.activeCategory;
      const matchSearch = !this.search || d.title.toLowerCase().includes(this.search.toLowerCase());
      const matchEmp = !this.filterEmployee || d.employeeId === this.filterEmployee;
      return matchCat && matchSearch && matchEmp;
    });
  }

  onFile(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) { this.selectedFile = f; this.draft.fileName = f.name; }
  }

  uploadDoc() {
    if (!this.draft.title || !this.draft.category || !this.selectedFile) return;
    this.uploading = true;
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('title', this.draft.title);
    fd.append('category', this.draft.category);
    if (this.draft.employeeId) fd.append('employeeId', this.draft.employeeId);
    if (this.draft.expiryDate) fd.append('expiryDate', this.draft.expiryDate);
    fd.append('accessLevel', this.draft.access);
    this.http.post(`${this.empApi}/documents`, fd).subscribe({
      next: () => {
        this.snack.open('Document uploaded', '', { duration: 2000 });
        this.uploading = false;
        this.resetDraft();
        this.showUpload = false;
        this.loadDocs();
      },
      error: err => {
        this.snack.open(err.status === 403 ? 'Access denied' : 'Upload failed', 'Close', { duration: 4000 });
        this.uploading = false;
      }
    });
  }

  downloadDoc(doc: any) {
    this.http.get(`${this.empApi}/documents/${doc.id}/download`, { responseType: 'blob' }).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.title || `document-${doc.id}`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.snack.open('Download failed', 'Close', { duration: 3000 })
    });
  }

  deleteDoc(doc: any) {
    const ref = this.snack.open(`Delete "${doc.title}"?`, 'Delete', { duration: 5000 });
    ref.onAction().subscribe(() => {
      this.http.delete(`${this.empApi}/documents/${doc.id}`).subscribe({
        next: () => { this.snack.open('Document deleted', '', { duration: 2000 }); this.loadDocs(); },
        error: err => this.snack.open(err.status === 403 ? 'Access denied' : 'Delete failed', 'Close', { duration: 4000 })
      });
    });
  }

  resetDraft() {
    this.draft = { employeeId: '', title: '', category: '', expiryDate: '', access: 'HR Only', fileName: '' };
    this.selectedFile = null;
  }

  typeIcon(t: string): string {
    if (['jpg', 'jpeg', 'png', 'gif'].includes(t)) return 'image';
    if (t === 'pdf') return 'picture_as_pdf';
    if (['doc', 'docx'].includes(t)) return 'description';
    return 'attach_file';
  }

  typeIconColor(t: string): string {
    if (['jpg', 'jpeg', 'png', 'gif'].includes(t)) return '#10b981';
    if (t === 'pdf') return '#ef4444';
    if (['doc', 'docx'].includes(t)) return '#3b82f6';
    return '#6b7280';
  }

  typeColor(t: string): string {
    if (['jpg', 'jpeg', 'png', 'gif'].includes(t)) return 'rgba(16,185,129,.1)';
    if (t === 'pdf') return 'rgba(239,68,68,.1)';
    if (['doc', 'docx'].includes(t)) return 'rgba(59,130,246,.1)';
    return 'rgba(107,77,240,.1)';
  }

  isExpired(date: string): boolean { return date ? new Date(date) < new Date() : false; }
}
