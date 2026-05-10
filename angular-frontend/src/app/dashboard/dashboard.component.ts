import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface ModuleCard { icon: string;
  label: string;
  route: string;
  color: string;
  kpis: { label: string; value: string | number; up?: boolean }[];
  loading: boolean;
}

@Component({ selector: 'app-dashboard',
  template: `
    <section class="hrms-dash">

      <!-- ── Welcome Banner ─────────────────────────────── -->
      <div class="welcome-banner">
        <div>
          <div class="welcome-title">Good {{greeting}}, {{userName}} 👋</div>
          <div class="welcome-sub">Here's your HRMS overview for today — {{today}}</div>
        </div>
        <div class="welcome-meta">
          <div class="meta-pill" *ngFor="let p of metaPills">
            <span class="meta-icon">{{p.icon}}</span>
            <span>{{p.label}}</span>
          </div>
        </div>
      </div>

      <!-- ── Top-level KPI Strip ─────────────────────────── -->
      <div class="top-kpi-row">
        <div class="top-kpi" *ngFor="let k of topKpis">
          <div class="top-kpi-icon" [style.background]="k.color">{{k.icon}}</div>
          <div>
            <div class="top-kpi-val">{{k.value}}</div>
            <div class="top-kpi-lbl">{{k.label}}</div>
          </div>
        </div>
      </div>

      <!-- ── Module Cards Grid ───────────────────────────── -->
      <div class="modules-grid">

        <!-- Recruitment -->
        <div class="mod-card" (click)="go('/recruitment-dashboard')">
          <div class="mod-header" style="background:linear-gradient(135deg,#2563eb,#6b4df0)">
            <span class="mod-icon">🎯</span>
            <div class="mod-title">Recruitment</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="recruitLoading">{{recruit.openReqs}}</div>
              <div class="mk-lbl">Open Reqs</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="recruitLoading">{{recruit.candidates}}</div>
              <div class="mk-lbl">Candidates</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="recruitLoading">{{recruit.selectionRate}}%</div>
              <div class="mk-lbl">Selection</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{recruit.selectionRate}};--col:#6b4df0"></div>
        </div>

        <!-- Payroll -->
        <div class="mod-card" (click)="go('/payroll')">
          <div class="mod-header" style="background:linear-gradient(135deg,#059669,#0d9488)">
            <span class="mod-icon">💰</span>
            <div class="mod-title">Payroll</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="payrollLoading">{{payroll.processed}}</div>
              <div class="mk-lbl">Processed</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="payrollLoading">{{payroll.pending}}</div>
              <div class="mk-lbl">Pending</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="payrollLoading">{{payroll.totalAmount}}</div>
              <div class="mk-lbl">Total Disbursed</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{payroll.pct}};--col:#059669"></div>
        </div>

        <!-- Attendance -->
        <div class="mod-card" (click)="go('/attendance')">
          <div class="mod-header" style="background:linear-gradient(135deg,#0891b2,#3bbdea)">
            <span class="mod-icon">🕐</span>
            <div class="mod-title">Attendance</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="attendLoading">{{attend.present}}</div>
              <div class="mk-lbl">Present Today</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="attendLoading" style="color:#ef4444">{{attend.absent}}</div>
              <div class="mk-lbl">Absent</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="attendLoading" style="color:#f59e0b">{{attend.late}}</div>
              <div class="mk-lbl">Late</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{attend.pct}};--col:#3bbdea"></div>
        </div>

        <!-- Leave Management -->
        <div class="mod-card" (click)="go('/leave-management')">
          <div class="mod-header" style="background:linear-gradient(135deg,#7c3aed,#a94ee6)">
            <span class="mod-icon">🏖️</span>
            <div class="mod-title">Leave Management</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="leaveLoading" style="color:#f59e0b">{{leave.pending}}</div>
              <div class="mk-lbl">Pending</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="leaveLoading" style="color:#16a34a">{{leave.approved}}</div>
              <div class="mk-lbl">Approved</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="leaveLoading">{{leave.balance}}</div>
              <div class="mk-lbl">Avg Balance</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{leave.pct}};--col:#a94ee6"></div>
        </div>

        <!-- Employees -->
        <div class="mod-card" (click)="go('/employee-directory')">
          <div class="mod-header" style="background:linear-gradient(135deg,#dc2626,#f59e0b)">
            <span class="mod-icon">👤</span>
            <div class="mod-title">Employees</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="empLoading">{{emp.total}}</div>
              <div class="mk-lbl">Total</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="empLoading" style="color:#16a34a">{{emp.active}}</div>
              <div class="mk-lbl">Active</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="empLoading" style="color:#f59e0b">{{emp.onLeave}}</div>
              <div class="mk-lbl">On Leave</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{emp.pct}};--col:#f59e0b"></div>
        </div>

        <!-- Performance -->
        <div class="mod-card" (click)="go('/performance-reviews')">
          <div class="mod-header" style="background:linear-gradient(135deg,#ea580c,#f97316)">
            <span class="mod-icon">⭐</span>
            <div class="mod-title">Performance</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="perfLoading">{{perf.reviews}}</div>
              <div class="mk-lbl">Reviews Due</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="perfLoading" style="color:#16a34a">{{perf.completed}}</div>
              <div class="mk-lbl">Completed</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="perfLoading">{{perf.avgScore}}</div>
              <div class="mk-lbl">Avg Score</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{perf.pct}};--col:#f97316"></div>
        </div>

        <!-- Compliance -->
        <div class="mod-card" (click)="go('/compliance')">
          <div class="mod-header" style="background:linear-gradient(135deg,#374151,#6b7280)">
            <span class="mod-icon">🛡️</span>
            <div class="mod-title">Compliance</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="compLoading" style="color:#16a34a">{{comp.compliant}}</div>
              <div class="mk-lbl">Compliant</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="compLoading" style="color:#ef4444">{{comp.violations}}</div>
              <div class="mk-lbl">Violations</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="compLoading" style="color:#f59e0b">{{comp.pending}}</div>
              <div class="mk-lbl">Pending</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{comp.pct}};--col:#6b7280"></div>
        </div>

        <!-- Helpdesk -->
        <div class="mod-card" (click)="go('/helpdesk')">
          <div class="mod-header" style="background:linear-gradient(135deg,#0f766e,#14b8a6)">
            <span class="mod-icon">🎧</span>
            <div class="mod-title">Helpdesk</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="hdLoading" style="color:#ef4444">{{hd.open}}</div>
              <div class="mk-lbl">Open Tickets</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="hdLoading" style="color:#f59e0b">{{hd.inProgress}}</div>
              <div class="mk-lbl">In Progress</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="hdLoading" style="color:#16a34a">{{hd.resolved}}</div>
              <div class="mk-lbl">Resolved</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{hd.pct}};--col:#14b8a6"></div>
        </div>

        <!-- Audit Trail -->
        <div class="mod-card" (click)="go('/audit-trail')">
          <div class="mod-header" style="background:linear-gradient(135deg,#1e40af,#3b82f6)">
            <span class="mod-icon">📋</span>
            <div class="mod-title">Audit Trail</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="auditLoading">{{audit.today}}</div>
              <div class="mk-lbl">Events Today</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="auditLoading">{{audit.week}}</div>
              <div class="mk-lbl">This Week</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="auditLoading" style="color:#ef4444">{{audit.critical}}</div>
              <div class="mk-lbl">Critical</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:60;--col:#3b82f6"></div>
        </div>

        <!-- Budget -->
        <div class="mod-card" (click)="go('/budget')">
          <div class="mod-header" style="background:linear-gradient(135deg,#065f46,#059669)">
            <span class="mod-icon">💼</span>
            <div class="mod-title">Budget & Forecasting</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="budgetLoading">{{budget.utilized}}%</div>
              <div class="mk-lbl">Utilized</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="budgetLoading">{{budget.plans}}</div>
              <div class="mk-lbl">Active Plans</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="budgetLoading" [style.color]="budget.variance < 0 ? '#ef4444' : '#16a34a'">{{budget.variance >= 0 ? '+' : ''}}{{budget.variance}}%</div>
              <div class="mk-lbl">Variance</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{budget.utilized}};--col:#059669"></div>
        </div>

        <!-- Exit Management -->
        <div class="mod-card" (click)="go('/exit-management')">
          <div class="mod-header" style="background:linear-gradient(135deg,#9f1239,#e11d48)">
            <span class="mod-icon">🚪</span>
            <div class="mod-title">Exit Management</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="exitLoading" style="color:#f59e0b">{{exit.active}}</div>
              <div class="mk-lbl">Active Exits</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="exitLoading" style="color:#ef4444">{{exit.pending}}</div>
              <div class="mk-lbl">Clearance Pending</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="exitLoading" style="color:#16a34a">{{exit.completed}}</div>
              <div class="mk-lbl">Completed</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{exit.pct}};--col:#e11d48"></div>
        </div>

        <!-- Learning & Development -->
        <div class="mod-card" (click)="go('/learning-management')">
          <div class="mod-header" style="background:linear-gradient(135deg,#6d28d9,#8b5cf6)">
            <span class="mod-icon">📚</span>
            <div class="mod-title">Learning & Development</div>
            <span class="mod-arrow">→</span>
          </div>
          <div class="mod-kpis">
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="lmsLoading">{{lms.courses}}</div>
              <div class="mk-lbl">Courses</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="lmsLoading" style="color:#16a34a">{{lms.completed}}</div>
              <div class="mk-lbl">Completions</div>
            </div>
            <div class="mod-kpi">
              <div class="mk-val" [class.loading]="lmsLoading">{{lms.enrolled}}</div>
              <div class="mk-lbl">Enrolled</div>
            </div>
          </div>
          <div class="mod-progress-bar" style="--pct:{{lms.pct}};--col:#8b5cf6"></div>
        </div>

      </div>

      <!-- ── Recent Activity ──────────────────────────────── -->
      <div class="bottom-row">
        <div class="card activity-card">
          <div class="sec-title">Recent System Activity</div>
          <div class="act-list">
            <div class="act-row" *ngFor="let a of recentActivity">
              <div class="act-dot-sm" [style.background]="a.color"></div>
              <div class="act-text-sm">
                <span class="act-module">{{a.module}}</span>
                <span class="act-msg">{{a.message}}</span>
              </div>
              <span class="act-time-sm">{{a.time}}</span>
            </div>
            <div *ngIf="!recentActivity.length" class="empty-act">No recent activity</div>
          </div>
        </div>

        <div class="card quick-links-card">
          <div class="sec-title">Quick Actions</div>
          <div class="quick-grid">
            <button class="quick-btn" *ngFor="let q of quickActions" (click)="go(q.route)">
              <span class="quick-icon" [style.background]="q.color">{{q.icon}}</span>
              <span class="quick-label">{{q.label}}</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .hrms-dash { display: flex; flex-direction: column; gap: 20px; }

    /* Welcome Banner */
    .welcome-banner { background: linear-gradient(135deg, #1e1b4b, #2d1b69, #4c1d95);
      border-radius: 14px; padding: 24px 28px;
      display: flex; justify-content: space-between; align-items: center;
      color: #fff; }
    .welcome-title { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .welcome-sub { font-size: 13px; color: rgba(255,255,255,.65); }
    .welcome-meta { display: flex; gap: 10px; flex-wrap: wrap; }
    .meta-pill { display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,.12); border-radius: 20px;
      padding: 5px 12px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,.9); }
    .meta-icon { font-size: 14px; }

    /* Top KPI Strip */
    .top-kpi-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
    .top-kpi { background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;
      padding: 14px 16px; display: flex; align-items: center; gap: 12px;
      box-shadow: 0 1px 3px rgba(17,20,45,.05);
      transition: transform 160ms, box-shadow 160ms;
      cursor: default; }
    .top-kpi:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(107,77,240,.12); }
    .top-kpi-icon { width: 38px; height: 38px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px; flex-shrink: 0; }
    .top-kpi-val { font-size: 22px; font-weight: 800; color: #0f1320; line-height: 1; }
    .top-kpi-lbl { font-size: 10px; font-weight: 700; color: #6e7686; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }

    /* Module Cards Grid */
    .modules-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .mod-card { background: #fff; border: 1px solid #e1e4eb; border-radius: 14px;
      overflow: hidden; cursor: pointer;
      box-shadow: 0 1px 3px rgba(17,20,45,.05);
      transition: transform 160ms, box-shadow 160ms; }
    .mod-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(17,20,45,.1); }
    .mod-header { padding: 14px 16px; display: flex; align-items: center; gap: 10px;
      color: #fff; }
    .mod-icon { font-size: 20px; }
    .mod-title { flex: 1; font-size: 13px; font-weight: 700; }
    .mod-arrow { font-size: 16px; opacity: .7; transition: transform 160ms; }
    .mod-card:hover .mod-arrow { transform: translateX(4px); opacity: 1; }
    .mod-kpis { display: grid; grid-template-columns: repeat(3, 1fr); padding: 14px 12px 10px; gap: 4px; }
    .mod-kpi { text-align: center; }
    .mk-val { font-size: 18px; font-weight: 800; color: #0f1320; }
    .mk-val.loading { color: #d1d5db; animation: shimmer 1.4s ease-in-out infinite; }
    .mk-lbl { font-size: 9px; font-weight: 700; color: #9aa2b2; text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }
    .mod-progress-bar { height: 3px; background: #f3f4f6; margin: 0 12px 12px;
      border-radius: 99px; overflow: hidden; position: relative; }
    .mod-progress-bar::after { content: ''; position: absolute; left: 0; top: 0; height: 100%;
      width: calc(var(--pct, 0) * 1%);
      background: var(--col, #6b4df0);
      border-radius: 99px; transition: width 900ms ease-out; }

    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

    /* Bottom row */
    .bottom-row { display: grid; grid-template-columns: 1fr 320px; gap: 14px; }
    .card { background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;
      padding: 20px; box-shadow: 0 1px 3px rgba(17,20,45,.05); }
    .sec-title { font-size: 14px; font-weight: 700; color: #0f1320; margin-bottom: 14px; }

    /* Activity Feed */
    .act-list { display: flex; flex-direction: column; gap: 2px; }
    .act-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f6f7fa; }
    .act-row:last-child { border-bottom: none; }
    .act-dot-sm { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .act-text-sm { flex: 1; font-size: 13px; color: #343a48; min-width: 0; }
    .act-module { font-weight: 700; color: #6b4df0; margin-right: 6px; }
    .act-msg { color: #4b5262; }
    .act-time-sm { font-size: 11px; color: #9aa2b2; white-space: nowrap; }
    .empty-act { text-align: center; padding: 24px; color: #9aa2b2; font-size: 13px; }

    /* Quick Actions */
    .quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .quick-btn { display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border: 1px solid #e1e4eb; border-radius: 10px;
      background: #fff; cursor: pointer; text-align: left;
      transition: background 140ms, border-color 140ms;
      font-size: 12px; font-weight: 600; color: #343a48; }
    .quick-btn:hover { background: #f8f7ff; border-color: #6b4df0; color: #6b4df0; }
    .quick-icon { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .quick-label { line-height: 1.3; }

    @media (max-width: 1400px) { .modules-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 1100px) { .top-kpi-row { grid-template-columns: repeat(3, 1fr); } .modules-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 860px)  { .top-kpi-row { grid-template-columns: repeat(2, 1fr); } .modules-grid { grid-template-columns: 1fr; } .bottom-row { grid-template-columns: 1fr; } .welcome-banner { flex-direction: column; gap: 14px; } }
  `]
})
export class DashboardComponent implements OnInit { greeting = 'morning';
  userName = '';
  today = '';

