import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-internal-job-postings',
  template: `
    <section class="stack-page">
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h2 style="margin:0;font-size:20px;font-weight:700">Internal Job Postings</h2>
          <button class="btn btn-primary" (click)="openForm()">+ New Posting</button>
        </div>

        <!-- Filter bar -->
        <div style="display:flex;gap:8px;margin-bottom:16px">
          <select class="input" style="width:160px" [(ngModel)]="filterStatus" (change)="load()">
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <!-- Postings table -->
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:2px solid #e2e8f0;text-align:left">
                <th style="padding:10px 8px">Title</th>
                <th style="padding:10px 8px">Department</th>
                <th style="padding:10px 8px">Type</th>
                <th style="padding:10px 8px">Posting</th>
                <th style="padding:10px 8px">Salary Band</th>
                <th style="padding:10px 8px">Status</th>
                <th style="padding:10px 8px">Closing</th>
                <th style="padding:10px 8px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of postings" style="border-bottom:1px solid #f1f5f9">
                <td style="padding:10px 8px;font-weight:600">{{ p.title }}</td>
                <td style="padding:10px 8px">{{ p.department || '—' }}</td>
                <td style="padding:10px 8px">{{ p.employmentType }}</td>
                <td style="padding:10px 8px">
                  <span [style.background]="postingTypeColor(p.postingType)"
                        style="padding:3px 8px;border-radius:12px;font-size:11px;color:#fff;font-weight:600">
                    {{ p.postingType }}
                  </span>
                </td>
                <td style="padding:10px 8px">
                  <span *ngIf="p.showSalary && p.salaryBandMin">
                    {{ p.salaryBandMin | number }} – {{ p.salaryBandMax | number }} {{ p.currency }}
                  </span>
                  <span *ngIf="!p.showSalary" style="color:#94a3b8">Hidden</span>
                </td>
                <td style="padding:10px 8px">
                  <span [style.background]="statusColor(p.status)"
                        style="padding:3px 10px;border-radius:12px;font-size:11px;color:#fff;font-weight:600">
                    {{ p.status }}
                  </span>
                </td>
                <td style="padding:10px 8px">{{ p.closingDate ? (p.closingDate | date:'dd MMM yyyy') : '—' }}</td>
                <td style="padding:10px 8px;display:flex;gap:6px">
                  <button class="btn btn-secondary" style="height:28px;font-size:12px" (click)="editPosting(p)">Edit</button>
                  <button class="btn btn-ghost" style="height:28px;font-size:12px;color:#dc2626" (click)="deletePosting(p.id)">Delete</button>
                </td>
              </tr>
              <tr *ngIf="postings.length === 0">
                <td colspan="8" style="padding:32px;text-align:center;color:#94a3b8">No postings found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create / Edit Form -->
      <div class="card" *ngIf="showForm">
        <h3 style="margin:0 0 16px;font-size:16px;font-weight:700">{{ draft.id ? 'Edit' : 'New' }} Job Posting</h3>
        <div class="form-grid">
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Title *</label>
            <input class="input" [(ngModel)]="draft.title" placeholder="e.g. Senior Engineer — Internal">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Department</label>
            <input class="input" [(ngModel)]="draft.department" placeholder="Engineering">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Location</label>
            <input class="input" [(ngModel)]="draft.location" placeholder="London / Remote">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Employment Type</label>
            <select class="input" [(ngModel)]="draft.employmentType">
              <option>FullTime</option><option>PartTime</option><option>Contract</option><option>Intern</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Posting Type</label>
            <select class="input" [(ngModel)]="draft.postingType">
              <option>Internal</option><option>Referral</option><option>Both</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Status</label>
            <select class="input" [(ngModel)]="draft.status">
              <option>Draft</option><option>Active</option><option>Paused</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Salary Min</label>
            <input class="input" type="number" [(ngModel)]="draft.salaryBandMin">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Salary Max</label>
            <input class="input" type="number" [(ngModel)]="draft.salaryBandMax">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Currency</label>
            <select class="select" [(ngModel)]="draft.currency">
              <option>INR</option><option>GBP</option><option>USD</option><option>EUR</option>
            </select>
          </div>
          <div style="display:flex;align-items:center;gap:8px;padding-top:20px">
            <input type="checkbox" [(ngModel)]="draft.showSalary" id="showSal">
            <label for="showSal" style="font-size:13px">Show Salary to Employees</label>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Posted Date</label>
            <input class="input" type="date" [(ngModel)]="draft.postedDate">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Closing Date</label>
            <input class="input" type="date" [(ngModel)]="draft.closingDate">
          </div>
        </div>
        <div style="margin-top:12px">
          <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Description</label>
          <textarea class="input textarea" rows="3" [(ngModel)]="draft.description" placeholder="Role description..."></textarea>
        </div>
        <div style="margin-top:12px">
          <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Requirements</label>
          <textarea class="input textarea" rows="3" [(ngModel)]="draft.requirements" placeholder="Skills, experience requirements..."></textarea>
        </div>
        <div style="margin-top:12px">
          <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Notes</label>
          <input class="input" [(ngModel)]="draft.notes" placeholder="Internal notes...">
        </div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn btn-primary" (click)="save()">{{ draft.id ? 'Update' : 'Create' }}</button>
          <button class="btn btn-secondary" (click)="closeForm()">Cancel</button>
        </div>
        <div *ngIf="saveError" style="color:#dc2626;font-size:13px;margin-top:8px">{{ saveError }}</div>
      </div>
    </section>
  `
})
export class InternalJobPostingsComponent implements OnInit { private readonly api = `${environment.apiUrl}/api/internal-job-postings`;
  postings: any[] = [];
  filterStatus = '';
  showForm = false;
  saveError = '';
  draft: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() { const params = this.filterStatus ? `?status=${this.filterStatus}` : '';
    this.http.get<any[]>(`${this.api}${params}`).subscribe(data => this.postings = data, () => this.postings = []); }

  openForm() { this.draft = { employmentType: 'FullTime', postingType: 'Internal', status: 'Draft', currency: 'INR', showSalary: false };
    this.showForm = true;
    this.saveError = ''; }

  editPosting(p: any) { this.draft = { ...p };
    this.showForm = true;
    this.saveError = ''; }

  closeForm() { this.showForm = false; }

  save() { const req = this.draft.id
      ? this.http.put(`${this.api}/${this.draft.id}`, this.draft)
      : this.http.post(this.api, this.draft);
    req.subscribe(() => { this.closeForm(); this.load(); }, err => this.saveError = err.error?.message || 'Save failed.'); }

  deletePosting(id: string) { if (!confirm('Delete this posting?')) return;
    this.http.delete(`${this.api}/${id}`).subscribe(() => this.load()); }

  statusColor(s: string) { return s === 'Active' ? '#16a34a' : s === 'Paused' ? '#d97706' : '#64748b'; }

  postingTypeColor(t: string) { return t === 'Internal' ? '#2563eb' : t === 'Referral' ? '#7c3aed' : '#0891b2'; }
}

