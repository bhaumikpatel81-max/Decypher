import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CurrentUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <section class="login-screen" *ngIf="!isAuthenticated">
      <div class="login-art">
        <div class="brand-lockup">
          <img class="login-logo-white" src="assets/images/Decypher%20logo-%20white.png" alt="Decypher">
        </div>
        <div class="circuit-logo" aria-hidden="true">
          <div class="panel panel-back"></div>
          <div class="panel panel-front"></div>
          <div class="wire wire-a"></div>
          <div class="wire wire-b"></div>
          <div class="wire wire-c"></div>
          <span class="node n1"></span>
          <span class="node n2"></span>
          <span class="node n3"></span>
          <span class="node n4"></span>
        </div>
        <h1>Decypher - The Command Center for Smarter Hiring</h1>
        <p>Centralize your hiring, gain real-time insights, and make faster, smarter decisions.</p>
      </div>

      <form class="login-panel" (ngSubmit)="login()">
        <div class="login-panel-header">
          <img class="login-logo-black" src="assets/images/Decypher%20logo-%20black.png" alt="Decypher">
        </div>
        <h2>Welcome back</h2>
        <p class="panel-subtitle">Choose your login structure</p>

        <div class="role-tabs">
          <button type="button" [class.active]="selectedLogin === 'super'" (click)="usePreset('super')">Super Admin</button>
          <button type="button" [class.active]="selectedLogin === 'team'" (click)="usePreset('team')">Team User</button>
          <button type="button" [class.active]="selectedLogin === 'guest'" (click)="guestLogin()">Guest Login</button>
        </div>

        <label>Email</label>
        <input class="input" name="email" [(ngModel)]="email" type="email" autocomplete="email">

        <label>Password</label>
        <input class="input" name="password" [(ngModel)]="password" type="password" autocomplete="current-password">

        <div class="login-error" *ngIf="loginError">{{ loginError }}</div>

        <button class="btn btn-primary login-btn" type="submit">Sign in</button>

        <div class="credential-hint">
          <strong>Demo credentials</strong>
          <span>Super Admin: admin&#64;decypher.app / Admin&#64;2024</span>
          <span>Recruiter: recruiter&#64;decypher.app / Recruiter&#64;2024</span>
        </div>
      </form>
    </section>

    <div class="app-container" *ngIf="isAuthenticated">
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="sidebar-header">
          <div class="sidebar-logo">D</div>
          <div class="sidebar-brand">
            <div class="sidebar-brand-name">Decypher</div>
            <div class="sidebar-brand-tagline">Recruitment Intelligence</div>
          </div>
        </div>

        <nav class="sidebar-nav">
          <!-- Search -->
          <div class="apps-search-wrap">
            <input class="apps-search-input" placeholder="Search modules..."
              [value]="appSearch" (input)="onAppSearch($event)">
          </div>

          <!-- Recent Modules -->
          <div class="apps-section" *ngIf="!appSearch && !sidebarCollapsed">
            <div class="apps-section-title">Recent</div>
            <div class="apps-grid">
              <a *ngFor="let item of recentApps"
                [routerLink]="item.path"
                routerLinkActive="active"
                class="app-tile"
                [title]="item.label">
                <div class="app-tile-icon" [style.background]="item.color">{{ item.symbol }}</div>
                <span class="app-tile-label">{{ item.shortLabel || item.label }}</span>
              </a>
            </div>
          </div>

          <!-- All Modules / Search Results -->
          <div class="apps-section">
            <div class="apps-section-title">{{ appSearch ? 'Results' : 'All Modules' }}</div>

            <!-- Collapsed sidebar: flat icon list -->
            <div class="apps-grid" *ngIf="sidebarCollapsed">
              <a *ngFor="let item of filteredApps"
                [routerLink]="item.path"
                routerLinkActive="active"
                class="app-tile"
                [title]="item.label">
                <div class="app-tile-icon" [style.background]="item.color">{{ item.symbol }}</div>
                <span class="app-tile-label">{{ item.shortLabel || item.label }}</span>
              </a>
            </div>

            <!-- Expanded + search: flat results -->
            <div class="apps-grid" *ngIf="!sidebarCollapsed && appSearch">
              <a *ngFor="let item of filteredApps"
                [routerLink]="item.path"
                routerLinkActive="active"
                class="app-tile"
                [title]="item.label">
                <div class="app-tile-icon" [style.background]="item.color">{{ item.symbol }}</div>
                <span class="app-tile-label">{{ item.shortLabel || item.label }}</span>
              </a>
            </div>

            <!-- Expanded + no search: grouped view -->
            <ng-container *ngIf="!sidebarCollapsed && !appSearch">
              <!-- Dashboard pinned -->
              <a routerLink="/dashboard" routerLinkActive="active" class="module-pinned-tile" title="Dashboard">
                <div class="app-tile-icon" style="background:#292966">D</div>
                <span class="app-tile-label">Dashboard</span>
              </a>

              <!-- Collapsible groups -->
              <div *ngFor="let group of visibleModuleGroups" class="module-group">
                <div class="module-group-header" (click)="toggleGroup(group.id)">
                  <div class="module-group-icon" [style.background]="group.color">{{ group.symbol }}</div>
                  <span class="module-group-label">{{ group.label }}</span>
                  <span class="module-group-count">{{ group.modules.length }}</span>
                  <span class="module-group-arrow" [class.open]="group.expanded">&#8250;</span>
                </div>
                <div class="module-group-tiles" [class.open]="group.expanded">
                  <div class="apps-grid">
                    <a *ngFor="let item of group.modules"
                      [routerLink]="item.path"
                      routerLinkActive="active"
                      class="app-tile"
                      [title]="item.label">
                      <div class="app-tile-icon" [style.background]="item.color">{{ item.symbol }}</div>
                      <span class="app-tile-label">{{ item.shortLabel || item.label }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-ai-assist">
            <div class="sidebar-ai-assist-header">
              <span class="nav-symbol">AI</span>
              <div class="sidebar-ai-assist-kicker">AI ASSIST</div>
            </div>
            <div class="sidebar-ai-assist-content">{{ insightText }}</div>
            <button class="btn btn-primary btn-sm" routerLink="/dropout-predictor">View insights</button>
          </div>
          <button class="sidebar-collapse-btn" (click)="toggleSidebar()">&#x2039;&#x203A;</button>
        </div>
      </aside>

      <div class="main-content" [class.sidebar-collapsed]="sidebarCollapsed">
        <header class="topbar">
          <div class="topbar-left">
            <h1 class="topbar-title">{{ currentPageTitle }}</h1>
            <div class="topbar-breadcrumb">{{ currentBreadcrumb }}</div>
          </div>
          <div class="topbar-center">
            <div class="topbar-search">
              <span class="topbar-search-icon">/</span>
              <input class="topbar-search-input" placeholder="Search candidates, vendors, skills..." (keyup.enter)="globalSearch($event)">
            </div>
          </div>
          <div class="topbar-right">
            <div class="topbar-date-picker">Last 30 days</div>
            <button class="btn btn-ghost btn-sm" type="button" (click)="logout()">Logout</button>
            <div class="topbar-avatar" [matMenuTriggerFor]="userMenu">{{ currentUser?.initials }}</div>
            <mat-menu #userMenu="matMenu">
              <div class="user-menu-header">
                <div class="user-menu-name">{{ currentUser?.fullName }}</div>
                <div class="user-menu-email">{{ currentUser?.email }}</div>
                <div class="chip chip-brand" style="margin-top: 8px;">{{ currentUser?.role }}</div>
              </div>
              <mat-divider></mat-divider>
              <button mat-menu-item routerLink="/users" *ngIf="canAccessAdmin">Users & Access</button>
              <button mat-menu-item (click)="logout()">Logout</button>
            </mat-menu>
          </div>
        </header>

        <div class="page-container page-enter">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ===== LOGIN SCREEN – two-column flex layout ===== */
    .login-screen {
      height: 100vh;
      width: 100vw;
      display: flex;
      overflow: hidden;
    }

    /* ---- Left: art / brand column ---- */
    .login-art {
      flex: 1;
      min-width: 0;
      padding: 44px 52px 52px;
      background: linear-gradient(125deg, #1ae3f4 0%, #0798ef 45%, #1255df 100%);
      color: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .login-art::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 720px;
      height: 720px;
      left: -180px;
      bottom: -260px;
      background: rgba(255,255,255,0.07);
    }
    .login-art::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 260px;
      height: 260px;
      right: 100px;
      top: 180px;
      background: rgba(255,255,255,0.06);
    }
    .brand-lockup {
      display: flex;
      align-items: center;
      gap: 14px;
      position: relative;
      z-index: 2;
    }
    .login-logo-white {
      width: 130px;
      height: auto;
      border-radius: 16px;
      background: rgba(255,255,255,0.95);
      padding: 12px;
      box-shadow: 0 14px 40px rgba(15,23,42,0.18);
    }
    .circuit-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-46%, -58%);
      width: 440px;
      height: 280px;
      filter: drop-shadow(0 20px 60px rgba(124,58,237,0.4));
      z-index: 1;
    }
    .panel {
      position: absolute;
      width: 235px;
      height: 170px;
      border: 2px solid rgba(103,232,249,0.6);
      background: linear-gradient(135deg, rgba(126,34,206,0.74), rgba(29,78,216,0.52));
      transform: skewY(16deg);
    }
    .panel-back  { left: 175px; top: 18px; }
    .panel-front { left: 70px;  top: 82px; border-color: rgba(37,99,235,0.7); }
    .wire {
      position: absolute;
      height: 8px;
      border-radius: 999px;
      background: linear-gradient(90deg, #22d3ee, #8b5cf6);
      transform-origin: left center;
    }
    .wire-a { width: 380px; left: 20px;  top: 150px; transform: rotate(16deg); }
    .wire-b { width: 270px; left: 110px; top: 172px; transform: rotate(-14deg); background: linear-gradient(90deg,#67e8f9,#60a5fa); }
    .wire-c { width: 245px; left: 190px; top: 112px; transform: rotate(17deg);  background: linear-gradient(90deg,#c084fc,#2563eb); }
    .node {
      position: absolute;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #67e8f9;
      box-shadow: 0 0 24px currentColor;
    }
    .n1 { left: 12px;  top: 132px; background: #c084fc; }
    .n2 { left: 258px; top: 134px; }
    .n3 { left: 195px; top: 208px; background: #60a5fa; }
    .n4 { left: 370px; top: 121px; }
    .login-art h1 {
      max-width: 560px;
      font-size: 36px;
      font-weight: 800;
      line-height: 1.1;
      margin: auto 0 16px;
      position: relative;
      z-index: 2;
    }
    .login-art > p {
      max-width: 500px;
      color: rgba(255,255,255,0.8);
      font-size: 16px;
      line-height: 1.65;
      position: relative;
      z-index: 2;
      margin: 0;
    }

    /* ---- Right: login panel column ---- */
    .login-panel {
      width: 440px;
      min-width: 440px;
      background: #fff;
      overflow-y: auto;
      padding: 52px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
      box-shadow: -20px 0 80px rgba(15,23,42,0.18);
      position: relative;
      z-index: 5;
    }
    .login-panel-header {
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    }
    .login-logo-black {
      width: 140px;
      height: auto;
      display: block;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(15,23,42,0.1);
    }
    .login-panel h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 800;
      text-align: center;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .panel-subtitle {
      margin: 0;
      color: #64748b;
      text-align: center;
      font-size: 14px;
    }

    /* Role tabs – segmented control style */
    .role-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      margin: 4px 0;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 4px;
    }
    .role-tabs button {
      border: none;
      background: transparent;
      border-radius: 7px;
      padding: 10px 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      color: #64748b;
      transition: all 0.15s ease;
    }
    .role-tabs button.active {
      background: #fff;
      color: #5b21b6;
      box-shadow: 0 2px 8px rgba(91,33,182,0.15);
      font-weight: 700;
    }
    .role-tabs button:hover:not(.active) {
      color: #334155;
    }

    /* Form fields */
    .login-panel label {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      margin-bottom: -4px;
    }
    .login-panel .input {
      width: 100%;
      height: 50px;
      font-size: 15px;
      padding: 0 16px;
      border-radius: 10px;
      border: 1.5px solid #e2e8f0;
      box-sizing: border-box;
      outline: none;
      color: #0f172a;
      background: #fafafa;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    }
    .login-panel .input:focus {
      border-color: #7c3aed;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
    }

    /* Error */
    .login-error {
      color: #b91c1c;
      font-size: 13px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 10px 14px;
      margin: 0;
    }

    /* Sign-in button */
    .login-btn {
      width: 100%;
      height: 52px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
      color: #fff !important;
      box-shadow: 0 6px 22px rgba(124,58,237,0.35);
      transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
      margin-top: 4px;
    }
    .login-btn:hover {
      background: linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%);
      box-shadow: 0 10px 30px rgba(124,58,237,0.45);
      transform: translateY(-1px);
    }
    .login-btn:active {
      transform: translateY(0);
      box-shadow: 0 4px 14px rgba(124,58,237,0.3);
    }

    /* Demo credentials */
    .credential-hint {
      display: grid;
      gap: 5px;
      font-size: 12px;
      color: #64748b;
      background: #f8fafc;
      border: 1px solid #e8edf5;
      border-radius: 10px;
      padding: 12px 14px;
      margin-top: 2px;
    }
    .credential-hint strong {
      color: #475569;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 2px;
    }

    /* Sidebar / topbar shared styles */
    .brand-mark, .sidebar-logo {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: #111827;
      color: #fff;
      font-weight: 800;
    }
    .nav-symbol {
      width: 22px;
      min-width: 22px;
      font-size: 12px;
      font-weight: 800;
      color: #64748b;
    }
    .user-menu-header { padding: 12px 16px; }
    .user-menu-name  { font-weight: 700; font-size: 14px; color: var(--text); }
    .user-menu-email { font-size: 12px; color: var(--text-3); margin-top: 2px; }
    .btn-sm { height: 28px; font-size: 12px; padding: 0 12px; }

    /* ---- Mobile ---- */
    @media (max-width: 900px) {
      .login-screen {
        flex-direction: column;
        height: auto;
        min-height: 100vh;
        overflow: auto;
      }
      .login-art {
        min-height: 340px;
        padding: 32px 28px 44px;
      }
      .circuit-logo {
        transform: translate(-46%, -60%) scale(0.6);
      }
      .login-art h1 {
        font-size: 26px;
      }
      .login-panel {
        width: 100%;
        min-width: 0;
        padding: 36px 28px 44px;
        box-shadow: none;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  sidebarCollapsed = false;
  isAuthenticated = false;
  currentUser: CurrentUser | null = null;
  currentPageTitle = 'Dashboard';
  currentBreadcrumb = 'Home / Dashboard';
  canAccessAdmin = false;
  email = 'admin@decypher.app';
  password = 'Admin@2024';
  selectedLogin = 'super';
  loginError = '';
  insightText = 'Live pipeline risk is calculated from current candidate records.';

  allApps = [
    { path: '/dashboard',             label: 'Dashboard',            shortLabel: 'Dashboard',            symbol: 'D',  color: '#292966', adminOnly: false },
    { path: '/vendors',               label: 'Vendor Management',    shortLabel: 'Vendor Management',    symbol: 'V',  color: '#22a3d2', adminOnly: false },
    { path: '/budget',                label: 'Budget & Forecasting', shortLabel: 'Budget & Forecasting', symbol: '💰', color: '#059669', adminOnly: false },
    { path: '/recruiters',            label: 'Recruiter Performance',shortLabel: 'Recruiter Performance',symbol: 'R',  color: '#6b4df0', adminOnly: false },
    { path: '/cv-database',           label: 'Talent Database',      shortLabel: 'Talent Database',      symbol: 'CV', color: '#5C5C99', adminOnly: false },
    { path: '/pipeline-board',        label: 'Pipeline Board',       shortLabel: 'Pipeline Board',       symbol: 'PB', color: '#a94ee6', adminOnly: false },
    { path: '/requisitions',          label: 'Requisitions',         shortLabel: 'Requisitions',         symbol: 'RQ', color: '#e8912a', adminOnly: false },
    { path: '/job-broadcasting',      label: 'Job Broadcasting',     shortLabel: 'Job Broadcasting',     symbol: 'JB', color: '#7c3aed', adminOnly: false },
    { path: '/interview-scheduler',   label: 'Interview Scheduler',  shortLabel: 'Interview Scheduler',  symbol: 'IS', color: '#2563eb', adminOnly: false },
    { path: '/video-interviews',      label: 'Video Interviews',     shortLabel: 'Video Interviews',     symbol: 'VI', color: '#db2777', adminOnly: false },
    { path: '/offer-management',      label: 'Offer Management',     shortLabel: 'Offer Management',     symbol: 'OM', color: '#5C5C99', adminOnly: false },
    { path: '/onboarding',            label: 'Onboarding',           shortLabel: 'Onboarding',           symbol: 'OB', color: '#10b981', adminOnly: false },
    { path: '/talent-pool',           label: 'Talent Pool',          shortLabel: 'Talent Pool',          symbol: 'TP', color: '#c56bff', adminOnly: false },
    { path: '/communications',        label: 'Communications',       shortLabel: 'Communications',       symbol: 'CM', color: '#0891b2', adminOnly: false },
    { path: '/integrations',           label: 'Integrations Hub',     shortLabel: 'Integrations Hub',     symbol: '🔌', color: '#059669', adminOnly: false },
    { path: '/source-tracking',       label: 'Source Tracking',      shortLabel: 'Source Tracking',      symbol: 'ST', color: '#3bbdea', adminOnly: false },
    { path: '/sla-dashboard',         label: 'SLA Dashboard',        shortLabel: 'SLA Dashboard',        symbol: 'SL', color: '#dc2626', adminOnly: false },
    { path: '/reports',               label: 'Reports & Analytics',  shortLabel: 'Reports & Analytics',  symbol: '📊', color: '#0f766e', adminOnly: false },
    { path: '/internal-job-postings', label: 'Internal Mobility',    shortLabel: 'Internal Mobility',    symbol: '📌', color: '#b45309', adminOnly: false },
    { path: '/resume-parser',         label: 'Resume Parser',        shortLabel: 'Resume Parser',        symbol: 'RP', color: '#6b4df0', adminOnly: false },
    { path: '/ai-scorecard',          label: 'AI Scorecard',         shortLabel: 'AI Scorecard',         symbol: 'AS', color: '#a94ee6', adminOnly: false },
    { path: '/dropout-predictor',     label: 'Attrition Risk',       shortLabel: 'Attrition Risk',       symbol: 'DR', color: '#dc2626', adminOnly: false },
    { path: '/competency-ranker',     label: 'Competency Ranker',    shortLabel: 'Competency Ranker',    symbol: 'CR', color: '#16a34a', adminOnly: false },
    { path: '/jd-checker',            label: 'JD Analyzer',          shortLabel: 'JD Analyzer',          symbol: 'JD', color: '#e8912a', adminOnly: false },
    { path: '/jd-generator',          label: 'JD Generator',         shortLabel: 'JD Generator',         symbol: 'JG', color: '#22a3d2', adminOnly: false },
    { path: '/import-center',         label: 'Import Center',        shortLabel: 'Import Center',        symbol: '📥', color: '#0891b2', adminOnly: false },
    { path: '/users',                 label: 'User Management',      shortLabel: 'User Management',      symbol: 'UA', color: '#343a48', adminOnly: true  },
    { path: '/compliance',            label: 'Compliance',           shortLabel: 'Compliance',           symbol: 'CO', color: '#5C5C99', adminOnly: true  },
  ];

  recentApps: any[] = [];
  filteredApps: any[] = [];
  appSearch = '';

  /* kept for updatePageTitle() */
  coreNav = this.allApps.filter(a => !a.adminOnly).slice(0, 12);
  aiNav   = this.allApps.slice(12, 18);
  adminNav = this.allApps.filter(a => a.adminOnly);

  private readonly groupDefs = [
    {
      id: 'recruitment',
      label: 'Recruitment',
      symbol: 'RE',
      color: '#2563eb',
      paths: ['/requisitions', '/job-broadcasting', '/cv-database', '/pipeline-board',
              '/interview-scheduler', '/video-interviews', '/offer-management', '/source-tracking']
    },
    {
      id: 'talent',
      label: 'Talent & Engagement',
      symbol: 'TE',
      color: '#10b981',
      paths: ['/onboarding', '/talent-pool', '/internal-job-postings', '/communications']
    },
    {
      id: 'ai',
      label: 'AI & Intelligence',
      symbol: 'AI',
      color: '#7c3aed',
      paths: ['/resume-parser', '/ai-scorecard', '/dropout-predictor', '/competency-ranker',
              '/jd-checker', '/jd-generator']
    },
    {
      id: 'analytics',
      label: 'Analytics & Performance',
      symbol: 'AP',
      color: '#0f766e',
      paths: ['/reports', '/recruiters', '/sla-dashboard', '/budget']
    },
    {
      id: 'admin',
      label: 'Administration',
      symbol: 'AD',
      color: '#374151',
      paths: ['/vendors', '/users', '/import-center', '/integrations', '/compliance']
    }
  ];

  expandedGroups = new Set<string>(['recruitment']);

  get visibleModuleGroups() {
    return this.groupDefs
      .map(g => ({
        ...g,
        expanded: this.expandedGroups.has(g.id),
        modules: this.allApps.filter(a =>
          g.paths.includes(a.path) && (!a.adminOnly || this.canAccessAdmin)
        )
      }))
      .filter(g => g.modules.length > 0);
  }

  toggleGroup(groupId: string) {
    if (this.expandedGroups.has(groupId)) {
      this.expandedGroups.delete(groupId);
    } else {
      this.expandedGroups.add(groupId);
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
      this.canAccessAdmin = user?.role === 'SuperAdmin';
      this.refreshApps();
    });

    this.router.events.subscribe(() => {
      this.updatePageTitle();
      this.trackRecentApp();
    });

    this.refreshApps();
  }

  refreshApps() {
    const visible = this.allApps.filter(a => !a.adminOnly || this.canAccessAdmin);
    this.recentApps = visible.slice(0, 9);
    this.filteredApps = visible;
  }

  onAppSearch(event: Event) {
    this.appSearch = (event.target as HTMLInputElement).value.trim();
    const q = this.appSearch.toLowerCase();
    const visible = this.allApps.filter(a => !a.adminOnly || this.canAccessAdmin);
    this.filteredApps = q ? visible.filter(a => a.label.toLowerCase().includes(q)) : visible;
  }

  trackRecentApp() {
    const url = this.router.url.split('?')[0];
    const found = this.allApps.find(a => url.startsWith(a.path) && (!a.adminOnly || this.canAccessAdmin));
    if (!found) return;
    const list = [found, ...this.recentApps.filter(a => a.path !== found.path)].slice(0, 9);
    this.recentApps = list;
  }

  usePreset(type: string) {
    this.selectedLogin = type;
    if (type === 'super') {
      this.email = 'admin@decypher.app';
      this.password = 'Admin@2024';
    } else if (type === 'team') {
      this.email = 'recruiter@decypher.app';
      this.password = 'Recruiter@2024';
    }
  }

  login() {
    this.loginError = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.loginError = err?.error?.error || 'Login failed'
    });
  }

  guestLogin() {
    this.selectedLogin = 'guest';
    this.loginError = '';
    this.authService.guestLogin().subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.loginError = 'Guest login failed'
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  globalSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();
    if (query) {
      this.router.navigate(['/cv-database'], { queryParams: { skills: query } });
    }
  }

  updatePageTitle() {
    const titles: { [key: string]: { title: string; breadcrumb: string } } = {
      // Core
      '/dashboard':             { title: 'Dashboard',             breadcrumb: 'Home / Dashboard' },
      '/vendors':               { title: 'Vendor Management',     breadcrumb: 'Home / Vendor Management' },
      '/budget':                { title: 'Budget & Forecasting',  breadcrumb: 'Home / Budget & Forecasting' },
      '/recruiters':            { title: 'Recruiter Performance', breadcrumb: 'Home / Recruiter Performance' },
      '/cv-database':           { title: 'Talent Database',       breadcrumb: 'Home / Talent Database' },
      '/pipeline-board':        { title: 'Pipeline Board',        breadcrumb: 'Core / Pipeline Board' },
      '/requisitions':          { title: 'Requisitions',          breadcrumb: 'Core / Requisitions' },
      '/job-broadcasting':      { title: 'Job Broadcasting',      breadcrumb: 'Core / Job Broadcasting' },
      '/candidate-portal':      { title: 'Candidate Portal',      breadcrumb: 'Core / Candidate Portal' },
      '/interview-scheduler':   { title: 'Interview Scheduler',   breadcrumb: 'Core / Interview Scheduler' },
      '/video-interviews':      { title: 'Video Interviews',      breadcrumb: 'Core / Video Interviews' },
      '/integrations':          { title: 'Integrations Hub',      breadcrumb: 'Settings / Integrations Hub' },
      '/offer-management':      { title: 'Offer Management',      breadcrumb: 'Core / Offer Management' },
      '/onboarding':            { title: 'Onboarding',            breadcrumb: 'Core / Onboarding' },
      '/talent-pool':           { title: 'Talent Pool',           breadcrumb: 'Core / Talent Pool' },
      '/communications':        { title: 'Communications',        breadcrumb: 'Candidate Engagement / Communications' },
      '/source-tracking':       { title: 'Source Tracking',       breadcrumb: 'Core / Source Tracking' },
      '/sla-dashboard':         { title: 'SLA Dashboard',         breadcrumb: 'Core / SLA Dashboard' },
      '/reports':               { title: 'Reports & Analytics',   breadcrumb: 'Core / Reports & Analytics' },
      '/internal-job-postings': { title: 'Internal Mobility',     breadcrumb: 'Core / Internal Mobility' },
      // AI Tools
      '/resume-parser':         { title: 'Resume Parser',         breadcrumb: 'AI Tools / Resume Parser' },
      '/ai-scorecard':          { title: 'AI Scorecard',          breadcrumb: 'AI Tools / AI Scorecard' },
      '/dropout-predictor':     { title: 'Attrition Risk',        breadcrumb: 'AI Tools / Attrition Risk' },
      '/competency-ranker':     { title: 'Competency Ranker',     breadcrumb: 'AI Tools / Competency Ranker' },
      '/jd-checker':            { title: 'JD Analyzer',           breadcrumb: 'AI Tools / JD Analyzer' },
      '/jd-generator':          { title: 'JD Generator',          breadcrumb: 'AI Tools / JD Generator' },
      '/import-center':         { title: 'Import Center',         breadcrumb: 'Admin / Import Center' },
      // Admin
      '/users':                 { title: 'User Management',       breadcrumb: 'Admin / User Management' },
      '/compliance':            { title: 'Compliance',            breadcrumb: 'Admin / Compliance' },
    };
    const match = Object.keys(titles).find(key => this.router.url.startsWith(key));
    if (match) {
      this.currentPageTitle = titles[match].title;
      this.currentBreadcrumb = titles[match].breadcrumb;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