  metaPills: { icon: string; label: string }[] = [];
  topKpis: { icon: string; label: string; value: string | number; color: string }[] = [];

  recruitLoading = true;
  payrollLoading = true;
  attendLoading  = true;
  leaveLoading   = true;
  empLoading     = true;
  perfLoading    = true;
  compLoading    = true;
  hdLoading      = true;
  auditLoading   = true;
  budgetLoading  = true;
  exitLoading    = true;
  lmsLoading     = true;

  recruit: any = { openReqs: '—', candidates: '—', selectionRate: 0 };
  payroll: any = { processed: '—', pending: '—', totalAmount: '—', pct: 0 };
  attend:  any = { present: '—', absent: '—', late: '—', pct: 0 };
  leave:   any = { pending: '—', approved: '—', balance: '—', pct: 0 };
  emp:     any = { total: '—', active: '—', onLeave: '—', pct: 0 };
  perf:    any = { reviews: '—', completed: '—', avgScore: '—', pct: 0 };
  comp:    any = { compliant: '—', violations: '—', pending: '—', pct: 0 };
  hd:      any = { open: '—', inProgress: '—', resolved: '—', pct: 0 };
  audit:   any = { today: '—', week: '—', critical: '—' };
  budget:  any = { utilized: 0, plans: '—', variance: 0 };
  exit:    any = { active: '—', pending: '—', completed: '—', pct: 0 };
  lms:     any = { courses: '—', completed: '—', enrolled: '—', pct: 0 };

