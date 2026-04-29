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
            <input class="apps-search-input" placeholder="Search apps..."
              [value]="appSearch" (input)="onAppSearch($event)">
          </div>

          <!-- Recent Apps -->
          <div class="apps-section" *ngIf="!appSearch">
            <div class="apps-section-title">Recent Apps</div>
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

          <!-- All Apps / Search Results -->
          <div class="apps-section">
            <div class="apps-section-title">{{ appSearch ? 'Results' : 'All Apps' }}</div>
            <div class="apps-grid">
              <a *ngFor="let item of filteredApps"
                [routerLink]="item.path"
                routerLinkActive="active"
                class="app-tile"
                [title]="item.label">
                <div class="app-tile-icon" [style.background]="item.color">{{ item.symbol }}</div>
                <span class="app-tile-label">{{ item.shortLabel || item.label }}</span>
              </a>
            </div>
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
    .login-screen {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      position: relative;
      background: linear-gradient(120deg, #20d4e8 0%, #0798ef 46%, #1255df 100%);
    }
    .login-art {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 24px 44px;
      background: transparent;
      color: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .login-art::before,
    .login-art::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
    }
    .login-art::before {
      width: 720px;
      height: 720px;
      left: -180px;
      bottom: -260px;
    }
    .login-art::after {
      width: 260px;
      height: 260px;
      right: 180px;
      top: 210px;
    }
    .brand-lockup, .login-panel-header {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-lockup {
      position: absolute;
      top: 40px;
      left: 44px;
      z-index: 2;
    }
    .login-logo-white {
      width: 150px;
      height: auto;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.95);
      padding: 14px;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.16);
    }
    .login-logo-black {
      width: 158px;
      height: auto;
      margin: 0 auto 14px;
      display: block;
      border-radius: 16px;
      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.14);
    }
    .brand-mark, .sidebar-logo {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: #111827;
      color: #fff;
      font-weight: 800;
      letter-spacing: 0;
    }
    .brand-name {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0;
    }
    .brand-subtitle {
      font-size: 11px;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
      letter-spacing: 2px;
    }
    .login-art h1 {
      max-width: 620px;
      font-size: 38px;
      line-height: 1.05;
      margin: 360px 0 14px;
      position: relative;
      z-index: 2;
    }
    .login-art p {
      max-width: 540px;
      color: #cbd5e1;
      font-size: 16px;
      position: relative;
      z-index: 2;
    }
    .circuit-logo {
      position: absolute;
      top: 128px;
      left: min(24vw, 420px);
      width: 450px;
      height: 285px;
      filter: drop-shadow(0 20px 60px rgba(124, 58, 237, 0.35));
      z-index: 1;
    }
    .panel {
      position: absolute;
      width: 235px;
      height: 170px;
      border: 2px solid rgba(103, 232, 249, 0.6);
      background: linear-gradient(135deg, rgba(126, 34, 206, 0.74), rgba(29, 78, 216, 0.52));
      transform: skewY(16deg);
    }
    .panel-back { left: 175px; top: 18px; }
    .panel-front { left: 70px; top: 82px; border-color: rgba(37, 99, 235, 0.7); }
    .wire {
      position: absolute;
      height: 8px;
      border-radius: 999px;
      background: linear-gradient(90deg, #22d3ee, #8b5cf6);
      transform-origin: left center;
    }
    .wire-a { width: 380px; left: 20px; top: 150px; transform: rotate(16deg); }
    .wire-b { width: 270px; left: 110px; top: 172px; transform: rotate(-14deg); background: linear-gradient(90deg, #67e8f9, #60a5fa); }
    .wire-c { width: 245px; left: 190px; top: 112px; transform: rotate(17deg); background: linear-gradient(90deg, #c084fc, #2563eb); }
    .node {
      position: absolute;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #67e8f9;
      box-shadow: 0 0 24px currentColor;
    }
    .n1 { left: 12px; top: 132px; background: #c084fc; }
    .n2 { left: 258px; top: 134px; }
    .n3 { left: 195px; top: 208px; background: #60a5fa; }
    .n4 { left: 370px; top: 121px; }
    .login-panel {
      position: absolute;
      right: 72px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      border-radius: 10px;
      width: 390px;
      max-height: calc(100vh - 48px);
      overflow: auto;
      padding: 28px 34px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 11px;
      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.28);
      z-index: 5;
    }
    .login-panel h2 {
      margin: 0;
      font-size: 27px;
      text-align: center;
    }
    .panel-subtitle {
      margin: 4px 0 0;
      color: #64748b;
      text-align: center;
    }
    .role-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin: 12px 0 4px;
    }
    .role-tabs button {
      border: 1px solid #dbe2ea;
      background: #f8fafc;
      border-radius: 8px;
      padding: 9px;
      cursor: pointer;
      font-weight: 700;
      color: #334155;
    }
    .role-tabs button.active {
      border-color: #7048e8;
      color: #4f32d6;
      background: #f1edff;
    }
    .login-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 4px;
      border-radius: 8px;
    }
    .login-panel .input {
      width: 100%;
      min-height: 48px;
      font-size: 15px;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1.5px solid #dde2ef;
      box-sizing: border-box;
    }
    .login-error {
      color: #dc2626;
      font-size: 13px;
    }
    .credential-hint {
      display: grid;
      gap: 4px;
      margin-top: 8px;
      font-size: 12px;
      color: #64748b;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
    }
    .login-panel label {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }
    .nav-symbol {
      width: 22px;
      min-width: 22px;
      font-size: 12px;
      font-weight: 800;
      color: #64748b;
    }
    .user-menu-header { padding: 12px 16px; }
    .user-menu-name { font-weight: 700; font-size: 14px; color: var(--text); }
    .user-menu-email { font-size: 12px; color: var(--text-3); margin-top: 2px; }
    .btn-sm { height: 28px; font-size: 12px; padding: 0 12px; }
    @media (max-width: 900px) {
      .login-screen {
        height: auto;
        min-height: 100vh;
        overflow: auto;
      }
      .login-art {
        min-height: 100vh;
        padding: 24px;
      }
      .brand-lockup {
        left: 24px;
        top: 24px;
      }
      .login-art h1 {
        margin-top: 250px;
        font-size: 30px;
      }
      .login-art p {
        max-width: 360px;
      }
      .circuit-logo {
        left: 0;
        top: 100px;
        transform: scale(.62);
        transform-origin: top left;
      }
      .login-panel {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        width: auto;
        margin: 24px;
        padding: 28px;
        max-height: none;
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
    { path: '/dashboard',           label: 'Dashboard',           shortLabel: 'Dashboard',  symbol: 'D',  color: '#292966', adminOnly: false },
    { path: '/vendors',             label: 'Vendors',             shortLabel: 'Vendors',    symbol: 'V',  color: '#22a3d2', adminOnly: false },
    { path: '/budget',              label: 'Budget Vs Forecasting', shortLabel: 'Budget VF',  symbol: '💰', color: '#059669', adminOnly: false },
    { path: '/recruiters',          label: 'Recruiters',          shortLabel: 'Recruiters', symbol: 'R',  color: '#6b4df0', adminOnly: false },
    { path: '/cv-database',         label: 'CV Database',         shortLabel: 'CV DB',      symbol: 'CV', color: '#5C5C99', adminOnly: false },
    { path: '/pipeline-board',      label: 'Pipeline Board',      shortLabel: 'Pipeline',   symbol: 'PB', color: '#a94ee6', adminOnly: false },
    { path: '/requisitions',        label: 'Requisitions',        shortLabel: 'Reqs',       symbol: 'RQ', color: '#e8912a', adminOnly: false },
    { path: '/interview-scheduler', label: 'Interview Scheduler', shortLabel: 'Interviews', symbol: 'IS', color: '#2563eb', adminOnly: false },
    { path: '/offer-management',    label: 'Offer Management',    shortLabel: 'Offers',     symbol: 'OM', color: '#5C5C99', adminOnly: false },
    { path: '/talent-pool',         label: 'Talent Pool',         shortLabel: 'Talent',     symbol: 'TP', color: '#c56bff', adminOnly: false },
    { path: '/source-tracking',     label: 'Source Tracking',     shortLabel: 'Sources',    symbol: 'ST', color: '#3bbdea', adminOnly: false },
    { path: '/sla-dashboard',       label: 'SLA Dashboard',       shortLabel: 'SLA',        symbol: 'SL', color: '#dc2626', adminOnly: false },
    { path: '/reports',             label: 'Reports',             shortLabel: 'Reports',    symbol: '📊', color: '#0f766e', adminOnly: false },
    { path: '/internal-job-postings', label: 'Internal Job Postings', shortLabel: 'Int. Jobs', symbol: '📌', color: '#b45309', adminOnly: false },
    { path: '/resume-parser',       label: 'Resume Parser',       shortLabel: 'Resume',     symbol: 'RP', color: '#6b4df0', adminOnly: false },
    { path: '/ai-scorecard',        label: 'AI Scorecard',        shortLabel: 'AI Score',   symbol: 'AS', color: '#a94ee6', adminOnly: false },
    { path: '/dropout-predictor',   label: 'Dropout Predictor',   shortLabel: 'Dropout',    symbol: 'DR', color: '#dc2626', adminOnly: false },
    { path: '/competency-ranker',   label: 'Competency Ranker',   shortLabel: 'Competency', symbol: 'CR', color: '#16a34a', adminOnly: false },
    { path: '/jd-checker',          label: 'JD Checker',          shortLabel: 'JD Check',   symbol: 'JD', color: '#e8912a', adminOnly: false },
    { path: '/jd-generator',        label: 'JD Generator',        shortLabel: 'JD Gen',     symbol: 'JG', color: '#22a3d2', adminOnly: false },
    { path: '/import-center',        label: 'Import Center',       shortLabel: 'Import',     symbol: '📥', color: '#0891b2', adminOnly: false },
    { path: '/users',               label: 'Users & Access',      shortLabel: 'Users',      symbol: 'UA', color: '#343a48', adminOnly: true  },
    { path: '/compliance',          label: 'Compliance',          shortLabel: 'Compliance', symbol: 'CO', color: '#5C5C99', adminOnly: true  },
  ];

  recentApps: any[] = [];
  filteredApps: any[] = [];
  appSearch = '';

  /* kept for updatePageTitle() */
  coreNav = this.allApps.filter(a => !a.adminOnly).slice(0, 12);
  aiNav   = this.allApps.slice(12, 18);
  adminNav = this.allApps.filter(a => a.adminOnly);

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
      '/dashboard':           { title: 'Dashboard',           breadcrumb: 'Home / Dashboard' },
      '/vendors':             { title: 'Vendors',             breadcrumb: 'Home / Vendors' },
      '/budget':              { title: 'Budget Vs Forecasting', breadcrumb: 'Home / Budget Vs Forecasting' },
      '/recruiters':          { title: 'Recruiters',          breadcrumb: 'Home / Recruiters' },
      '/cv-database':         { title: 'CV Database',         breadcrumb: 'Home / CV Search' },
      '/pipeline-board':      { title: 'Pipeline Board',      breadcrumb: 'Core / Pipeline Board' },
      '/requisitions':        { title: 'Requisitions',        breadcrumb: 'Core / Requisitions' },
      '/candidate-portal':    { title: 'Candidate Portal',    breadcrumb: 'Core / Candidate Portal' },
      '/interview-scheduler': { title: 'Interview Scheduler', breadcrumb: 'Core / Interview Scheduler' },
      '/offer-management':    { title: 'Offer Management',    breadcrumb: 'Core / Offer Management' },
      '/talent-pool':         { title: 'Talent Pool',         breadcrumb: 'Core / Talent Pool' },
      '/source-tracking':     { title: 'Source Tracking',     breadcrumb: 'Core / Source Tracking' },
      '/sla-dashboard':       { title: 'SLA Dashboard',       breadcrumb: 'Core / SLA Dashboard' },
      // AI Tools
      '/resume-parser':       { title: 'Resume Parser',       breadcrumb: 'AI Tools / Resume Parser' },
      '/ai-scorecard':        { title: 'AI Scorecard',        breadcrumb: 'AI Tools / AI Scorecard' },
      '/dropout-predictor':   { title: 'Dropout Predictor',   breadcrumb: 'AI Tools / Dropout Predictor' },
      '/competency-ranker':   { title: 'Competency Ranker',   breadcrumb: 'AI Tools / Competency Ranker' },
      '/jd-checker':          { title: 'JD Checker',          breadcrumb: 'AI Tools / JD Checker' },
      '/jd-generator':        { title: 'JD Generator',        breadcrumb: 'AI Tools / JD Generator' },
      // Admin
      '/users':               { title: 'Users & Access',      breadcrumb: 'Admin / Users' },
      '/compliance':          { title: 'Compliance',          breadcrumb: 'Admin / Compliance' },
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
