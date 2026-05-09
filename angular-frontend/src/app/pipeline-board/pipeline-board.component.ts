import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pipeline-board',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <!-- KPI Strip -->
            <div class="kpi-grid" style="margin-bottom:20px;">
              <div class="kpi-tile">
                <div class="kpi-lbl">Total Candidates</div>
                <div class="kpi-val">{{ totalCandidates }}</div>
                <div class="kpi-sub">Across all stages</div>
              </div>
              <div class="kpi-tile">
                <div class="kpi-lbl">Active Stages</div>
                <div class="kpi-val" style="color:#7c3aed;">{{ board.length }}</div>
                <div class="kpi-sub">Pipeline depth</div>
              </div>
              <div class="kpi-tile">
                <div class="kpi-lbl">Avg per Stage</div>
                <div class="kpi-val" style="color:#06b6d4;">{{ avgPerStage }}</div>
                <div class="kpi-sub">Candidates / stage</div>
              </div>
              <div class="kpi-tile">
                <div class="kpi-lbl">Top Stage</div>
                <div class="kpi-val" style="font-size:18px;line-height:1.2;margin:6px 0;">{{ topStage }}</div>
                <div class="kpi-sub">Most candidates</div>
              </div>
            </div>

            <!-- Stage Funnel Bar Chart -->
            <div class="c-card" style="margin-bottom:16px;">
              <div class="c-title">Candidates per Stage — Pipeline Funnel</div>
              <div style="margin-top:14px;">
                <div *ngFor="let s of stageStats; let i=index" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="rank-badge" [style.background]="s.colour+'1a'" [style.color]="s.colour">{{i+1}}</span>
                      <span style="font-size:13px;font-weight:600;">{{ s.name }}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:12px;color:var(--text-3);">{{ s.pct }}%</span>
                      <span class="num-chip" [style.background]="s.colour+'1a'" [style.color]="s.colour">{{ s.count }}</span>
                    </div>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="s.pct" [style.background]="s.colour || '#7c3aed'"></div>
                  </div>
                </div>
                <div *ngIf="!board.length" style="text-align:center;padding:40px;color:var(--text-3);">
                  <div style="font-size:36px;margin-bottom:10px;">📊</div>
                  <div style="font-weight:600;font-size:14px;">Load a board to see pipeline analytics</div>
                  <div style="font-size:13px;margin-top:4px;color:var(--text-3);">Enter a Job ID in the Board tab</div>
                </div>
              </div>
            </div>

            <!-- Donut + Stage Health Pivot -->
            <div style="display:grid;grid-template-columns:260px 1fr;gap:16px;">

              <div class="c-card">
                <div class="c-title">Stage Distribution</div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:16px;margin-top:12px;">
                  <svg viewBox="0 0 120 120" width="130" height="130">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="18"/>
                    <ng-container *ngFor="let s of donutSegments">
                      <circle cx="60" cy="60" r="45" fill="none" stroke-width="18"
                        [attr.stroke]="s.colour"
                        [attr.stroke-dasharray]="s.dash + ' 283'"
                        [attr.stroke-dashoffset]="-s.offset"
                        transform="rotate(-90 60 60)"/>
                    </ng-container>
                    <text x="60" y="55" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">{{ totalCandidates }}</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">TOTAL</text>
                  </svg>
                  <div style="width:100%;display:flex;flex-direction:column;gap:7px;">
                    <div *ngFor="let s of stageStats" style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span [style.background]="s.colour || '#7c3aed'" style="width:10px;height:10px;border-radius:2px;display:inline-block;flex-shrink:0;"></span>
                      <span style="flex:1;">{{ s.name }}</span>
                      <b [style.color]="s.colour">{{ s.count }}</b>
                    </div>
                    <div *ngIf="!board.length" style="color:var(--text-3);font-size:12px;text-align:center;">No board loaded</div>
                  </div>
                </div>
              </div>

              <div class="c-card">
                <div class="c-title">Stage Health Pivot</div>
                <div style="overflow-x:auto;margin-top:12px;">
                  <table style="width:100%;border-collapse:collapse;" *ngIf="board.length">
                    <thead>
                      <tr style="background:var(--surface-alt);">
                        <th class="pth">Stage</th>
                        <th class="pth r">Candidates</th>
                        <th class="pth r">Share %</th>
                        <th class="pth">Fill Bar</th>
                        <th class="pth c">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let s of stageStats; let i=index" class="ptr">
                        <td class="ptd">
                          <div style="display:flex;align-items:center;gap:8px;">
                            <span class="rank-badge" [style.background]="s.colour+'1a'" [style.color]="s.colour">{{i+1}}</span>
                            <b>{{ s.name }}</b>
                          </div>
                        </td>
                        <td class="ptd r"><b>{{ s.count }}</b></td>
                        <td class="ptd r">
                          <span class="num-chip" [style.background]="s.colour+'1a'" [style.color]="s.colour">{{ s.pct }}%</span>
                        </td>
                        <td class="ptd" style="min-width:120px;">
                          <div class="bar-track" style="height:6px;">
                            <div class="bar-fill" [style.width.%]="s.pct" [style.background]="s.colour || '#7c3aed'"></div>
                          </div>
                        </td>
                        <td class="ptd c">
                          <span class="num-chip" [style.background]="s.count>avgPerStage?'#d1fae5':'#fef3c7'" [style.color]="s.count>avgPerStage?'#065f46':'#92400e'">
                            {{ s.count > avgPerStage ? 'Active' : 'Low' }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div *ngIf="!board.length" style="color:var(--text-3);text-align:center;padding:24px;font-size:13px;">Load a board first</div>
                </div>
              </div>
            </div>

          </div>
        </mat-tab>

        <!-- ── TAB 2: Board ── -->
        <mat-tab label="Board">
          <div style="padding-top:20px;">
            <div class="card form-row" style="margin-bottom:16px;">
              <input class="input" placeholder="Job ID (UUID)" [(ngModel)]="jobId">
              <button class="btn btn-primary" (click)="loadBoard()">Load Board</button>
            </div>

            <div *ngIf="loading" style="text-align:center;padding:40px;color:var(--text-3)">Loading pipeline…</div>

            <div *ngIf="board.length" class="kanban-board">
              <div class="kanban-col" *ngFor="let col of board">
                <div class="kanban-col-header" [style.borderTopColor]="col.stage.colour">
                  <span>{{ col.stage.name }}</span>
                  <span class="chip">{{ col.candidates.length }}</span>
                </div>
                <div class="kanban-card" *ngFor="let c of col.candidates"
                     (click)="openCandidate(c.candidateId)">
                  <div class="kanban-card-name">{{ c.candidateId | slice:0:8 }}…</div>
                  <div class="kanban-card-meta">Moved {{ c.movedAt | date:'d MMM' }}</div>
                </div>
                <div *ngIf="!col.candidates.length" class="kanban-empty">No candidates</div>
              </div>
            </div>

            <div *ngIf="!board.length && !loading && loaded"
                 style="text-align:center;padding:40px;color:var(--text-3)">
              No stages configured yet.
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .kpi-tile  { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-val   { font-size:26px;font-weight:800;margin:4px 0; }
    .kpi-lbl   { font-size:11px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px; }
    .kpi-sub   { font-size:11px;color:var(--text-3); }
    .c-card    { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .c-title   { font-size:14px;font-weight:700; }
    .bar-track { height:10px;background:var(--surface-alt);border-radius:5px;overflow:hidden; }
    .bar-fill  { height:100%;border-radius:5px;transition:width .5s; }
    .num-chip  { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .rank-badge { display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;font-weight:700;font-size:11px;flex-shrink:0; }
    .pth { padding:8px 10px;text-align:left;font-size:11px;color:var(--text-3);font-weight:700;border-bottom:2px solid var(--border); }
    .pth.r { text-align:right; } .pth.c { text-align:center; }
    .ptd { padding:8px 10px;font-size:12px;border-bottom:1px solid var(--border); }
    .ptd.r { text-align:right; } .ptd.c { text-align:center; }
    .ptr:hover { background:var(--surface-alt); }
    .kanban-board { display:flex; gap:16px; overflow-x:auto; padding-bottom:8px; }
    .kanban-col { min-width:200px; background:var(--surface); border-radius:10px; padding:12px; }
    .kanban-col-header { display:flex; justify-content:space-between; align-items:center; font-weight:700; font-size:13px; border-top:3px solid #6366f1; padding-top:8px; margin-bottom:12px; }
    .kanban-card { background:#fff; border:1px solid var(--border); border-radius:8px; padding:10px; margin-bottom:8px; cursor:pointer; }
    .kanban-card:hover { border-color:#6366f1; }
    .kanban-card-name { font-weight:600; font-size:13px; }
    .kanban-card-meta { font-size:11px; color:var(--text-3); margin-top:2px; }
    .kanban-empty { color:var(--text-3); font-size:12px; text-align:center; padding:16px 0; }
  `]
})
export class PipelineBoardComponent implements OnInit {
  activeTab = 0;
  jobId = '';
  board: any[] = [];
  loading = false;
  loaded = false;

  readonly stageColors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/pipeline-board/stages`)
      .subscribe({ next: () => {}, error: () => {} });
  }

  loadBoard() {
    if (!this.jobId.trim()) return;
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/pipeline-board/${this.jobId}`)
      .subscribe({
        next: data => { this.board = data; this.loading = false; this.loaded = true; },
        error: () => { this.loading = false; this.loaded = true; }
      });
  }

  openCandidate(id: string) { this.router.navigate(['/candidate-portal'], { queryParams: { candidateId: id } }); }

  get totalCandidates() { return this.board.reduce((s, col) => s + col.candidates.length, 0); }
  get avgPerStage()  { return this.board.length ? Math.round(this.totalCandidates / this.board.length) : 0; }
  get topStage()     { return [...this.board].sort((a, b) => b.candidates.length - a.candidates.length)[0]?.stage?.name || '—'; }

  get stageStats(): {name: string, colour: string, count: number, pct: number}[] {
    const total = this.totalCandidates || 1;
    return this.board.map((col, i) => ({
      name:   col.stage.name,
      colour: col.stage.colour || this.stageColors[i % this.stageColors.length],
      count:  col.candidates.length,
      pct:    Math.round(col.candidates.length / total * 100)
    }));
  }

  get donutSegments(): {colour: string, dash: number, offset: number}[] {
    const total = this.totalCandidates || 1;
    const circ = 283;
    let offset = 0;
    return this.stageStats.map(s => {
      const dash = (s.count / total) * circ;
      const seg = { colour: s.colour, dash, offset };
      offset += dash;
      return seg;
    });
  }
}