  recentActivity: { module: string; message: string; time: string; color: string }[] = [];

  quickActions = [
    { icon: '📝', label: 'New Requisition',   route: '/requisitions',       color: 'rgba(107,77,240,.12)' },
    { icon: '👤', label: 'Add Employee',       route: '/employee-directory', color: 'rgba(22,163,74,.12)' },
    { icon: '💰', label: 'Run Payroll',         route: '/payroll',            color: 'rgba(5,150,105,.12)' },
    { icon: '📋', label: 'View Reports',        route: '/reports',            color: 'rgba(59,130,246,.12)' },
    { icon: '🛡️', label: 'Compliance Check',   route: '/compliance',         color: 'rgba(107,114,128,.12)'},
    { icon: '🎧', label: 'Helpdesk Tickets',   route: '/helpdesk',           color: 'rgba(20,184,166,.12)' },
    { icon: '📚', label: 'Training Courses',   route: '/learning-management',color: 'rgba(139,92,246,.12)' },
    { icon: '📊', label: 'Budget Overview',    route: '/budget',             color: 'rgba(5,150,105,.12)' },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() { const h = new Date().getHours();
    this.greeting = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
    this.today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const stored = localStorage.getItem('currentUser');
    if (stored) { try { const u = JSON.parse(stored); this.userName = u.name || u.firstName || u.username || ''; } catch {} }

    this.metaPills = [
      { icon: '📅', label: this.today.split(',')[0] },
      { icon: '🕐', label: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) },
    ];

    this.loadRecruitment();
    this.loadPayroll();
    this.loadAttendance();
    this.loadLeave();
    this.loadEmployees();
    this.loadPerformance();
    this.loadCompliance();
    this.loadHelpdesk();
    this.loadAudit();
    this.loadBudget();
    this.loadExits();
    this.loadLms(); }

