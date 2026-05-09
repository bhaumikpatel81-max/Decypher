import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Course {
  id: number; title: string; category: string; duration: number;
  type: string; enrolled: number; completions: number; progress?: number;
}

@Component({
  selector: 'app-learning-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Learning Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Courses · Progress · Completion Tracking</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='catalogue'" (click)="tab='catalogue'">Catalogue</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='my'" (click)="tab='my'">My Learning</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='tracker'" (click)="tab='tracker'">Completion Tracker</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{totalHours}}</div><div class="kpi-lbl">Hours Logged</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{completedCourses}}</div><div class="kpi-lbl">Courses Completed</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{passRate}}%</div><div class="kpi-lbl">Pass Rate</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{courses.length}}</div><div class="kpi-lbl">Total Courses</div></div>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <input class="input" style="max-width:220px;" [(ngModel)]="search" placeholder="Search courses...">
        <select class="select" style="max-width:180px;" [(ngModel)]="filterCat">
          <option value="">All Categories</option>
          <option *ngFor="let c of categories">{{c}}</option>
        </select>
        <select class="select" style="max-width:150px;" [(ngModel)]="filterType">
          <option value="">All Types</option>
          <option>Video</option><option>Quiz</option><option>Reading</option><option>Workshop</option>
        </select>
      </div>

      <!-- CATALOGUE -->
      <div *ngIf="tab==='catalogue'">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
          <div *ngFor="let c of filteredCourses" class="course-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
              <div style="flex:1;">
                <div class="course-type-badge" [class]="typeClass(c.type)">{{typeIcon(c.type)}} {{c.type}}</div>
                <div style="font-weight:700;font-size:15px;margin-top:6px;">{{c.title}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{c.category}} · {{c.duration}}h</div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:12px;color:var(--text-3);">
              <span>{{c.enrolled}} enrolled</span>
              <span>{{c.completions}} completed</span>
              <span>{{c.duration > 0 ? ((c.completions/c.enrolled*100)|number:'1.0-0')+'% pass rate' : ''}}</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:4px;margin-bottom:10px;">
              <div style="height:4px;border-radius:4px;background:#10b981;" [style.width.%]="c.enrolled?(c.completions/c.enrolled)*100:0"></div>
            </div>
            <button class="btn btn-primary btn-sm" style="width:100%;" (click)="enrollCourse(c)">Enroll</button>
          </div>
        </div>
      </div>

      <!-- MY LEARNING -->
      <div *ngIf="tab==='my'">
        <h3 style="font-weight:700;margin-bottom:16px;">My Learning Progress</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div *ngFor="let c of myCourses" class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <div class="course-type-badge" [class]="typeClass(c.type)">{{typeIcon(c.type)}} {{c.type}}</div>
                <div style="font-weight:700;font-size:14px;margin-top:4px;">{{c.title}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{c.category}} · {{c.duration}}h total</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:22px;font-weight:800;color:#6b4df0;">{{c.progress}}%</div>
                <div style="font-size:12px;color:var(--text-3);">complete</div>
              </div>
            </div>
            <div style="background:var(--border);border-radius:6px;height:8px;">
              <div style="height:8px;border-radius:6px;transition:width .4s;" [style.width.%]="c.progress" [style.background]="c.progress===100?'#10b981':'#6b4df0'"></div>
            </div>
            <div style="display:flex;gap:8px;margin-top:10px;">
              <button class="btn btn-primary btn-sm" *ngIf="c.progress<100" (click)="continueCourse(c)">Continue</button>
              <button class="btn btn-ghost btn-sm" *ngIf="c.progress===100">View Certificate</button>
              <span *ngIf="c.progress===100" style="font-size:12px;color:#10b981;font-weight:700;padding:4px 0;">✓ Completed</span>
            </div>
          </div>
        </div>
      </div>

      <!-- TRACKER -->
      <div *ngIf="tab==='tracker'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Team Completion Tracker</h3>
        <table style="width:100%;border-collapse:collapse;min-width:700px;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th>
            <th class="th" *ngFor="let c of courses.slice(0,6)" style="text-align:center;max-width:100px;font-size:10px;">{{c.title.slice(0,20)}}</th>
            <th class="th" style="text-align:center;">Hours</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let e of teamProgress" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{e.name}}</strong></td>
              <td *ngFor="let s of e.statuses" class="td" style="text-align:center;">
                <span [style.font-size]="'16px'" [title]="s">{{s==='done'?'✅':s==='progress'?'🔄':s==='not'?'⬜':''}}</span>
              </td>
              <td class="td" style="text-align:center;font-weight:700;color:#6b4df0;">{{e.hours}}h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .course-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;transition:box-shadow .2s; }
    .course-card:hover { box-shadow:0 4px 20px rgba(107,77,240,.12); }
    .course-type-badge { display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700; }
    .course-type-badge.video { background:rgba(107,77,240,.1);color:#6b4df0; }
    .course-type-badge.quiz { background:rgba(245,158,11,.1);color:#f59e0b; }
    .course-type-badge.reading { background:rgba(16,185,129,.1);color:#10b981; }
    .course-type-badge.workshop { background:rgba(59,130,246,.1);color:#3b82f6; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class LearningManagementComponent implements OnInit {
  private api = `${environment.apiUrl}/api/learning`;
  tab = 'catalogue';
  search = '';
  filterCat = '';
  filterType = '';
  stats: any = {};
  categories = ['Technical', 'Leadership', 'Compliance', 'Product', 'Sales'];
  courses: Course[] = [];
  myCourses: any[] = [];
  teamProgress: any[] = [];

  constructor(private http: HttpClient) {}

  get filteredCourses() {
    return this.courses.filter(c =>
      (!this.search || c.title.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.filterCat || c.category === this.filterCat) &&
      (!this.filterType || c.type === this.filterType)
    );
  }

  typeClass(type: string) { return type.toLowerCase(); }
  typeIcon(type: string) { const m: { [k: string]: string } = { Video: '🎥', Quiz: '📝', Reading: '📖', Workshop: '🏫' }; return m[type] || '📚'; }

  ngOnInit() { this.loadCourses(); this.loadStats(); this.loadMyEnrollments(); }

  loadCourses() {
    this.http.get<any[]>(`${this.api}/courses`).subscribe(data => {
      this.courses = (data || []).map(c => ({
        id: c.id, title: c.title, category: c.category, duration: c.durationHours || 0,
        type: c.mode || 'Video', enrolled: c.enrolledCount || 0, completions: c.completedCount || 0
      }));
    });
  }

  loadStats() {
    this.http.get<any>(`${this.api}/courses/stats`).subscribe(s => { this.stats = s || {}; });
  }

  loadMyEnrollments() {
    this.http.get<any[]>(`${this.api}/enrollments`).subscribe(data => {
      this.myCourses = (data || []).map(e => ({
        id: e.id, courseId: e.courseId, title: e.course?.title || '', category: e.course?.category || '',
        duration: e.course?.durationHours || 0, type: e.course?.mode || 'Video',
        progress: e.progressPercent || 0, status: e.status
      }));
    });
  }

  enrollMsg = '';

  enrollCourse(c: Course) {
    this.http.post<any>(`${this.api}/courses/${c.id}/enroll`, { employeeId: null }).subscribe({
      next: () => { this.enrollMsg = `Enrolled in ${c.title}`; setTimeout(() => this.enrollMsg = '', 3000); this.loadMyEnrollments(); this.loadCourses(); },
      error: err => { this.enrollMsg = err?.error?.message || 'Enrollment failed'; setTimeout(() => this.enrollMsg = '', 3000); }
    });
  }

  continueCourse(c: any) {
    const newProgress = Math.min((c.progress || 0) + 20, 100);
    this.http.patch<any>(`${this.api}/enrollments/${c.id}/progress`, { progressPercent: newProgress }).subscribe({
      next: () => { c.progress = newProgress; if (newProgress >= 100) this.completeCourse(c); }
    });
  }

  completeCourse(c: any) {
    this.http.post(`${this.api}/enrollments/${c.id}/complete`, {}).subscribe(() => { this.loadStats(); });
  }
}
