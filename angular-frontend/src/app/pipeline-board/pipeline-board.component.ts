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

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Candidates</div>
                <div class="kpi-value">{{ totalCandidates }}</div>
                <div class="kpi-meta">Across all stages</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Active Stages</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ board.length }}</div>
                <div class="kpi-meta">Pipeline depth</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg per Stage</div>
                <div class="kpi-value" style="color:#06b6d4;">{{ avgPerStage }}</div>
                <div class="kpi-meta">Candidates / stage</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Top Stage</div>
                <div class="kpi-value" style="font-size:18px;">{{ topStage }}</div>
                <div class="kpi-meta">Most candidates</div>
              </article>
            </div>

            <!-- Stage Funnel Bar Chart -->
            <div class="card" style="padding:24px;margin-bottom:20px;">
              <h3 style="margin:0 0 20px;">Candidates per Stage</h3>
              <div *ngFor="let s of stageStats" style="margin-bottom:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span style="width:10px;height:10px;border-radius:50%;"
                          [style.background]="s.colour || '#7c3aed'"
                          style="display:inline-block;flex-shrink:0;"></span>
                    <span style="font-size:13px;font-weight:600;">{{ s.name }}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:12px;color:var(--text-3);">{{ s.pct }}%</span>
                    <b style="font-size:14px;">{{ s.count }}</b>
                  </div>
                </div>
                <div style="height:14px;background:#f1f5f9;border-radius:7px;overflow:hidden;">
                  <div [style.width.%]="s.pct"
                       [style.background]="s.colour || '#7c3aed'"
                       style="height:100%;border-radius:7px;transition:width .4s;"></div>
                </div>
              </div>
              <div *ngIf="!board.length" style="text-align:center;padding:40px;color:var(--text-3);">
                <div style="font-size:36px;margin-bottom:10px;">📊</div>
                <div style="font-weight:500;">Load a board to see analytics</div>
                <div style="font-size:13px;margin-top:4px;">Enter a Job ID in the Board tab</div>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">

              <!-- Stage Distribution Donut -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Stage Distribution</h3>
                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
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
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div *ngFor="let s of stageStats"
                         style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span [style.background]="s.colour || '#7c3aed'"
                            style="width:10px;height:10px;border-radius:2px;display:inline-block;flex-shrink:0;"></span>
                      {{ s.name }} <b style="margin-left:4px;">{{ s.count }}</b>
                    </div>
                    <div *ngIf="!board.length" style="color:var(--text-3);font-size:12px;">No board loaded</div>
                  </div>
                </div>
              </div>

              <!-- Stage Health Table -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 16px;">Stage Health</h3>
                <table class="table" *ngIf="board.length">
                  <thead>
                    <tr><th>Stage</th><th>Count</th><th>Share</th><th>Fill</th></tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let s of stageStats">
                      <td><b>{{ s.name }}</b></td>
                      <td>{{ s.count }}</td>
                      <td>{{ s.pct }}%</td>
                      <td style="width:80px;">
                        <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                          <div [style.width.%]="s.pct"
                               [style.background]="s.colour || '#7c3aed'"
                               style="height:100%;border-radius:3px;"></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div *ngIf="!board.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  Load a board first
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