  go(route: string) { this.router.navigate([route]); }

  private loadRecruitment() { this.http.get<any>(`${environment.apiUrl}/api/dashboard/metrics`).subscribe({ next: m => { this.recruit = { openReqs: m.totalJobs ?? 0, candidates: m.totalCandidates ?? 0, selectionRate: m.selectionRate ?? 0 };
        this.topKpis = [
          { icon: '👥', label: 'Employees',    value: '—',                    color: 'rgba(107,77,240,.15)' },
          { icon: '📌', label: 'Open Reqs',    value: m.totalJobs ?? 0,       color: 'rgba(232,145,42,.15)' },
          { icon: '🎯', label: 'Candidates',   value: m.totalCandidates ?? 0, color: 'rgba(59,189,234,.15)' },
          { icon: '🏢', label: 'Vendors',      value: m.activeVendors ?? 0,   color: 'rgba(22,163,74,.15)' },
          { icon: '💰', label: 'Payroll',      value: '—',                    color: 'rgba(5,150,105,.15)' },
          { icon: '🎧', label: 'Tickets',      value: '—',                    color: 'rgba(20,184,166,.15)' },
        ];
        this.recruitLoading = false; },
      error: () => { this.recruitLoading = false; } }); }

  private loadPayroll() { this.http.get<any>(`${environment.apiUrl}/api/payroll/summary`).subscribe({ next: d => { const processed = d?.processedCount ?? d?.processed ?? 0;
        const pending   = d?.pendingCount   ?? d?.pending   ?? 0;
        const total     = d?.totalDisbursed ?? d?.totalAmount ?? 0;
        const pct       = processed + pending > 0 ? Math.round(processed / (processed + pending) * 100) : 0;
        this.payroll = { processed, pending, totalAmount: total ? `₹${(total / 100000).toFixed(1)}L` : '₹0', pct };
        if (this.topKpis[4]) this.topKpis[4].value = `₹${(total / 100000).toFixed(1)}L`;
        this.payrollLoading = false; },
      error: () => { this.payroll = { processed: 0, pending: 0, totalAmount: '₹0', pct: 0 }; this.payrollLoading = false; } }); }

