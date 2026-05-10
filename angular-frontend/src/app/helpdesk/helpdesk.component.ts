import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-helpdesk',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">IT & HR Helpdesk</h1>
          <p style="color:var(--text-3);font-size:13px;">Raise tickets · Track resolution · Manage SLAs</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='list'" (click)="tab='list'">All Tickets</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='raise'" (click)="tab='raise';selectedTicket=null">Raise Ticket</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='workflow'" (click)="tab='workflow'">Workflow</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{stats.Total||0}}</div><div class="kpi-lbl">Total</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{stats.Open||0}}</div><div class="kpi-lbl">Open</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{stats.InProgress||0}}</div><div class="kpi-lbl">In Progress</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{stats.Resolved||0}}</div><div class="kpi-lbl">Resolved</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{stats.Critical||0}}</div><div class="kpi-lbl">Critical</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{(stats.AvgResolutionHours||0)|number:'1.0-0'}}h</div><div class="kpi-lbl">Avg Resolution</div></div>
      </div>

      <!-- TICKETS LIST -->
      <div *ngIf="tab==='list'">
        <!-- Filters -->
        <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
          <select class="select" style="max-width:140px;" [(ngModel)]="filterStatus" (change)="loadTickets()">
            <option value="">All Status</option>
            <option>Open</option><option>InProgress</option><option>Pending</option><option>Resolved</option><option>Closed</option>
          </select>
          <select class="select" style="max-width:140px;" [(ngModel)]="filterCategory" (change)="loadTickets()">
            <option value="">All Categories</option>
            <option>IT</option><option>HR</option><option>Finance</option><option>Admin</option><option>Facility</option>
          </select>
          <select class="select" style="max-width:140px;" [(ngModel)]="filterPriority" (change)="loadTickets()">
            <option value="">All Priority</option>
            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
          </select>
          <input class="input" style="max-width:220px;" placeholder="Search tickets..." [(ngModel)]="searchQuery" (keyup.enter)="loadTickets()">
        </div>

        <!-- Table -->
        <div class="card" style="padding:0;overflow:hidden;">
          <table style="width:100%;border-collapse:collapse;">
            <thead style="background:var(--surface-alt);">
              <tr>
                <th class="th">Ticket #</th>
                <th class="th">Title</th>
                <th class="th">Category</th>
                <th class="th">Priority</th>
                <th class="th">Requester</th>
                <th class="th">Assignee</th>
                <th class="th">Status</th>
                <th class="th">Created</th>
                <th class="th"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of tickets.tickets" class="tr-hover" style="border-bottom:1px solid var(--border);">
                <td class="td" style="font-weight:700;color:#6b4df0;">{{t.ticketNumber}}</td>
                <td class="td" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{t.title}}</td>
                <td class="td"><span class="cat-chip" [class]="'cat-'+t.category?.toLowerCase()">{{t.category}}</span></td>
                <td class="td"><span class="pri-chip" [class]="'pri-'+t.priority?.toLowerCase()">{{t.priority}}</span></td>
                <td class="td" style="font-size:12px;">{{t.requesterName}}</td>
                <td class="td" style="font-size:12px;">{{t.assigneeName||'—'}}</td>
                <td class="td"><span class="status-chip" [class]="statusClass(t.status)">{{t.status}}</span></td>
                <td class="td" style="font-size:11px;color:var(--text-3);">{{t.createdAt|date:'dd MMM'}}</td>
                <td class="td"><button class="btn btn-ghost btn-sm" (click)="openTicket(t)">View</button></td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!tickets.tickets?.length" style="padding:40px;text-align:center;color:var(--text-3);">No tickets found.</div>
        </div>
      </div>

      <!-- RAISE TICKET -->
      <div *ngIf="tab==='raise'" class="card" style="max-width:640px;">
        <h3 style="font-weight:700;margin-bottom:16px;">{{selectedTicket?'Ticket Detail':'Raise New Ticket'}}</h3>

        <div *ngIf="!selectedTicket" style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label class="lbl">Category</label>
              <select class="select" [(ngModel)]="form.category" style="margin-top:4px;">
                <option>IT</option><option>HR</option><option>Finance</option><option>Admin</option><option>Facility</option>
              </select>
            </div>
            <div>
              <label class="lbl">Priority</label>
              <select class="select" [(ngModel)]="form.priority" style="margin-top:4px;">
                <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label class="lbl">Sub-Category</label>
            <input class="input" [(ngModel)]="form.subCategory" placeholder="e.g. Hardware, Software Access, Payroll Query" style="margin-top:4px;">
          </div>
          <div>
            <label class="lbl">Title *</label>
            <input class="input" [(ngModel)]="form.title" placeholder="Brief description of the issue" style="margin-top:4px;">
          </div>
          <div>
            <label class="lbl">Description</label>
            <textarea class="textarea" [(ngModel)]="form.description" rows="4" placeholder="Provide detailed information about your issue..." style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label class="lbl">Your Name *</label>
              <input class="input" [(ngModel)]="form.requesterName" style="margin-top:4px;">
            </div>
            <div>
              <label class="lbl">Your Email</label>
              <input class="input" [(ngModel)]="form.requesterEmail" type="email" style="margin-top:4px;">
            </div>
          </div>
          <div *ngIf="raiseError" style="padding:8px 12px;background:#fee2e2;border-radius:8px;color:#991b1b;font-size:13px;">{{raiseError}}</div>
          <div *ngIf="raiseSuccess" style="padding:8px 12px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{raiseSuccess}}</div>
          <button class="btn btn-primary" (click)="submitTicket()" [disabled]="submitting">
            {{submitting?'Submitting...':'Submit Ticket'}}
          </button>
        </div>

        <!-- Ticket detail view -->
        <div *ngIf="selectedTicket">
          <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
            <span class="cat-chip" [class]="'cat-'+selectedTicket.category?.toLowerCase()">{{selectedTicket.category}}</span>
            <span class="pri-chip" [class]="'pri-'+selectedTicket.priority?.toLowerCase()">{{selectedTicket.priority}}</span>
            <span class="status-chip" [class]="statusClass(selectedTicket.status)">{{selectedTicket.status}}</span>
            <span style="font-size:12px;color:var(--text-3);margin-left:auto;">{{selectedTicket.ticketNumber}}</span>
          </div>
          <h4 style="font-weight:700;font-size:16px;margin-bottom:8px;">{{selectedTicket.title}}</h4>
          <p style="font-size:13px;color:var(--text-3);margin-bottom:16px;">{{selectedTicket.description}}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;margin-bottom:16px;">
            <div><span style="color:var(--text-3);">Requester:</span> {{selectedTicket.requesterName}}</div>
            <div><span style="color:var(--text-3);">Assignee:</span> {{selectedTicket.assigneeName||'Unassigned'}}</div>
            <div><span style="color:var(--text-3);">Created:</span> {{selectedTicket.createdAt|date:'dd MMM yyyy HH:mm'}}</div>
            <div><span style="color:var(--text-3);">Due:</span> {{selectedTicket.dueDate|date:'dd MMM yyyy'||'—'}}</div>
          </div>

          <!-- Quick Actions -->
          <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
            <select class="select" style="max-width:160px;" [(ngModel)]="assignAction">
              <option value="">Assign to team...</option>
              <option>IT-Support</option><option>HR-Team</option><option>Finance</option><option>Admin</option>
            </select>
            <button class="btn btn-ghost btn-sm" (click)="assignTicket()" *ngIf="assignAction">Assign</button>
            <button class="btn btn-ghost btn-sm" style="color:#10b981;" (click)="resolveTicket()">Mark Resolved</button>
            <button class="btn btn-ghost btn-sm" style="color:#ef4444;" (click)="closeTicket()">Close</button>
          </div>

          <!-- Comments -->
          <h4 style="font-weight:700;margin-bottom:8px;">Comments ({{comments.length}})</h4>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">
            <div *ngFor="let c of comments" style="padding:10px 12px;background:var(--surface-alt);border-radius:8px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span style="font-weight:700;font-size:13px;">{{c.authorName}}</span>
                <span style="font-size:11px;color:var(--text-3);">{{c.createdAt|date:'dd MMM HH:mm'}}</span>
              </div>
              <div style="font-size:13px;">{{c.content}}</div>
            </div>
            <div *ngIf="!comments.length" style="color:var(--text-3);font-size:13px;text-align:center;padding:16px;">No comments yet.</div>
          </div>

          <!-- Add Comment -->
          <div style="display:flex;gap:8px;">
            <textarea class="textarea" [(ngModel)]="newComment" placeholder="Add a comment..." rows="2" style="flex:1;"></textarea>
            <button class="btn btn-primary btn-sm" (click)="addComment()">Post</button>
          </div>
        </div>
      </div>

      <!-- WORKFLOW VIEW -->
      <div *ngIf="tab==='workflow'">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
          <div *ngFor="let col of workflowCols" style="background:var(--surface-alt);border-radius:12px;padding:12px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:12px;padding:6px 10px;border-radius:6px;" [style.background]="col.color+'22'" [style.color]="col.color">
              {{col.label}} <span style="font-size:11px;font-weight:400;">({{col.items.length}})</span>
            </div>
            <div *ngFor="let t of col.items" class="kanban-card" (click)="openTicket(t)">
              <div style="font-weight:600;font-size:13px;margin-bottom:4px;">{{t.title}}</div>
              <div style="font-size:11px;color:var(--text-3);">{{t.ticketNumber}} · {{t.category}}</div>
              <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
                <span class="pri-chip" [class]="'pri-'+t.priority?.toLowerCase()" style="font-size:10px;">{{t.priority}}</span>
                <span style="font-size:11px;color:var(--text-3);">{{t.createdAt|date:'dd MMM'}}</span>
              </div>
            </div>
            <div *ngIf="!col.items.length" style="text-align:center;padding:20px;font-size:12px;color:var(--text-3);">Empty</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-val { font-size:24px;font-weight:800; }
    .kpi-lbl { font-size:11px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.5px; }
    .td { padding:10px 12px;font-size:13px;vertical-align:middle; }
    .tr-hover:hover { background:var(--surface-alt);cursor:pointer; }
    .lbl { font-size:12px;font-weight:600;color:var(--text-3); }
    .cat-chip,.pri-chip,.status-chip { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .cat-it { background:#dbeafe;color:#1d4ed8; }
    .cat-hr { background:#fce7f3;color:#9d174d; }
    .cat-finance { background:#d1fae5;color:#065f46; }
    .cat-admin { background:#ede9fe;color:#5b21b6; }
    .cat-facility { background:#fef3c7;color:#92400e; }
    .pri-low { background:#d1fae5;color:#065f46; }
    .pri-medium { background:#fef3c7;color:#92400e; }
    .pri-high { background:#fed7aa;color:#9a3412; }
    .pri-critical { background:#fee2e2;color:#991b1b; }
    .status-open { background:#fee2e2;color:#991b1b; }
    .status-inprogress { background:#fef3c7;color:#92400e; }
    .status-pending { background:#ede9fe;color:#5b21b6; }
    .status-resolved,.status-closed { background:#d1fae5;color:#065f46; }
    .kanban-card { background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px;cursor:pointer;transition:box-shadow .15s; }
    .kanban-card:hover { box-shadow:0 2px 8px rgba(0,0,0,.1); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:13px; }
  `]
})
export class HelpdeskComponent implements OnInit { private api = `${environment.apiUrl}/api/helpdesk`;
  constructor(private http: HttpClient) {}

  tab = 'list';
  stats: any = {};
  tickets: any = { tickets: [], total: 0 };
  selectedTicket: any = null;
  comments: any[] = [];
  newComment = '';
  assignAction = '';
  filterStatus = '';
  filterCategory = '';
  filterPriority = '';
  searchQuery = '';
  submitting = false;
  raiseError = '';
  raiseSuccess = '';

  form: any = { category: 'IT', priority: 'Medium', subCategory: '',
    title: '', description: '', requesterName: '', requesterEmail: '' };

  workflowCols = [
    { label: 'Open', status: 'Open', color: '#ef4444', items: [] as any[] },
    { label: 'In Progress', status: 'InProgress', color: '#f59e0b', items: [] as any[] },
    { label: 'Pending', status: 'Pending', color: '#6b4df0', items: [] as any[] },
    { label: 'Resolved', status: 'Resolved', color: '#10b981', items: [] as any[] },
  ];

  ngOnInit() { this.loadStats(); this.loadTickets(); }

  loadStats() { this.http.get<any>(`${this.api}/stats`).subscribe(data => { this.stats = data || {}; }); }

  loadTickets() { const params: any = {};
    if (this.filterStatus) params.status = this.filterStatus;
    if (this.filterCategory) params.category = this.filterCategory;
    if (this.filterPriority) params.priority = this.filterPriority;
    if (this.searchQuery) params.search = this.searchQuery;

    this.http.get<any>(`${this.api}/tickets`, { params }).subscribe(data => { this.tickets = data || { tickets: [], total: 0 };
      const all = this.tickets.tickets || [];
      this.workflowCols.forEach(col => { col.items = all.filter((t: any) => t.status === col.status); }); }); }

  openTicket(ticket: any) { this.selectedTicket = ticket;
    this.tab = 'raise';
    this.loadComments(ticket.id); }

  loadComments(ticketId: string) { this.http.get<any[]>(`${this.api}/tickets/${ticketId}/comments`).subscribe(data => { this.comments = data || []; }); }

  addComment() { if (!this.newComment.trim() || !this.selectedTicket) return;
    this.http.post<any>(`${this.api}/tickets/${this.selectedTicket.id}/comments`, { content: this.newComment }).subscribe({ next: res => { this.comments.push(res);
        this.newComment = '';
        this.loadStats(); },
      error: () => { this.comments.push({ authorName: 'You', content: this.newComment, createdAt: new Date().toISOString() });
        this.newComment = ''; } }); }

  assignTicket() { if (!this.selectedTicket || !this.assignAction) return;
    this.http.patch(`${this.api}/tickets/${this.selectedTicket.id}/status`, { status: 'InProgress', assignedTeam: this.assignAction, assigneeName: this.assignAction, notes: `Assigned to ${this.assignAction}` }).subscribe({ next: (res: any) => { this.selectedTicket.status = res.status; this.selectedTicket.assigneeName = res.assigneeName; this.assignAction = ''; this.loadStats(); this.loadTickets(); },
      error: () => { this.selectedTicket.status = 'InProgress'; this.assignAction = ''; } }); }

  resolveTicket() { if (!this.selectedTicket) return;
    this.http.patch(`${this.api}/tickets/${this.selectedTicket.id}/status`, { status: 'Resolved', notes: 'Ticket resolved' }).subscribe({ next: (res: any) => { this.selectedTicket.status = 'Resolved'; this.loadStats(); this.loadTickets(); },
      error: () => { this.selectedTicket.status = 'Resolved'; } }); }

  closeTicket() { if (!this.selectedTicket) return;
    this.http.patch(`${this.api}/tickets/${this.selectedTicket.id}/status`, { status: 'Closed', notes: 'Ticket closed' }).subscribe({ next: () => { this.selectedTicket.status = 'Closed'; this.loadStats(); this.loadTickets(); },
      error: () => { this.selectedTicket.status = 'Closed'; } }); }

  submitTicket() { this.raiseError = '';
    if (!this.form.title || !this.form.requesterName) { this.raiseError = 'Title and requester name are required'; return; }
    this.submitting = true;
    this.http.post<any>(`${this.api}/tickets`, this.form).subscribe({ next: res => { this.raiseSuccess = `Ticket ${res.ticketNumber} created successfully`;
        this.form = { category: 'IT', priority: 'Medium', subCategory: '', title: '', description: '', requesterName: '', requesterEmail: '' };
        this.submitting = false;
        this.loadStats(); this.loadTickets();
        setTimeout(() => { this.raiseSuccess = ''; this.tab = 'list'; }, 2000); },
      error: () => { this.raiseError = 'Failed to submit ticket. Please try again.';
        this.submitting = false; } }); }

  statusClass(status: string) { const map: any = { Open: 'status-open', InProgress: 'status-inprogress', Pending: 'status-pending', Resolved: 'status-resolved', Closed: 'status-closed' };
    return map[status] || ''; }
}

