import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pipeline-board',
  template: `
    <section class="stack-page">
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

      <div *ngIf="!board.length && !loading && loaded" style="text-align:center;padding:40px;color:var(--text-3)">
        No stages configured yet.
      </div>
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
  jobId = '';
  board: any[] = [];
  loading = false;
  loaded = false;

  constructor(private http: HttpClient) {}

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

  openCandidate(id: string) {
    // Navigate to candidate detail when implemented
  }
}