  private loadAttendance() { this.http.get<any>(`${environment.apiUrl}/api/attendance/today`).subscribe({ next: d => { const present = d?.present ?? 0;
        const total   = (d?.present ?? 0) + (d?.absent ?? 0);
        this.attend = { present, absent: d?.absent ?? 0, late: d?.late ?? 0, pct: total > 0 ? Math.round(present / total * 100) : 0 };
        this.attendLoading = false; },
      error: () => { this.attend = { present: 0, absent: 0, late: 0, pct: 0 }; this.attendLoading = false; } }); }

  private loadLeave() { this.http.get<any>(`${environment.apiUrl}/api/leave/summary`).subscribe({ next: d => { const approved = d?.approved ?? 0;
        const pending  = d?.pending  ?? 0;
        const total    = approved + pending;
        this.leave = { pending, approved, balance: d?.averageBalance ?? d?.avgBalance ?? '—', pct: total > 0 ? Math.round(approved / total * 100) : 0 };
        this.leaveLoading = false; },
      error: () => { this.leave = { pending: 0, approved: 0, balance: '—', pct: 0 }; this.leaveLoading = false; } }); }

  private loadEmployees() { this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe({ next: list => { const data  = Array.isArray(list) ? list : (list as any)?.data ?? [];
        const total  = data.length;
        const active = data.filter((e: any) => (e.status || '').toLowerCase() === 'active').length || total;
        const onLeave= data.filter((e: any) => (e.status || '').toLowerCase() === 'on leave').length;
        this.emp = { total, active, onLeave, pct: total > 0 ? Math.round(active / total * 100) : 0 };
        if (this.topKpis[0]) this.topKpis[0].value = total;
        this.empLoading = false; },
      error: () => { this.emp = { total: 0, active: 0, onLeave: 0, pct: 0 }; this.empLoading = false; } }); }

