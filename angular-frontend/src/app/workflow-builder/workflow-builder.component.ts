import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface WorkflowStep {
  name: string;
  role: string;
  slaDays: number;
}

interface WorkflowDefinition {
  id?: string;
  name: string;
  entityType: string;
  stepsJson: string;
  isActive: boolean;
  steps?: WorkflowStep[];
}

interface WorkflowInstance {
  id: string;
  entityId: string;
  entityType: string;
  currentStep: number;
  totalSteps: number;
  status: string;
  startedAt: string;
  slaDeadline: string;
  slaBreached: boolean;
  definition?: WorkflowDefinition;
}

@Component({
  selector: 'app-workflow-builder',
  template: `
    <div class="page-container page-enter">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <div>
          <h1 class="page-title">Workflow Engine</h1>
          <p style="font-size:13px;color:var(--text-3)">Define approval workflows and monitor instances</p>
        </div>
      </div>

      <mat-tab-group>
        <!-- Definitions Tab -->
        <mat-tab label="Workflow Definitions">
          <div style="padding:20px 0;">
            <div style="display:flex;justify-content:flex-end;margin-bottom:16px;">
              <button class="btn btn-primary btn-sm" (click)="startNew()">+ New Workflow</button>
            </div>

            <!-- Editor -->
            <div *ngIf="editing" style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px;">
              <h3 style="margin:0 0 16px;font-size:15px;">{{draft.id ? 'Edit' : 'New'}} Workflow</h3>
              <div *ngIf="saveMsg" style="color:#22c55e;font-size:13px;margin-bottom:12px;">{{saveMsg}}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <input class="input" placeholder="Workflow name*" [(ngModel)]="draft.name">
                <select class="select" [(ngModel)]="draft.entityType">
                  <option value="">Select entity type</option>
                  <option value="Helpdesk">Helpdesk Ticket</option>
                  <option value="TravelRequest">Travel Request</option>
                  <option value="LeaveRequest">Leave Request</option>
                  <option value="ExpenseClaim">Expense Claim</option>
                  <option value="OfferApproval">Offer Approval</option>
                  <option value="ExitClearance">Exit Clearance</option>
                </select>
              </div>

              <h4 style="font-size:13px;margin:0 0 12px;">Steps</h4>
              <div *ngFor="let step of draft.steps; let i=index" style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
                <span style="font-size:12px;color:var(--text-3);width:20px;">{{i+1}}</span>
                <input class="input" placeholder="Step name" [(ngModel)]="step.name" style="flex:1;">
                <input class="input" placeholder="Role" [(ngModel)]="step.role" style="width:140px;">
                <input class="input" type="number" placeholder="SLA days" [(ngModel)]="step.slaDays" style="width:90px;">
                <button class="btn btn-ghost btn-sm" (click)="removeStep(i)" style="color:#ef4444;padding:4px 8px;">✕</button>
              </div>
              <button class="btn btn-ghost btn-sm" (click)="addStep()" style="margin-top:4px;">+ Add Step</button>

              <div style="margin-top:20px;display:flex;gap:10px;">
                <button class="btn btn-primary btn-sm" (click)="saveDefinition()">Save Workflow</button>
                <button class="btn btn-ghost btn-sm" (click)="editing=false">Cancel</button>
              </div>
            </div>

            <!-- Definitions list -->
            <div style="display:grid;gap:12px;">
              <div *ngFor="let def of definitions" style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:16px;">
                <div style="flex:1;">
                  <div style="font-weight:600;">{{def.name}}</div>
                  <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
                    {{def.entityType}} · {{stepsCount(def)}} steps
                  </div>
                </div>
                <span style="padding:2px 10px;border-radius:4px;font-size:11px;" [style.background]="def.isActive?'rgba(34,197,94,.1)':'rgba(239,68,68,.1)'" [style.color]="def.isActive?'#22c55e':'#ef4444'">
                  {{def.isActive ? 'Active' : 'Inactive'}}
                </span>
                <button class="btn btn-ghost btn-sm" (click)="editDefinition(def)">Edit</button>
              </div>
              <div *ngIf="!definitions.length" style="text-align:center;padding:40px;color:var(--text-3);">
                No workflow definitions yet. Create one to get started.
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Instances Tab -->
        <mat-tab label="Running Workflows">
          <div style="padding:20px 0;">
            <div style="display:flex;gap:10px;margin-bottom:16px;">
              <select class="select" [(ngModel)]="instanceFilter" (ngModelChange)="loadInstances()">
                <option value="">All Statuses</option>
                <option value="InProgress">In Progress</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select class="select" [(ngModel)]="entityTypeFilter" (ngModelChange)="loadInstances()">
                <option value="">All Types</option>
                <option value="Helpdesk">Helpdesk</option>
                <option value="TravelRequest">Travel</option>
                <option value="LeaveRequest">Leave</option>
                <option value="ExpenseClaim">Expense</option>
              </select>
              <button class="btn btn-ghost btn-sm" (click)="loadSLABreaches()" style="color:#f97316;">⚠ SLA Breaches ({{slaCount}})</button>
            </div>

            <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead><tr style="background:var(--surface-alt);">
                  <th style="text-align:left;padding:12px 14px;color:var(--text-3);">Entity</th>
                  <th style="text-align:left;padding:12px 14px;color:var(--text-3);">Workflow</th>
                  <th style="text-align:center;padding:12px 14px;color:var(--text-3);">Progress</th>
                  <th style="text-align:left;padding:12px 14px;color:var(--text-3);">SLA Deadline</th>
                  <th style="text-align:left;padding:12px 14px;color:var(--text-3);">Status</th>
                  <th style="text-align:center;padding:12px 14px;color:var(--text-3);">Actions</th>
                </tr></thead>
                <tbody>
                  <tr *ngFor="let inst of instances" style="border-bottom:1px solid var(--border);"
                      [style.background]="inst.slaBreached?'rgba(239,68,68,.04)':''">
                    <td style="padding:12px 14px;">
                      <span style="font-size:11px;background:var(--surface-alt);padding:2px 8px;border-radius:4px;">{{inst.entityType}}</span>
                    </td>
                    <td style="padding:12px 14px;">{{inst.definition?.name ?? '—'}}</td>
                    <td style="padding:12px 14px;text-align:center;">
                      <div style="display:flex;align-items:center;gap:6px;justify-content:center;">
                        <div style="flex:1;max-width:80px;height:6px;background:var(--surface-alt);border-radius:3px;overflow:hidden;">
                          <div [style.width.%]="(inst.currentStep/inst.totalSteps)*100" style="height:100%;background:var(--brand-violet-500,#8b5cf6);border-radius:3px;"></div>
                        </div>
                        <span style="font-size:11px;color:var(--text-3);">{{inst.currentStep}}/{{inst.totalSteps}}</span>
                      </div>
                    </td>
                    <td style="padding:12px 14px;" [style.color]="inst.slaBreached?'#ef4444':'inherit'">
                      {{inst.slaDeadline | date:'dd MMM yy'}}
                      <span *ngIf="inst.slaBreached" style="font-size:11px;color:#ef4444;"> ⚠</span>
                    </td>
                    <td style="padding:12px 14px;">
                      <span style="padding:2px 10px;border-radius:4px;font-size:11px;" [ngClass]="statusClass(inst.status)">{{inst.status}}</span>
                    </td>
                    <td style="padding:12px 14px;text-align:center;">
                      <div *ngIf="inst.status==='InProgress'" style="display:flex;gap:6px;justify-content:center;">
                        <button class="btn btn-ghost btn-sm" (click)="approve(inst)" style="color:#22c55e;font-size:12px;">Approve</button>
                        <button class="btn btn-ghost btn-sm" (click)="reject(inst)" style="color:#ef4444;font-size:12px;">Reject</button>
                      </div>
                    </td>
                  </tr>
                  <tr *ngIf="!instances.length">
                    <td colspan="6" style="padding:32px;text-align:center;color:var(--text-3);">No workflow instances found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class WorkflowBuilderComponent implements OnInit {
  definitions: WorkflowDefinition[] = [];
  instances: WorkflowInstance[] = [];
  slaCount = 0;

  editing = false;
  draft: WorkflowDefinition & { steps: WorkflowStep[] } = this.emptyDraft();
  saveMsg = '';

  instanceFilter = '';
  entityTypeFilter = '';

  private api = `${environment.apiUrl}/api/workflows`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDefinitions();
    this.loadInstances();
    this.loadSLABreaches();
  }

  loadDefinitions() {
    this.http.get<WorkflowDefinition[]>(`${this.api}/definitions`).subscribe(d => {
      this.definitions = d.map(def => ({ ...def, steps: this.parseSteps(def.stepsJson) }));
    });
  }

  loadInstances() {
    const params = new URLSearchParams();
    if (this.instanceFilter)   params.set('status', this.instanceFilter);
    if (this.entityTypeFilter) params.set('entityType', this.entityTypeFilter);
    this.http.get<WorkflowInstance[]>(`${this.api}/instances?${params}`).subscribe(i => this.instances = i);
  }

  loadSLABreaches() {
    this.http.get<WorkflowInstance[]>(`${this.api}/sla-breaches`).subscribe(b => this.slaCount = b.length);
  }

  startNew() { this.draft = this.emptyDraft(); this.editing = true; this.saveMsg = ''; }

  editDefinition(def: WorkflowDefinition) {
    this.draft = { ...def, steps: this.parseSteps(def.stepsJson) };
    this.editing = true;
    this.saveMsg = '';
  }

  addStep() { this.draft.steps.push({ name: '', role: '', slaDays: 2 }); }
  removeStep(i: number) { this.draft.steps.splice(i, 1); }

  saveDefinition() {
    const body: WorkflowDefinition = {
      ...this.draft,
      stepsJson: JSON.stringify(this.draft.steps)
    };
    const req = this.draft.id
      ? this.http.put<WorkflowDefinition>(`${this.api}/definitions/${this.draft.id}`, body)
      : this.http.post<WorkflowDefinition>(`${this.api}/definitions`, body);
    req.subscribe({
      next: () => { this.saveMsg = 'Saved.'; this.loadDefinitions(); setTimeout(() => { this.editing = false; this.saveMsg = ''; }, 1200); },
      error: () => { this.saveMsg = 'Save failed.'; }
    });
  }

  approve(inst: WorkflowInstance) {
    this.http.post(`${this.api}/instances/${inst.id}/approve`, { notes: null }).subscribe(() => this.loadInstances());
  }

  reject(inst: WorkflowInstance) {
    this.http.post(`${this.api}/instances/${inst.id}/reject`, { notes: 'Rejected via console' }).subscribe(() => this.loadInstances());
  }

  stepsCount(def: WorkflowDefinition) {
    try { return JSON.parse(def.stepsJson).length; } catch { return 0; }
  }

  statusClass(status: string) {
    return {
      'chip-green':  status === 'Approved',
      'chip-red':    status === 'Rejected',
      'chip-brand':  status === 'InProgress',
    };
  }

  private parseSteps(json: string): WorkflowStep[] {
    try { return JSON.parse(json) as WorkflowStep[]; } catch { return []; }
  }

  private emptyDraft() {
    return { id: undefined as any, name: '', entityType: '', stepsJson: '[]', isActive: true, steps: [] as WorkflowStep[] };
  }
}
