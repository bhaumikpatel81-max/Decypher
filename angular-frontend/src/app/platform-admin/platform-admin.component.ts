import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-platform-admin',
  template: `
    <div style="display:flex;min-height:100vh;background:var(--bg,#0f0f14);">
      <!-- Sidebar -->
      <aside style="width:220px;flex-shrink:0;background:var(--surface,#1a1a24);border-right:1px solid var(--border,#2a2a3a);padding:24px 0;display:flex;flex-direction:column;">
        <div style="padding:0 20px 24px;border-bottom:1px solid var(--border,#2a2a3a);">
          <div style="font-weight:700;font-size:16px;">Decypher Platform</div>
          <div style="font-size:11px;color:var(--text-3,#888);margin-top:2px;">Super Admin Console</div>
        </div>
        <nav style="padding:16px 12px;flex:1;">
          <button *ngFor="let item of navItems" (click)="tab=item.id"
            style="display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border:none;border-radius:8px;cursor:pointer;font-size:13px;margin-bottom:2px;text-align:left;"
            [style.background]="tab===item.id?'rgba(139,92,246,.15)':'transparent'"
            [style.color]="tab===item.id?'#a78bfa':'var(--text-2,#bbb)'">
            <span>{{item.icon}}</span> {{item.label}}
          </button>
        </nav>
        <div style="padding:16px 20px;border-top:1px solid var(--border,#2a2a3a);">
          <div style="font-size:12px;color:var(--text-3,#888);">{{currentUser?.fullName}}</div>
          <button (click)="logout()" style="font-size:12px;color:#ef4444;background:none;border:none;cursor:pointer;padding:4px 0;">Logout</button>
        </div>
      </aside>

      <!-- Main content -->
      <main style="flex:1;padding:32px;overflow-y:auto;">

        <!-- Overview Tab -->
        <div *ngIf="tab==='overview'">
          <h2 style="margin:0 0 24px;font-size:20px;">Platform Overview</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:32px;">
            <div *ngFor="let kpi of kpis" style="background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:12px;padding:20px;">
              <div style="font-size:24px;font-weight:700;">{{kpi.value}}</div>
              <div style="font-size:12px;color:var(--text-3,#888);margin-top:4px;">{{kpi.label}}</div>
            </div>
          </div>
          <div style="background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:12px;padding:20px;">
            <h3 style="margin:0 0 16px;font-size:15px;">Recent Tenants</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr style="border-bottom:1px solid var(--border,#2a2a3a);">
                <th style="text-align:left;padding:8px 10px;color:var(--text-3,#888);">Company</th>
                <th style="text-align:left;padding:8px 10px;color:var(--text-3,#888);">Plan</th>
                <th style="text-align:left;padding:8px 10px;color:var(--text-3,#888);">Users</th>
                <th style="text-align:left;padding:8px 10px;color:var(--text-3,#888);">Status</th>
              </tr></thead>
              <tbody>
                <tr *ngFor="let t of tenants.slice(0,5)" style="border-bottom:1px solid var(--border,#2a2a3a);">
                  <td style="padding:10px;">{{t.companyName}}</td>
                  <td style="padding:10px;"><span style="padding:2px 8px;border-radius:4px;font-size:11px;" [style.background]="planColor(t.subscriptionPlan)">{{t.subscriptionPlan}}</span></td>
                  <td style="padding:10px;">{{t.userCount}}</td>
                  <td style="padding:10px;"><span [style.color]="t.isActive?'#22c55e':'#ef4444'">{{t.isActive?'Active':'Suspended'}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tenants Tab -->
        <div *ngIf="tab==='tenants'">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
            <h2 style="margin:0;font-size:20px;">Tenants</h2>
            <button class="btn btn-primary btn-sm" (click)="showCreate=!showCreate">+ New Tenant</button>
          </div>

          <!-- Create Tenant Form -->
          <div *ngIf="showCreate" style="background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:12px;padding:24px;margin-bottom:24px;">
            <h3 style="margin:0 0 16px;font-size:15px;">Create New Tenant</h3>
            <div *ngIf="createError" style="color:#ef4444;font-size:13px;margin-bottom:12px;">{{createError}}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <input class="input" placeholder="Company name*" [(ngModel)]="newTenant.companyName">
              <input class="input" placeholder="Industry" [(ngModel)]="newTenant.industry">
              <input class="input" placeholder="Admin email*" [(ngModel)]="newTenant.adminEmail">
              <input class="input" placeholder="Admin password*" type="password" [(ngModel)]="newTenant.adminPassword">
              <input class="input" placeholder="Admin first name*" [(ngModel)]="newTenant.adminFirstName">
              <input class="input" placeholder="Admin last name*" [(ngModel)]="newTenant.adminLastName">
              <select class="select" [(ngModel)]="newTenant.subscriptionPlan">
                <option value="Free">Free</option>
                <option value="Growth">Growth</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <input class="input" placeholder="Employee count" type="number" [(ngModel)]="newTenant.employeeCount">
            </div>
            <div style="margin-top:16px;display:flex;gap:10px;">
              <button class="btn btn-primary btn-sm" (click)="createTenant()">Create Tenant</button>
              <button class="btn btn-ghost btn-sm" (click)="showCreate=false">Cancel</button>
            </div>
          </div>

          <!-- Filters -->
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <input class="input" placeholder="Search..." [(ngModel)]="tenantSearch" (ngModelChange)="loadTenants()" style="flex:1;">
            <select class="select" [(ngModel)]="tenantStatus" (ngModelChange)="loadTenants()">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            <select class="select" [(ngModel)]="tenantPlan" (ngModelChange)="loadTenants()">
              <option value="">All Plans</option>
              <option value="Free">Free</option>
              <option value="Growth">Growth</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          <div style="background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:12px;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr style="background:var(--surface-alt,#222232);">
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Company</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Industry</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Plan</th>
                <th style="text-align:center;padding:12px 14px;color:var(--text-3,#888);">Users</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Created</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Status</th>
                <th style="text-align:center;padding:12px 14px;color:var(--text-3,#888);">Actions</th>
              </tr></thead>
              <tbody>
                <tr *ngFor="let t of tenants" style="border-bottom:1px solid var(--border,#2a2a3a);">
                  <td style="padding:12px 14px;font-weight:600;">{{t.companyName}}</td>
                  <td style="padding:12px 14px;color:var(--text-3,#888);">{{t.industry||'—'}}</td>
                  <td style="padding:12px 14px;"><span style="padding:2px 10px;border-radius:4px;font-size:11px;" [style.background]="planColor(t.subscriptionPlan)">{{t.subscriptionPlan}}</span></td>
                  <td style="padding:12px 14px;text-align:center;">{{t.userCount}}</td>
                  <td style="padding:12px 14px;color:var(--text-3,#888);">{{t.createdAt | date:'dd MMM yy'}}</td>
                  <td style="padding:12px 14px;"><span [style.color]="t.isActive?'#22c55e':'#ef4444'" style="font-weight:600;">{{t.isActive?'Active':'Suspended'}}</span></td>
                  <td style="padding:12px 14px;text-align:center;">
                    <button *ngIf="t.isActive" class="btn btn-ghost btn-sm" (click)="suspendTenant(t)" style="color:#f97316;">Suspend</button>
                    <button *ngIf="!t.isActive" class="btn btn-ghost btn-sm" (click)="activateTenant(t)" style="color:#22c55e;">Activate</button>
                  </td>
                </tr>
                <tr *ngIf="!tenants.length"><td colspan="7" style="padding:32px;text-align:center;color:var(--text-3,#888);">No tenants found.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Users Tab -->
        <div *ngIf="tab==='users'">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
            <h2 style="margin:0;font-size:20px;">All Users</h2>
          </div>
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <input class="input" placeholder="Search by name or email..." [(ngModel)]="userSearch" (ngModelChange)="loadUsers()" style="flex:1;">
          </div>
          <div style="background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:12px;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr style="background:var(--surface-alt,#222232);">
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Name</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Email</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Role</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Last Login</th>
                <th style="text-align:left;padding:12px 14px;color:var(--text-3,#888);">Status</th>
                <th style="text-align:center;padding:12px 14px;color:var(--text-3,#888);">Actions</th>
              </tr></thead>
              <tbody>
                <tr *ngFor="let u of platformUsers" style="border-bottom:1px solid var(--border,#2a2a3a);">
                  <td style="padding:12px 14px;font-weight:600;">{{u.fullName}}</td>
                  <td style="padding:12px 14px;color:var(--text-3,#888);">{{u.email}}</td>
                  <td style="padding:12px 14px;">{{u.role}}</td>
                  <td style="padding:12px 14px;color:var(--text-3,#888);">{{u.lastLoginAt ? (u.lastLoginAt | date:'dd MMM yy') : 'Never'}}</td>
                  <td style="padding:12px 14px;"><span [style.color]="u.isActive?'#22c55e':'#ef4444'">{{u.isActive?'Active':'Disabled'}}</span></td>
                  <td style="padding:12px 14px;text-align:center;">
                    <button *ngIf="u.isActive" class="btn btn-ghost btn-sm" (click)="toggleUser(u)" style="color:#f97316;">Disable</button>
                    <button *ngIf="!u.isActive" class="btn btn-ghost btn-sm" (click)="toggleUser(u)" style="color:#22c55e;">Enable</button>
                  </td>
                </tr>
                <tr *ngIf="!platformUsers.length"><td colspan="6" style="padding:32px;text-align:center;color:var(--text-3,#888);">No users found.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  `
})
export class PlatformAdminComponent implements OnInit {
  tab = 'overview';
  navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'tenants',  icon: '🏢', label: 'Tenants' },
    { id: 'users',    icon: '👥', label: 'Users' },
  ];

  kpis: any[] = [];
  tenants: any[] = [];
  platformUsers: any[] = [];

  tenantSearch = ''; tenantStatus = ''; tenantPlan = '';
  userSearch = '';
  showCreate = false;
  createError = '';

  newTenant = {
    companyName: '', industry: '', adminEmail: '', adminPassword: '',
    adminFirstName: '', adminLastName: '', subscriptionPlan: 'Free', employeeCount: 0
  };

  currentUser: any = null;
  private api = `${environment.apiUrl}/api/platform`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('platform_user');
    if (!user) { this.router.navigate(['/platform-login']); return; }
    this.currentUser = JSON.parse(user);
    this.loadStats();
    this.loadTenants();
  }

  private get headers() {
    const token = localStorage.getItem('platform_token') ?? '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadStats() {
    this.http.get<any>(`${this.api}/stats`, { headers: this.headers }).subscribe(s => {
      this.kpis = [
        { label: 'Total Tenants',    value: s.totalTenants },
        { label: 'Active',           value: s.activeTenants },
        { label: 'Suspended',        value: s.suspendedTenants },
        { label: 'Total Users',      value: s.totalUsers },
        { label: 'New This Month',   value: s.newThisMonth },
        { label: 'Paid Plans',       value: s.paidTenants },
      ];
    });
  }

  loadTenants() {
    const params = new URLSearchParams();
    if (this.tenantSearch) params.set('search', this.tenantSearch);
    if (this.tenantStatus) params.set('status', this.tenantStatus);
    if (this.tenantPlan)   params.set('plan', this.tenantPlan);
    this.http.get<any[]>(`${this.api}/tenants?${params}`, { headers: this.headers })
      .subscribe(t => this.tenants = t);
  }

  loadUsers() {
    const params = new URLSearchParams();
    if (this.userSearch) params.set('search', this.userSearch);
    this.http.get<any[]>(`${this.api}/users?${params}`, { headers: this.headers })
      .subscribe(u => this.platformUsers = u);
  }

  createTenant() {
    this.createError = '';
    const body = {
      companyName:    this.newTenant.companyName,
      industry:       this.newTenant.industry,
      adminEmail:     this.newTenant.adminEmail,
      adminPassword:  this.newTenant.adminPassword,
      adminFirstName: this.newTenant.adminFirstName,
      adminLastName:  this.newTenant.adminLastName,
      subscriptionPlan: this.newTenant.subscriptionPlan,
      employeeCount:  this.newTenant.employeeCount
    };
    this.http.post<any>(`${this.api}/tenants`, body, { headers: this.headers }).subscribe({
      next: () => {
        this.showCreate = false;
        this.newTenant = { companyName:'',industry:'',adminEmail:'',adminPassword:'',adminFirstName:'',adminLastName:'',subscriptionPlan:'Free',employeeCount:0 };
        this.loadTenants(); this.loadStats();
      },
      error: err => this.createError = err.error?.error ?? err.error?.errors?.[0] ?? 'Failed to create tenant.'
    });
  }

  suspendTenant(t: any) {
    this.http.patch(`${this.api}/tenants/${t.id}/status`, { isActive: false }, { headers: this.headers })
      .subscribe(() => { t.isActive = false; });
  }

  activateTenant(t: any) {
    this.http.patch(`${this.api}/tenants/${t.id}/status`, { isActive: true }, { headers: this.headers })
      .subscribe(() => { t.isActive = true; });
  }

  toggleUser(u: any) {
    this.http.patch(`${this.api}/users/${u.id}/status`, { isActive: !u.isActive }, { headers: this.headers })
      .subscribe(() => { u.isActive = !u.isActive; });
  }

  planColor(plan: string) {
    return plan === 'Enterprise' ? 'rgba(139,92,246,.2)' : plan === 'Growth' ? 'rgba(34,197,94,.15)' : 'rgba(156,163,175,.15)';
  }

  logout() {
    localStorage.removeItem('platform_token');
    localStorage.removeItem('platform_user');
    this.router.navigate(['/platform-login']);
  }
}