  private loadPerformance() { this.http.get<any>(`${environment.apiUrl}/api/performance/summary`).subscribe({ next: d => { const reviews   = d?.pendingReviews  ?? d?.reviewsDue   ?? 0;
        const completed = d?.completedReviews ?? d?.completed    ?? 0;
        const avgScore  = d?.averageScore     ?? d?.avgScore     ?? '—';
        const total = reviews + completed;
        this.perf = { reviews, completed, avgScore, pct: total > 0 ? Math.round(completed / total * 100) : 0 };
        this.perfLoading = false; },
      error: () => { this.perf = { reviews: 0, completed: 0, avgScore: '—', pct: 0 }; this.perfLoading = false; } }); }

  private loadCompliance() { this.http.get<any>(`${environment.apiUrl}/api/compliance/summary`).subscribe({ next: d => { const compliant  = d?.compliantCount  ?? d?.compliant  ?? 0;
        const violations = d?.violationCount  ?? d?.violations ?? 0;
        const pending    = d?.pendingCount    ?? d?.pending    ?? 0;
        const total = compliant + violations + pending;
        this.comp = { compliant, violations, pending, pct: total > 0 ? Math.round(compliant / total * 100) : 0 };
        this.compLoading = false; },
      error: () => { this.comp = { compliant: 0, violations: 0, pending: 0, pct: 0 }; this.compLoading = false; } }); }

