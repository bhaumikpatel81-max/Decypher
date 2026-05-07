import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-document-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Document Management</h1>
          <p style="color:var(--text-3);font-size:13px;">{{docs.length}} documents · Secure HR document repository</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showUpload=!showUpload">+ Upload Document</button>
      </div>

      <!-- Upload form -->
      <div class="card mb-6" *ngIf="showUpload">
        <h3 style="font-weight:700;margin-bottom:16px;">Upload Document</h3>
        <div class="form-grid-3">
          <input class="input" placeholder="Document title" [(ngModel)]="draft.title">
          <select class="select" [(ngModel)]="draft.category">
            <option value="">Select category</option>
            <option *ngFor="let c of categories">{{c}}</option>
          </select>
          <input class="input" placeholder="Employee name (or All)" [(ngModel)]="draft.employee">
          <input class="input" type="date" [(ngModel)]="draft.expiryDate" title="Expiry date (if applicable)">
          <select class="select" [(ngModel)]="draft.access">
            <option>HR Only</option><option>Employee + HR</option><option>All</option>
          </select>
          <label class="upload-box" style="cursor:pointer;">
            <span>{{draft.fileName || 'Choose file (.pdf, .docx, .jpg)'}}</span>
            <input type="file" accept=".pdf,.docx,.jpg,.png" style="display:none;" (change)="onFile($event)">
          </label>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;">
          <button class="btn btn-primary" (click)="upload()">Upload</button>
          <button class="btn btn-ghost" (click)="showUpload=false">Cancel</button>
        </div>
      </div>

      <!-- Category tabs -->
      <div class="cat-tabs mb-6">
        <button *ngFor="let c of allCategories" class="cat-tab" [class.active]="activeCategory===c" (click)="activeCategory=c">{{c}}</button>
      </div>

      <!-- Search -->
      <div class="card mb-4" style="padding:12px 16px;">
        <input class="input" placeholder="Search documents..." [(ngModel)]="search" style="max-width:320px;">
      </div>

      <!-- Doc list -->
      <div class="card">
        <div class="doc-row" *ngFor="let doc of filteredDocs">
          <div class="doc-icon" [style.background]="typeColor(doc.type)">{{typeIcon(doc.type)}}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;font-size:14px;">{{doc.title}}</div>
            <div style="font-size:12px;color:var(--text-3);">{{doc.category}} · {{doc.employee}} · Uploaded {{doc.uploadDate}}</div>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-right:16px;">{{doc.size}}</div>
          <span class="access-badge" [class.hr]="doc.access==='HR Only'" [class.all]="doc.access==='All'">{{doc.access}}</span>
          <span *ngIf="doc.expiryDate" class="expiry-badge" [class.expired]="isExpired(doc.expiryDate)">
            {{isExpired(doc.expiryDate) ? 'Expired' : 'Exp: '+doc.expiryDate}}
          </span>
          <button class="btn btn-ghost btn-sm" style="margin-left:8px;">Download</button>
          <button class="btn btn-ghost btn-sm" style="color:#ef4444;margin-left:4px;" (click)="deleteDoc(doc)">Delete</button>
        </div>
        <div *ngIf="!filteredDocs.length" style="text-align:center;padding:40px;color:var(--text-3);">No documents found.</div>
      </div>
    </div>
  `,
  styles: [`
    .form-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    .cat-tabs { display:flex; gap:6px; flex-wrap:wrap; }
    .cat-tab { padding:6px 16px; border-radius:20px; border:1px solid var(--border); background:var(--surface); cursor:pointer; font-size:13px; font-weight:500; color:var(--text-3); transition:all 150ms; }
    .cat-tab.active { background:var(--brand-violet-500); color:#fff; border-color:var(--brand-violet-500); }
    .doc-row { display:flex; align-items:center; gap:12px; padding:14px 16px; border-bottom:1px solid var(--border); }
    .doc-row:last-child { border-bottom:none; }
    .doc-row:hover { background:var(--surface-alt); }
    .doc-icon { width:40px; height:40px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
    .access-badge { padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600; background:#e0e7ff; color:#3730a3; }
    .access-badge.hr { background:#fef3c7; color:#92400e; }
    .access-badge.all { background:#d1fae5; color:#065f46; }
    .expiry-badge { padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600; background:#f3f4f6; color:#6b7280; margin-left:6px; }
    .expiry-badge.expired { background:#fee2e2; color:#991b1b; }
    .upload-box { display:flex; align-items:center; justify-content:center; border:2px dashed var(--border); border-radius:8px; height:48px; font-size:13px; color:var(--text-3); }
  `]
})
export class DocumentManagementComponent implements OnInit {
  private api = `${environment.apiUrl}/api/employees`;
  constructor(private http: HttpClient) {}
  showUpload = false; search = ''; activeCategory = 'All';
  categories = ['Contracts','Offer Letters','Policies','Certificates','Identity Proofs','Appraisal Documents','Exit Documents'];
  draft: any = { title:'', category:'', employee:'', expiryDate:'', access:'HR Only', fileName:'', fileSize:'' };

  docs: any[] = [];

  get allCategories() { return ['All', ...this.categories]; }

  ngOnInit() { this.loadDocs(); }

  loadDocs() {
    this.http.get<any[]>(`${this.api}/documents`).subscribe(data => {
      this.docs = (data || []).map(d => ({
        id: d.id, title: d.title || d.fileName || '',
        category: d.category || d.documentType || '',
        employee: d.employeeName || d.employee || 'All',
        uploadDate: d.uploadedAt?.slice(0, 10) || d.uploadDate?.slice(0, 10) || '',
        size: d.fileSize || d.size || '—',
        type: (d.fileName || d.title || '').split('.').pop() || 'pdf',
        access: d.accessLevel || d.access || 'HR Only',
        expiryDate: d.expiryDate?.slice(0, 10) || ''
      }));
    });
  }

  get filteredDocs() {
    return this.docs.filter(d => {
      const matchCat = this.activeCategory === 'All' || d.category === this.activeCategory;
      const matchSearch = !this.search || d.title.toLowerCase().includes(this.search.toLowerCase()) || d.employee.toLowerCase().includes(this.search.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  onFile(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) { this.draft.fileName = f.name; this.draft.fileSize = (f.size/1024).toFixed(0)+' KB'; }
  }

  upload() {
    if (!this.draft.title || !this.draft.category) return;
    const payload = { title: this.draft.title, category: this.draft.category, employeeName: this.draft.employee, expiryDate: this.draft.expiryDate || null, accessLevel: this.draft.access, fileName: this.draft.fileName, fileSize: this.draft.fileSize };
    this.http.post<any>(`${this.api}/documents`, payload).subscribe({
      next: res => {
        this.docs.unshift({ id: res.id || Date.now(), ...this.draft, size: this.draft.fileSize || '—', type: this.draft.fileName?.split('.').pop() || 'pdf', uploadDate: new Date().toISOString().slice(0,10) });
        this.draft = { title:'', category:'', employee:'', expiryDate:'', access:'HR Only', fileName:'', fileSize:'' };
        this.showUpload = false;
      },
      error: () => {
        this.docs.unshift({ id: Date.now(), ...this.draft, size: this.draft.fileSize || '—', type: this.draft.fileName?.split('.').pop() || 'pdf', uploadDate: new Date().toISOString().slice(0,10) });
        this.draft = { title:'', category:'', employee:'', expiryDate:'', access:'HR Only', fileName:'', fileSize:'' };
        this.showUpload = false;
      }
    });
  }

  deleteDoc(doc: any) {
    this.http.delete(`${this.api}/documents/${doc.id}`).subscribe({
      next: () => { this.docs = this.docs.filter(d => d.id !== doc.id); },
      error: () => { this.docs = this.docs.filter(d => d.id !== doc.id); }
    });
  }
  typeIcon(t: string): string { return t==='pdf'?'📄':t==='jpg'||t==='png'?'🖼️':'📝'; }
  typeColor(t: string): string { return t==='pdf'?'rgba(239,68,68,.1)':t==='jpg'||t==='png'?'rgba(16,185,129,.1)':'rgba(107,77,240,.1)'; }
  isExpired(date: string): boolean { return date ? new Date(date) < new Date() : false; }
}