  private loadHelpdesk() { this.http.get<any>(`${environment.apiUrl}/api/helpdesk/summary`).subscribe({ next: d => { const open       = d?.openCount       ?? d?.open       ?? 0;
        const inProgress = d?.inProgressCount ?? d?.inProgress ?? 0;
        const resolved   = d?.resolvedCount   ?? d?.resolved   ?? 0;
        const total = open + inProgress + resolved;
        this.hd = { open, inProgress, resolved, pct: total > 0 ? Math.round(resolved / total * 100) : 0 };
        if (this.topKpis[5]) this.topKpis[5].value = open;
        this.hdLoading = false; },
      error: () => { this.hd = { open: 0, inProgress: 0, resolved: 0, pct: 0 }; this.hdLoading = false; } }); }

  private loadAudit() { this.http.get<any>(`${environment.apiUrl}/api/audit/summary`).subscribe({ next: d => { this.audit = { today: d?.todayCount ?? d?.today ?? 0, week: d?.weekCount ?? d?.week ?? 0, critical: d?.criticalCount ?? d?.critical ?? 0 };
        this.auditLoading = false; },
      error: () => { this.audit = { today: 0, week: 0, critical: 0 }; this.auditLoading = false; } }); }

  private loadBudget() { this.http.get<any>(`${environment.apiUrl}/api/budget/plans`).subscribe({ next: r => { const plans = r?.data ?? r ?? [];
        const active = Array.isArray(plans) ? plans.filter((p: any) => p.status === 'Approved' || p.status === 'Draft').length : 0;
        this.budget = { utilized: 0, plans: active, variance: 0 };
        this.budgetLoading = false; },
      error: () => { this.budget = { utilized: 0, plans: 0, variance: 0 }; this.budgetLoading = false; } }); }

  private loadExits() { this.http.get<any[]>(`${environment.apiUrl}/api/employees/exits`).subscribe({ next: data => { const list      = Array.isArray(data) ? data : (data as any)?.data ?? [];
        const active    = list.filter((e: any) => e.status !== 'Completed').length;
        const pending   = list.filter((e: any) => e.status === 'Initiated' || e.status === 'Pending').length;
        const completed = list.filter((e: any) => e.status === 'Completed').length;
        const total = active + completed;
        this.exit = { active, pending, completed, pct: total > 0 ? Math.round(completed / total * 100) : 0 };
        this.exitLoading = false; },
      error: () => { this.exit = { active: 0, pending: 0, completed: 0, pct: 0 }; this.exitLoading = false; } }); }

  private loadLms() { this.http.get<any>(`${environment.apiUrl}/api/learning/summary`).subscribe({ next: d => { const courses   = d?.courseCount    ?? d?.courses    ?? 0;
        const completed = d?.completedCount ?? d?.completed  ?? 0;
        const enrolled  = d?.enrolledCount  ?? d?.enrolled   ?? 0;
        this.lms = { courses, completed, enrolled, pct: enrolled > 0 ? Math.round(completed / enrolled * 100) : 0 };
        this.lmsLoading = false; },
      error: () => { this.lms = { courses: 0, completed: 0, enrolled: 0, pct: 0 }; this.lmsLoading = false; } }); }
}

