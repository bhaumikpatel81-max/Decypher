import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  BudgetService, FiscalYear, DashboardKpi, Forecast, ForecastRow,
  CostPerHire, VendorSpend, DepartmentBreakdown, TenantConfig,
  CostCategory, BudgetAllocation, BudgetActual
} from './budget.service';

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-budget',
  template: `
<div class="budget-shell">

  <!-- Top Bar -->
  <div class="budget-topbar">
    <div class="budget-topbar-left">
      <div class="fy-selector">
        <label>Fiscal Year</label>
        <select class="select" [(ngModel)]="selectedFyId" (change)="onFyChange()">
          <option *ngFor="let fy of fiscalYears" [value]="fy.id">{{fy.fiscalYearLabel}}</option>
        </select>
      </div>
    </div>
    <div class="budget-topbar-right">
      <button class="btn btn-outline btn-sm" (click)="exportExcel()" [disabled]="!selectedFyId">
        ⬇ Export Excel
      </button>
      <button class="btn btn-outline btn-sm" (click)="exportPpt()" [disabled]="!selectedFyId">
        📊 Export PPT
      </button>
    </div>
  </div>

  <!-- Import Strip -->
  <div class="budget-import-strip">
    <div class="import-strip-body">
      <div class="import-strip-left">
        <span style="font-size:20px">📥</span>
        <div>
          <div class="import-strip-title">Import Budget Data</div>
          <div class="import-strip-desc">Upload your budget Excel file to populate all budget data across all periods</div>
        </div>
      </div>
      <div class="import-strip-actions">
        <button class="btn btn-sm btn-outline-import" (click)="downloadBudgetTemplate()">📥 DOWNLOAD BLANK TEMPLATE</button>
        <button class="btn btn-sm btn-outline-import" (click)="budgetExcelInput.click()">📤 UPLOAD BUDGET EXCEL</button>
        <input #budgetExcelInput type="file" accept=".xlsx" style="display:none" (change)="onBudgetExcelUpload($event)">
      </div>
    </div>
    <div class="import-strip-sample">
      Are you a first timer?
      <a class="import-strip-link" (click)="downloadBudgetSample()">📎 VIEW & DOWNLOAD SAMPLE (pre-filled example)</a>
    </div>
    <div class="import-strip-result" *ngIf="budgetImportResult">
      <span *ngIf="budgetImportResult.totalErrors === 0" style="color:#059669">✅ Import complete — {{budgetImportResult.fiscalYears.imported + budgetImportResult.allocations.imported + budgetImportResult.lineItems.imported + budgetImportResult.actuals.imported}} rows imported across all sheets.</span>
      <span *ngIf="budgetImportResult.totalErrors > 0" style="color:#d97706">⚠️ Import complete with {{budgetImportResult.totalErrors}} error(s). Fiscal Years: {{budgetImportResult.fiscalYears.imported}} | Allocations: {{budgetImportResult.allocations.imported}} | Line Items: {{budgetImportResult.lineItems.imported}} | Actuals: {{budgetImportResult.actuals.imported}}</span>
    </div>
  </div>

  <!-- Tab Bar -->
  <div class="budget-tabs">
    <button *ngFor="let tab of tabs" class="budget-tab" [class.active]="activeTab === tab.key"
      (click)="setTab(tab.key)">
      <span class="tab-icon">{{tab.icon}}</span> {{tab.label}}
    </button>
  </div>

  <!-- ░░ DASHBOARD ░░ -->
  <div class="tab-content" *ngIf="activeTab === 'dashboard'">
    <div *ngIf="loading" class="loading-state">Loading dashboard…</div>
    <ng-container *ngIf="!loading && kpi">

      <!-- KPI Cards Row 1 -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Budget</div>
          <div class="kpi-value">{{kpi.totalBudget | currency:'USD':'symbol':'1.0-0'}}</div>
          <div class="kpi-sub">{{selectedFyLabel}}</div>
        </div>
        <div class="kpi-card kpi-card--spent">
          <div class="kpi-label">Total Spent</div>
          <div class="kpi-value">{{kpi.totalSpent | currency:'USD':'symbol':'1.0-0'}}</div>
          <div class="kpi-sub">{{kpi.utilizationPct | number:'1.1-1'}}% utilized</div>
        </div>
        <div class="kpi-card" [class.kpi-card--warn]="kpi.remaining < kpi.totalBudget * 0.1">
          <div class="kpi-label">Remaining</div>
          <div class="kpi-value">{{kpi.remaining | currency:'USD':'symbol':'1.0-0'}}</div>
          <div class="kpi-sub">Committed: {{kpi.totalCommitted | currency:'USD':'symbol':'1.0-0'}}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Utilization</div>
          <div class="kpi-value">{{kpi.utilizationPct | number:'1.1-1'}}%</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" [style.width.%]="kpi.utilizationPct"
              [class.progress-bar--warn]="kpi.utilizationPct > 90"
              [class.progress-bar--danger]="kpi.utilizationPct > 100"></div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Headcount</div>
          <div class="kpi-value">{{kpi.headcountFilled}} / {{kpi.headcountPlanned}}</div>
          <div class="kpi-sub">{{kpi.headcountInProgress}} in-progress</div>
        </div>
        <div class="kpi-card" [class.kpi-card--warn]="kpi.costPerHireActual > kpi.costPerHireTarget * 1.1">
          <div class="kpi-label">Cost Per Hire</div>
          <div class="kpi-value">{{kpi.costPerHireActual | currency:'USD':'symbol':'1.0-0'}}</div>
          <div class="kpi-sub">Target: {{kpi.costPerHireTarget | currency:'USD':'symbol':'1.0-0'}}</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-grid">

        <!-- Monthly Trend -->
        <div class="chart-card chart-card--wide">
          <div class="chart-title">Budget vs Actual — Monthly Trend</div>
          <div class="bar-chart" *ngIf="kpi.monthlyTrend?.length">
            <div class="bar-chart-inner">
              <div class="bar-group" *ngFor="let m of kpi.monthlyTrend">
                <div class="bar-pair">
                  <div class="bar bar--planned" [style.height.px]="scaleBar(m.planned, maxMonthly)"
                    [title]="'Planned: ' + (m.planned | currency:'USD':'symbol':'1.0-0')"></div>
                  <div class="bar bar--actual" [style.height.px]="scaleBar(m.actual, maxMonthly)"
                    [title]="'Actual: ' + (m.actual | currency:'USD':'symbol':'1.0-0')"></div>
                </div>
                <span class="bar-label">{{m.month}}</span>
              </div>
            </div>
            <div class="chart-legend">
              <span class="legend-dot legend-dot--planned"></span> Planned &nbsp;
              <span class="legend-dot legend-dot--actual"></span> Actual
            </div>
          </div>
          <div *ngIf="!kpi.monthlyTrend?.length" class="empty-chart">No trend data yet</div>
        </div>

        <!-- By Department -->
        <div class="chart-card">
          <div class="chart-title">Utilization by Department</div>
          <div class="hbar-list" *ngIf="kpi.budgetByDepartment?.length">
            <div class="hbar-row" *ngFor="let d of kpi.budgetByDepartment">
              <span class="hbar-label">{{d.department}}</span>
              <div class="hbar-track">
                <div class="hbar-fill"
                  [style.width.%]="d.planned > 0 ? min100(d.actual / d.planned * 100) : 0"
                  [class.hbar-fill--warn]="d.actual / d.planned > 0.9"
                  [class.hbar-fill--danger]="d.actual > d.planned">
                </div>
              </div>
              <span class="hbar-pct">{{d.planned > 0 ? (d.actual / d.planned * 100 | number:'1.0-0') : 0}}%</span>
            </div>
          </div>
          <div *ngIf="!kpi.budgetByDepartment?.length" class="empty-chart">No department data</div>
        </div>

        <!-- By Category (Donut) -->
        <div class="chart-card">
          <div class="chart-title">Spend by Category</div>
          <div class="donut-wrap" *ngIf="kpi.budgetByCategory?.length">
            <div class="donut" [style.background]="buildConicGradient(kpi.budgetByCategory)"></div>
            <div class="donut-legend">
              <div class="donut-legend-item" *ngFor="let c of kpi.budgetByCategory; let i = index">
                <span class="donut-swatch" [style.background]="categoryColors[i % categoryColors.length]"></span>
                <span>{{c.category}} ({{c.pct | number:'1.0-0'}}%)</span>
              </div>
            </div>
          </div>
          <div *ngIf="!kpi.budgetByCategory?.length" class="empty-chart">No spend data</div>
        </div>

        <!-- Quarterly Phasing -->
        <div class="chart-card">
          <div class="chart-title">Quarterly Budget Phasing</div>
          <div class="quarter-bars" *ngIf="kpi.budgetByQuarter?.length">
            <div class="quarter-bar-group" *ngFor="let q of kpi.budgetByQuarter">
              <div class="quarter-bar-wrap">
                <div class="quarter-bar quarter-bar--planned"
                  [style.height.px]="scaleBar(q.planned, maxQuarterly)"
                  [title]="'Planned: ' + (q.planned | currency:'USD':'symbol':'1.0-0')"></div>
                <div class="quarter-bar quarter-bar--actual"
                  [style.height.px]="scaleBar(q.actual, maxQuarterly)"
                  [title]="'Actual: ' + (q.actual | currency:'USD':'symbol':'1.0-0')"></div>
              </div>
              <span class="quarter-label">{{q.quarter}}</span>
            </div>
          </div>
          <div *ngIf="!kpi.budgetByQuarter?.length" class="empty-chart">No quarterly data</div>
        </div>

        <!-- Top Vendors -->
        <div class="chart-card">
          <div class="chart-title">Top Vendors by Spend</div>
          <div class="hbar-list" *ngIf="kpi.topVendorsBySpend?.length">
            <div class="hbar-row" *ngFor="let v of kpi.topVendorsBySpend">
              <span class="hbar-label">{{v.vendorName}}</span>
              <div class="hbar-track">
                <div class="hbar-fill hbar-fill--vendor"
                  [style.width.%]="maxVendorSpend > 0 ? (v.totalSpend / maxVendorSpend * 100) : 0">
                </div>
              </div>
              <span class="hbar-pct">{{v.totalSpend | currency:'USD':'symbol':'1.0-0'}}</span>
            </div>
          </div>
          <div *ngIf="!kpi.topVendorsBySpend?.length" class="empty-chart">No vendor data</div>
        </div>

      </div>
    </ng-container>
  </div>

  <!-- ░░ FORECAST ░░ -->
  <div class="tab-content" *ngIf="activeTab === 'forecast'">
    <div class="tab-toolbar">
      <button class="btn btn-primary btn-sm" (click)="openAddAllocationDrawer()">+ Add Allocation</button>
      <button class="btn btn-outline btn-sm" (click)="loadForecast()">↻ Refresh</button>
    </div>

    <div *ngIf="forecast">
      <div class="forecast-table-wrap">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Q1 Planned</th>
              <th>Q2 Planned</th>
              <th>Q3 Planned</th>
              <th>Q4 Planned</th>
              <th>Total Planned</th>
              <th>Total Actual</th>
              <th>Headcount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of forecast.rows">
              <td><strong>{{row.department}}</strong><br><small>{{row.departmentCode}}</small></td>
              <td class="num-cell">
                <span *ngIf="!editingRow[row.department + '_Q1']"
                  (click)="startEditCell(row, 'Q1')" class="editable-cell">
                  {{row.q1Planned | currency:'USD':'symbol':'1.0-0'}}
                </span>
                <input *ngIf="editingRow[row.department + '_Q1']" type="number"
                  [value]="row.q1Planned" class="cell-input"
                  (blur)="saveAllocationQuarter(row, 'Q1', $event)"
                  (keyup.enter)="saveAllocationQuarter(row, 'Q1', $event)">
              </td>
              <td class="num-cell">
                <span *ngIf="!editingRow[row.department + '_Q2']"
                  (click)="startEditCell(row, 'Q2')" class="editable-cell">
                  {{row.q2Planned | currency:'USD':'symbol':'1.0-0'}}
                </span>
                <input *ngIf="editingRow[row.department + '_Q2']" type="number"
                  [value]="row.q2Planned" class="cell-input"
                  (blur)="saveAllocationQuarter(row, 'Q2', $event)"
                  (keyup.enter)="saveAllocationQuarter(row, 'Q2', $event)">
              </td>
              <td class="num-cell">
                <span *ngIf="!editingRow[row.department + '_Q3']"
                  (click)="startEditCell(row, 'Q3')" class="editable-cell">
                  {{row.q3Planned | currency:'USD':'symbol':'1.0-0'}}
                </span>
                <input *ngIf="editingRow[row.department + '_Q3']" type="number"
                  [value]="row.q3Planned" class="cell-input"
                  (blur)="saveAllocationQuarter(row, 'Q3', $event)"
                  (keyup.enter)="saveAllocationQuarter(row, 'Q3', $event)">
              </td>
              <td class="num-cell">
                <span *ngIf="!editingRow[row.department + '_Q4']"
                  (click)="startEditCell(row, 'Q4')" class="editable-cell">
                  {{row.q4Planned | currency:'USD':'symbol':'1.0-0'}}
                </span>
                <input *ngIf="editingRow[row.department + '_Q4']" type="number"
                  [value]="row.q4Planned" class="cell-input"
                  (blur)="saveAllocationQuarter(row, 'Q4', $event)"
                  (keyup.enter)="saveAllocationQuarter(row, 'Q4', $event)">
              </td>
              <td class="num-cell total-cell">{{row.totalPlanned | currency:'USD':'symbol':'1.0-0'}}</td>
              <td class="num-cell" [class.over-budget]="row.totalActual > row.totalPlanned">
                {{row.totalActual | currency:'USD':'symbol':'1.0-0'}}
              </td>
              <td class="num-cell">{{row.headcountPlanned}}</td>
              <td>
                <button class="btn btn-ghost btn-xs" (click)="toggleLineItems(row.department)">
                  {{expandedDepts[row.department] ? '▲' : '▼'}} Details
                </button>
              </td>
            </tr>
            <!-- Line item detail row -->
            <tr *ngIf="expandedDepts[row.department]"
              class="line-item-row">
              <td colspan="9">
                <div class="line-item-panel" *ngIf="lineItemsByDept[row.department]?.length">
                  <div class="line-item-grid-header">
                    <span>Type</span><span>Planned</span><span>Actual</span><span>Variance</span>
                  </div>
                  <div class="line-item-grid-row" *ngFor="let li of lineItemsByDept[row.department]">
                    <span>{{li.lineItemType}}</span>
                    <span>{{li.plannedAmount | currency:'USD':'symbol':'1.0-0'}}</span>
                    <span>{{(li.actualAmount || 0) | currency:'USD':'symbol':'1.0-0'}}</span>
                    <span [class.text-danger]="li.plannedAmount < (li.actualAmount || 0)">
                      {{(li.plannedAmount - (li.actualAmount || 0)) | currency:'USD':'symbol':'1.0-0'}}
                    </span>
                  </div>
                </div>
                <div *ngIf="!lineItemsByDept[row.department]?.length" class="empty-line-items">
                  No line items yet.
                  <button class="btn btn-ghost btn-xs" (click)="addLineItemForDept(row.department)">+ Add</button>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="totals-row">
              <td><strong>TOTAL</strong></td>
              <td class="num-cell">{{forecast.totals.q1Planned | currency:'USD':'symbol':'1.0-0'}}</td>
              <td class="num-cell">{{forecast.totals.q2Planned | currency:'USD':'symbol':'1.0-0'}}</td>
              <td class="num-cell">{{forecast.totals.q3Planned | currency:'USD':'symbol':'1.0-0'}}</td>
              <td class="num-cell">{{forecast.totals.q4Planned | currency:'USD':'symbol':'1.0-0'}}</td>
              <td class="num-cell total-cell">{{forecast.totals.total | currency:'USD':'symbol':'1.0-0'}}</td>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div *ngIf="!forecast" class="empty-state">Select a fiscal year to view the forecast.</div>

    <!-- Add Allocation Drawer -->
    <div class="drawer-overlay" *ngIf="showAllocDrawer" (click)="showAllocDrawer = false"></div>
    <div class="drawer" [class.drawer--open]="showAllocDrawer">
      <div class="drawer-header">
        <h3>Add Allocation</h3>
        <button class="btn btn-ghost btn-sm" (click)="showAllocDrawer = false">✕</button>
      </div>
      <div class="drawer-body">
        <label>Department Name</label>
        <input class="input" [(ngModel)]="newAlloc.departmentName" placeholder="Engineering">
        <label>Department Code</label>
        <input class="input" [(ngModel)]="newAlloc.departmentCode" placeholder="ENG">
        <label>Quarter</label>
        <select class="select" [(ngModel)]="newAlloc.quarter">
          <option value="0">Q1</option><option value="1">Q2</option>
          <option value="2">Q3</option><option value="3">Q4</option>
        </select>
        <label>Category</label>
        <select class="select" [(ngModel)]="newAlloc.category">
          <option value="0">Permanent</option><option value="1">Contract</option>
          <option value="2">Intern</option><option value="3">Replacement</option><option value="4">NewRole</option>
        </select>
        <label>Headcount Planned</label>
        <input class="input" type="number" [(ngModel)]="newAlloc.headcountPlanned">
        <label>Allotted Amount</label>
        <input class="input" type="number" [(ngModel)]="newAlloc.allottedAmount">
        <label>Notes</label>
        <textarea class="textarea" [(ngModel)]="newAlloc.notes" rows="2"></textarea>
        <button class="btn btn-primary" (click)="saveAllocation()">Save Allocation</button>
      </div>
    </div>
  </div>

  <!-- ░░ ACTUALS ░░ -->
  <div class="tab-content" *ngIf="activeTab === 'actuals'">
    <!-- Filter Bar -->
    <div class="filter-bar">
      <input class="input input--sm" placeholder="Filter department…" [(ngModel)]="actualsFilter.dept"
        (input)="filterActuals()">
      <select class="select select--sm" [(ngModel)]="actualsFilter.category" (change)="filterActuals()">
        <option value="">All Categories</option>
        <option *ngFor="let c of spendCategories" [value]="c">{{c}}</option>
      </select>
      <input class="input input--sm" type="date" [(ngModel)]="actualsFilter.from" (change)="filterActuals()" placeholder="From">
      <input class="input input--sm" type="date" [(ngModel)]="actualsFilter.to" (change)="filterActuals()" placeholder="To">
      <button class="btn btn-primary btn-sm" (click)="showActualDrawer = true">+ Add Actual</button>
    </div>

    <!-- Actuals Table -->
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th><th>Department</th><th>Category</th>
            <th class="num-th">Amount</th><th>Vendor</th>
            <th>Invoice Ref</th><th>Variance</th><th>Approved</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of filteredActuals">
            <td>{{a.spendDate | date:'mediumDate'}}</td>
            <td>{{a.departmentName}}</td>
            <td><span class="chip chip-sm">{{a.spendCategory}}</span></td>
            <td class="num-cell">{{a.amount | currency:'USD':'symbol':'1.0-0'}}</td>
            <td>{{a.vendorName}}</td>
            <td>{{a.invoiceReference}}</td>
            <td>
              <span class="variance-pill" [class.pill--green]="getVariance(a) >= 0"
                [class.pill--red]="getVariance(a) < 0">
                {{getVariance(a) | currency:'USD':'symbol':'1.0-0'}}
              </span>
            </td>
            <td>
              <span class="status-dot" [class.dot--green]="a.isApproved" [class.dot--amber]="!a.isApproved">
                {{a.isApproved ? '✓ Approved' : '⏳ Pending'}}
              </span>
            </td>
            <td>
              <button class="btn btn-ghost btn-xs" (click)="approveActual(a)" *ngIf="!a.isApproved">Approve</button>
              <button class="btn btn-ghost btn-xs btn--danger" (click)="deleteActualEntry(a.id)">Del</button>
            </td>
          </tr>
          <tr *ngIf="!filteredActuals.length">
            <td colspan="9" class="empty-state">No actuals found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Actual Drawer -->
    <div class="drawer-overlay" *ngIf="showActualDrawer" (click)="showActualDrawer = false"></div>
    <div class="drawer" [class.drawer--open]="showActualDrawer">
      <div class="drawer-header">
        <h3>Log Actual Spend</h3>
        <button class="btn btn-ghost btn-sm" (click)="showActualDrawer = false">✕</button>
      </div>
      <div class="drawer-body">
        <label>Spend Date</label>
        <input class="input" type="date" [(ngModel)]="newActual.spendDate">
        <label>Department</label>
        <input class="input" [(ngModel)]="newActual.departmentName" placeholder="Engineering">
        <label>Category</label>
        <select class="select" [(ngModel)]="newActual.spendCategory">
          <option *ngFor="let c of spendCategories" [value]="c">{{c}}</option>
        </select>
        <label>Amount</label>
        <input class="input" type="number" [(ngModel)]="newActual.amount">
        <label>Invoice Reference</label>
        <input class="input" [(ngModel)]="newActual.invoiceReference">
        <label>Notes</label>
        <textarea class="textarea" [(ngModel)]="newActual.notes" rows="2"></textarea>
        <button class="btn btn-primary" (click)="saveActual()">Save</button>
      </div>
    </div>
  </div>

  <!-- ░░ REPORTS ░░ -->
  <div class="tab-content" *ngIf="activeTab === 'reports'">
    <div class="reports-tabs">
      <button *ngFor="let r of reportTypes" class="report-tab"
        [class.active]="activeReport === r.key" (click)="activeReport = r.key">
        {{r.label}}
      </button>
    </div>

    <!-- Budget Summary Report -->
    <div *ngIf="activeReport === 'summary'">
      <div class="report-toolbar">
        <h3>Budget Summary Report</h3>
        <div class="report-actions">
          <button class="btn btn-outline btn-sm" (click)="exportExcel('summary')">⬇ Excel</button>
          <button class="btn btn-outline btn-sm" (click)="exportPpt()">📊 PPT</button>
        </div>
      </div>
      <div class="report-table-wrap" *ngIf="kpi">
        <table class="data-table">
          <tr><td>Total Budget</td><td class="num-cell">{{kpi.totalBudget | currency}}</td></tr>
          <tr><td>Total Spent</td><td class="num-cell">{{kpi.totalSpent | currency}}</td></tr>
          <tr><td>Remaining</td><td class="num-cell">{{kpi.remaining | currency}}</td></tr>
          <tr><td>Utilization %</td><td class="num-cell">{{kpi.utilizationPct | number:'1.1-1'}}%</td></tr>
          <tr><td>Headcount Planned</td><td class="num-cell">{{kpi.headcountPlanned}}</td></tr>
          <tr><td>Headcount Filled</td><td class="num-cell">{{kpi.headcountFilled}}</td></tr>
          <tr><td>Cost Per Hire (Actual)</td><td class="num-cell">{{kpi.costPerHireActual | currency}}</td></tr>
          <tr><td>Cost Per Hire (Target)</td><td class="num-cell">{{kpi.costPerHireTarget | currency}}</td></tr>
        </table>
      </div>
    </div>

    <!-- Cost Per Hire Report -->
    <div *ngIf="activeReport === 'cph' && cph">
      <div class="report-toolbar">
        <h3>Cost Per Hire Report</h3>
        <button class="btn btn-outline btn-sm" (click)="exportExcel('cost-per-hire')">⬇ Excel</button>
      </div>
      <div class="kpi-mini-grid">
        <div class="kpi-mini"><span>Overall CPH</span><strong>{{cph.overallCostPerHire | currency}}</strong></div>
        <div class="kpi-mini"><span>Target CPH</span><strong>{{cph.targetCostPerHire | currency}}</strong></div>
        <div class="kpi-mini"><span>Total Hires</span><strong>{{cph.totalHires}}</strong></div>
        <div class="kpi-mini"><span>Total Spend</span><strong>{{cph.totalSpend | currency}}</strong></div>
      </div>
      <table class="data-table">
        <thead><tr><th>Category</th><th class="num-th">Amount</th><th class="num-th">% of Total</th></tr></thead>
        <tbody>
          <tr *ngFor="let c of cph.byCategory">
            <td>{{c.category}}</td>
            <td class="num-cell">{{c.amount | currency}}</td>
            <td class="num-cell">{{c.pctOfTotal | number:'1.1-1'}}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Department Report -->
    <div *ngIf="activeReport === 'dept' && departments?.length">
      <div class="report-toolbar">
        <h3>Department Budget Report</h3>
        <button class="btn btn-outline btn-sm" (click)="exportExcel('department')">⬇ Excel</button>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Department</th><th class="num-th">Planned</th><th class="num-th">Actual</th>
              <th class="num-th">Variance</th><th class="num-th">Utilization</th>
              <th class="num-th">HC Planned</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let d of departments">
            <td>{{d.department}}</td>
            <td class="num-cell">{{d.plannedBudget | currency:'USD':'symbol':'1.0-0'}}</td>
            <td class="num-cell">{{d.actualSpend | currency:'USD':'symbol':'1.0-0'}}</td>
            <td class="num-cell" [class.text-danger]="d.variance < 0">
              {{d.variance | currency:'USD':'symbol':'1.0-0'}}
            </td>
            <td class="num-cell">
              <div class="mini-progress">
                <div class="mini-bar" [style.width.%]="min100(d.utilizationPct)"
                  [class.mini-bar--warn]="d.utilizationPct > 90"
                  [class.mini-bar--danger]="d.utilizationPct > 100"></div>
              </div>
              {{d.utilizationPct | number:'1.0-0'}}%
            </td>
            <td class="num-cell">{{d.headcountPlanned}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vendor Spend Report -->
    <div *ngIf="activeReport === 'vendor' && vendorSpend?.length">
      <div class="report-toolbar">
        <h3>Vendor Spend Report</h3>
        <button class="btn btn-outline btn-sm" (click)="exportExcel('vendor-spend')">⬇ Excel</button>
      </div>
      <table class="data-table">
        <thead><tr><th>Vendor</th><th class="num-th">Total Spend</th><th class="num-th">Transactions</th></tr></thead>
        <tbody>
          <tr *ngFor="let v of vendorSpend">
            <td>{{v.vendorName}}</td>
            <td class="num-cell">{{v.totalSpend | currency}}</td>
            <td class="num-cell">{{v.transactionCount}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Headcount vs Budget -->
    <div *ngIf="activeReport === 'hc' && kpi">
      <div class="report-toolbar">
        <h3>Headcount vs Budget Report</h3>
        <button class="btn btn-outline btn-sm" (click)="exportExcel('summary')">⬇ Excel</button>
      </div>
      <div class="kpi-mini-grid">
        <div class="kpi-mini"><span>HC Planned</span><strong>{{kpi.headcountPlanned}}</strong></div>
        <div class="kpi-mini"><span>HC Filled</span><strong>{{kpi.headcountFilled}}</strong></div>
        <div class="kpi-mini"><span>In Progress</span><strong>{{kpi.headcountInProgress}}</strong></div>
        <div class="kpi-mini"><span>Fill Rate</span>
          <strong>{{kpi.headcountPlanned ? (kpi.headcountFilled / kpi.headcountPlanned * 100 | number:'1.0-0') : 0}}%</strong>
        </div>
      </div>
      <table class="data-table">
        <thead><tr><th>Department</th><th class="num-th">Planned</th><th class="num-th">Actual Spend</th><th class="num-th">Utilization</th></tr></thead>
        <tbody>
          <tr *ngFor="let d of kpi.budgetByDepartment">
            <td>{{d.department}}</td>
            <td class="num-cell">{{d.planned | currency:'USD':'symbol':'1.0-0'}}</td>
            <td class="num-cell">{{d.actual | currency:'USD':'symbol':'1.0-0'}}</td>
            <td class="num-cell">{{d.planned > 0 ? (d.actual / d.planned * 100 | number:'1.0-0') : 0}}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Compliance / Audit Trail -->
    <div *ngIf="activeReport === 'audit'">
      <div class="report-toolbar">
        <h3>Compliance / Audit Trail</h3>
      </div>
      <table class="data-table">
        <thead><tr><th>Date</th><th>Dept</th><th>Category</th><th class="num-th">Amount</th><th>Approved</th><th>Invoice</th></tr></thead>
        <tbody>
          <tr *ngFor="let a of actuals">
            <td>{{a.spendDate | date:'mediumDate'}}</td>
            <td>{{a.departmentName}}</td>
            <td>{{a.spendCategory}}</td>
            <td class="num-cell">{{a.amount | currency}}</td>
            <td><span [class.chip-green]="a.isApproved" [class.chip-amber]="!a.isApproved" class="chip chip-sm">
              {{a.isApproved ? 'Approved' : 'Pending'}}
            </span></td>
            <td>{{a.invoiceReference}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div *ngIf="!selectedFyId" class="empty-state">Select a fiscal year to generate reports.</div>
  </div>

  <!-- ░░ SETTINGS ░░ -->
  <div class="tab-content" *ngIf="activeTab === 'settings'">
    <div class="settings-grid">

      <!-- Fiscal Year Management -->
      <div class="settings-card">
        <h3>Fiscal Year Management</h3>
        <div class="fy-list">
          <div class="fy-item" *ngFor="let fy of fiscalYears">
            <div class="fy-item-info">
              <strong>{{fy.fiscalYearLabel}}</strong>
              <span class="chip chip-sm" [class]="'status-' + fy.status.toLowerCase()">{{fy.status}}</span>
            </div>
            <div class="fy-item-meta">
              {{fy.startDate | date:'mediumDate'}} – {{fy.endDate | date:'mediumDate'}} &nbsp;|&nbsp;
              {{fy.totalBudgetAmount | currency:'USD':'symbol':'1.0-0'}}
            </div>
            <div class="fy-actions">
              <button class="btn btn-ghost btn-xs" (click)="lockFY(fy)" *ngIf="fy.status !== 'Locked'">🔒 Lock</button>
              <button class="btn btn-ghost btn-xs" (click)="cloneFY(fy)">📋 Clone</button>
            </div>
          </div>
        </div>
        <div class="fy-create">
          <h4>Create New Fiscal Year</h4>
          <input class="input" placeholder="Label e.g. FY 2026-27" [(ngModel)]="newFy.label">
          <div class="date-row">
            <input class="input" type="date" [(ngModel)]="newFy.startDate">
            <input class="input" type="date" [(ngModel)]="newFy.endDate">
          </div>
          <input class="input" type="number" placeholder="Total Budget" [(ngModel)]="newFy.totalBudgetAmount">
          <button class="btn btn-primary" (click)="createFiscalYear()">Create Fiscal Year</button>
        </div>
      </div>

      <!-- Tenant Config -->
      <div class="settings-card">
        <h3>Tenant Configuration</h3>
        <ng-container *ngIf="tenantConfig">
          <label>Fiscal Year Start Month (1=Jan, 4=Apr)</label>
          <input class="input" type="number" min="1" max="12" [(ngModel)]="tenantConfig.fiscalYearStartMonth">
          <label>Default Currency</label>
          <select class="select" [(ngModel)]="tenantConfig.defaultCurrency">
            <option value="USD">USD</option><option value="EUR">EUR</option>
            <option value="GBP">GBP</option><option value="INR">INR</option>
            <option value="CAD">CAD</option><option value="AUD">AUD</option>
          </select>
          <label>Cost Per Hire Target</label>
          <input class="input" type="number" [(ngModel)]="tenantConfig.costPerHireTargetAmount">
          <label>Approval Threshold Amount</label>
          <input class="input" type="number" [(ngModel)]="tenantConfig.approvalThresholdAmount">
          <label>Brand Color</label>
          <input class="input" type="color" [(ngModel)]="tenantConfig.brandColor">
          <label class="toggle-label">
            <input type="checkbox" [(ngModel)]="tenantConfig.budgetApprovalRequired">
            Budget Approval Required
          </label>
          <button class="btn btn-primary" (click)="saveConfig()">Save Configuration</button>
        </ng-container>
      </div>

      <!-- Cost Categories -->
      <div class="settings-card settings-card--wide">
        <h3>Cost Categories</h3>
        <p class="settings-hint">Tenant-customizable spend categories used throughout the budget module.</p>
        <div class="category-list">
          <div class="category-row" *ngFor="let cat of costCategories">
            <span class="drag-handle">⠿</span>
            <input class="input input--sm" [(ngModel)]="cat.categoryName">
            <input class="input input--sm code-input" [(ngModel)]="cat.categoryCode">
            <input class="input input--sm num-input" type="number" [(ngModel)]="cat.defaultEstimatePerHire"
              placeholder="Default CPH">
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="cat.isActive"> Active
            </label>
            <button class="btn btn-ghost btn-xs" (click)="saveCostCategory(cat)">Save</button>
          </div>
        </div>
        <div class="add-category-form">
          <input class="input input--sm" [(ngModel)]="newCat.categoryName" placeholder="Category Name">
          <input class="input input--sm code-input" [(ngModel)]="newCat.categoryCode" placeholder="Code">
          <input class="input input--sm num-input" type="number" [(ngModel)]="newCat.defaultEstimatePerHire"
            placeholder="Default CPH">
          <button class="btn btn-primary btn-sm" (click)="addCostCategory()">+ Add Category</button>
        </div>
      </div>

    </div>
  </div>

</div>
  `,
  styles: [`
    .budget-shell {
      padding: 0;
      height: 100%;
    }
    .budget-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: var(--surface, #fff);
      border-bottom: 1px solid var(--border, #e2e8f0);
      gap: 16px;
      flex-wrap: wrap;
    }
    .budget-topbar-left, .budget-topbar-right { display: flex; align-items: center; gap: 12px; }
    .fy-selector { display: flex; align-items: center; gap: 8px; }
    .fy-selector label { font-size: 12px; font-weight: 700; color: #64748b; white-space: nowrap; }
    .budget-tabs {
      display: flex;
      background: var(--surface, #fff);
      border-bottom: 2px solid #e2e8f0;
      padding: 0 24px;
      overflow-x: auto;
    }
    .budget-tab {
      padding: 12px 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      color: #64748b;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      white-space: nowrap;
      transition: color .15s, border-color .15s;
    }
    .budget-tab.active { color: #1565C0; border-bottom-color: #1565C0; }
    .tab-icon { margin-right: 6px; }
    .tab-content { padding: 24px; overflow-y: auto; }

    /* KPI Cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .kpi-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .kpi-card--spent { border-left: 4px solid #1565C0; }
    .kpi-card--warn { border-left: 4px solid #f59e0b; }
    .kpi-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: .5px; }
    .kpi-value { font-size: 24px; font-weight: 800; color: #0f172a; margin: 4px 0; }
    .kpi-sub { font-size: 12px; color: #94a3b8; }
    .progress-bar-wrap { height: 6px; background: #e2e8f0; border-radius: 3px; margin-top: 8px; overflow: hidden; }
    .progress-bar { height: 100%; background: #1565C0; border-radius: 3px; transition: width .3s; }
    .progress-bar--warn { background: #f59e0b; }
    .progress-bar--danger { background: #ef4444; }

    /* Charts */
    .charts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr; } }
    .chart-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .chart-card--wide { grid-column: 1 / -1; }
    .chart-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
    .empty-chart { color: #94a3b8; font-size: 13px; text-align: center; padding: 32px; }

    /* Bar Chart */
    .bar-chart { overflow-x: auto; }
    .bar-chart-inner { display: flex; align-items: flex-end; gap: 8px; min-height: 120px; padding-bottom: 24px; }
    .bar-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .bar-pair { display: flex; align-items: flex-end; gap: 2px; }
    .bar { width: 18px; border-radius: 3px 3px 0 0; min-height: 2px; transition: height .3s; }
    .bar--planned { background: #bfdbfe; }
    .bar--actual { background: #1565C0; }
    .bar-label { font-size: 10px; color: #64748b; white-space: nowrap; }
    .chart-legend { display: flex; gap: 16px; margin-top: 8px; font-size: 12px; color: #64748b; }
    .legend-dot { display: inline-block; width: 10px; height: 10px; border-radius: 2px; }
    .legend-dot--planned { background: #bfdbfe; }
    .legend-dot--actual { background: #1565C0; }

    /* Horizontal Bar */
    .hbar-list { display: flex; flex-direction: column; gap: 10px; }
    .hbar-row { display: flex; align-items: center; gap: 8px; }
    .hbar-label { font-size: 12px; color: #334155; min-width: 100px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .hbar-track { flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
    .hbar-fill { height: 100%; background: #1565C0; border-radius: 4px; transition: width .3s; }
    .hbar-fill--warn { background: #f59e0b; }
    .hbar-fill--danger { background: #ef4444; }
    .hbar-fill--vendor { background: #7c3aed; }
    .hbar-pct { font-size: 11px; color: #64748b; min-width: 60px; text-align: right; }

    /* Donut */
    .donut-wrap { display: flex; align-items: center; gap: 20px; }
    .donut { width: 120px; height: 120px; border-radius: 50%; flex-shrink: 0; }
    .donut-legend { display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .donut-legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; }
    .donut-swatch { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }

    /* Quarter bars */
    .quarter-bars { display: flex; gap: 20px; align-items: flex-end; padding-bottom: 20px; min-height: 100px; }
    .quarter-bar-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .quarter-bar-wrap { display: flex; align-items: flex-end; gap: 3px; }
    .quarter-bar { width: 28px; border-radius: 3px 3px 0 0; min-height: 2px; }
    .quarter-bar--planned { background: #bfdbfe; }
    .quarter-bar--actual { background: #1565C0; }
    .quarter-label { font-size: 12px; color: #64748b; font-weight: 700; }

    /* Forecast Table */
    .tab-toolbar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .forecast-table-wrap { overflow-x: auto; }
    .forecast-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .forecast-table th, .forecast-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
    }
    .forecast-table th { background: #1565C0; color: #fff; font-weight: 600; font-size: 12px; }
    .forecast-table tbody tr:hover { background: #f8fafc; }
    .num-cell { text-align: right; font-variant-numeric: tabular-nums; }
    .total-cell { font-weight: 700; }
    .over-budget { color: #ef4444; }
    .totals-row td { background: #f1f5f9; font-weight: 700; }
    .editable-cell { cursor: pointer; border-bottom: 1px dashed #94a3b8; }
    .editable-cell:hover { color: #1565C0; }
    .cell-input { width: 100%; border: 1px solid #1565C0; border-radius: 4px; padding: 4px 6px; font-size: 13px; }
    .line-item-row td { background: #f8fafc; }
    .line-item-panel { padding: 8px 0; }
    .line-item-grid-header, .line-item-grid-row {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 12px;
      padding: 4px 8px; font-size: 12px;
    }
    .line-item-grid-header { font-weight: 700; color: #64748b; }
    .empty-line-items { color: #94a3b8; font-size: 12px; padding: 8px; }

    /* Filter Bar */
    .filter-bar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
    .input--sm { height: 34px; font-size: 13px; padding: 0 10px; }
    .select--sm { height: 34px; font-size: 13px; padding: 0 8px; }

    /* Data Table */
    .table-wrap { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table th, .data-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
    .data-table th { background: #1565C0; color: #fff; font-weight: 600; font-size: 12px; }
    .data-table tbody tr:nth-child(even) { background: #f8fafc; }
    .data-table tbody tr:hover { background: #eff6ff; }
    .num-th { text-align: right; }

    /* Variance & Status */
    .variance-pill {
      display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;
    }
    .pill--green { background: #dcfce7; color: #166534; }
    .pill--red { background: #fee2e2; color: #991b1b; }
    .status-dot { font-size: 12px; }
    .dot--green { color: #16a34a; }
    .dot--amber { color: #d97706; }

    /* Drawer */
    .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.3); z-index: 100; }
    .drawer {
      position: fixed; right: 0; top: 0; bottom: 0; width: 380px;
      background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,.1);
      z-index: 101; transform: translateX(100%); transition: transform .25s;
      display: flex; flex-direction: column;
    }
    .drawer--open { transform: translateX(0); }
    .drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #e2e8f0; }
    .drawer-header h3 { margin: 0; font-size: 16px; }
    .drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }
    .drawer-body label { font-size: 12px; font-weight: 700; color: #475569; }

    /* Reports */
    .reports-tabs {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;
    }
    .report-tab {
      padding: 6px 16px; border: 1px solid #e2e8f0; border-radius: 20px;
      background: #f8fafc; cursor: pointer; font-size: 13px; font-weight: 600; color: #334155;
    }
    .report-tab.active { background: #1565C0; color: #fff; border-color: #1565C0; }
    .report-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .report-toolbar h3 { margin: 0; font-size: 16px; }
    .report-actions { display: flex; gap: 8px; }
    .report-table-wrap { overflow-x: auto; }
    .kpi-mini-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
    .kpi-mini { background: #f1f5f9; border-radius: 8px; padding: 12px 16px; display: flex; flex-direction: column; gap: 2px; min-width: 140px; }
    .kpi-mini span { font-size: 11px; color: #64748b; font-weight: 600; }
    .kpi-mini strong { font-size: 18px; font-weight: 800; color: #0f172a; }
    .mini-progress { display: inline-block; width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; vertical-align: middle; margin-right: 4px; }
    .mini-bar { height: 100%; background: #1565C0; border-radius: 3px; }
    .mini-bar--warn { background: #f59e0b; }
    .mini-bar--danger { background: #ef4444; }

    /* Settings */
    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 900px) { .settings-grid { grid-template-columns: 1fr; } }
    .settings-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
    .settings-card--wide { grid-column: 1 / -1; }
    .settings-card h3 { margin: 0 0 16px; font-size: 15px; color: #0f172a; }
    .settings-hint { font-size: 12px; color: #64748b; margin: -8px 0 16px; }
    .fy-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .fy-item { background: #f8fafc; border-radius: 8px; padding: 12px 16px; }
    .fy-item-info { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
    .fy-item-meta { font-size: 12px; color: #64748b; }
    .fy-actions { display: flex; gap: 8px; margin-top: 8px; }
    .fy-create { border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 10px; }
    .fy-create h4 { margin: 0; font-size: 13px; color: #475569; }
    .date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .toggle-label { display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; }
    .category-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .category-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .drag-handle { color: #94a3b8; cursor: grab; font-size: 16px; }
    .code-input { max-width: 80px; }
    .num-input { max-width: 100px; }
    .add-category-form { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    .status-draft { background: #f1f5f9; color: #475569; }
    .status-active { background: #dcfce7; color: #166534; }
    .status-locked { background: #fee2e2; color: #991b1b; }
    .status-archived { background: #fef9c3; color: #92400e; }

    .chip-sm { font-size: 10px; padding: 2px 8px; border-radius: 10px; display: inline-block; background: #f1f5f9; }
    .chip-green { background: #dcfce7; color: #166534; }
    .chip-amber { background: #fef3c7; color: #92400e; }
    .text-danger { color: #ef4444; }
    .empty-state { text-align: center; color: #94a3b8; padding: 48px; font-size: 14px; }
    .loading-state { text-align: center; color: #1565C0; padding: 48px; font-size: 14px; }

    .btn-xs { height: 24px; font-size: 11px; padding: 0 8px; }
    .btn--danger { color: #ef4444; }
    .btn-outline { border: 1px solid #e2e8f0; background: #fff; color: #334155; }
    .btn-outline:hover { background: #f8fafc; }

    .budget-import-strip {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 10px;
      margin: 12px 24px 4px;
      padding: 14px 20px;
    }
    .import-strip-body { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .import-strip-left { display: flex; align-items: center; gap: 12px; }
    .import-strip-title { font-size: 14px; font-weight: 700; color: #0c4a6e; }
    .import-strip-desc { font-size: 12px; color: #0369a1; margin-top: 2px; }
    .import-strip-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn-outline-import { background: #fff; border: 1.5px solid #0891b2; color: #0891b2; border-radius: 7px; padding: 7px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; white-space: nowrap; }
    .btn-outline-import:hover { background: #e0f2fe; }
    .import-strip-sample { margin-top: 10px; font-size: 12px; color: #374151; }
    .import-strip-link { color: #0891b2; font-weight: 600; cursor: pointer; text-decoration: underline; margin-left: 4px; }
    .import-strip-link:hover { color: #0369a1; }
    .import-strip-result { margin-top: 8px; font-size: 13px; font-weight: 500; }
  `]
})
export class BudgetComponent implements OnInit {
  activeTab: string = 'dashboard';
  selectedFyId: string = '';
  selectedFyLabel: string = '';
  loading = false;

  fiscalYears: FiscalYear[] = [];
  kpi: DashboardKpi | null = null;
  forecast: Forecast | null = null;
  cph: CostPerHire | null = null;
  vendorSpend: VendorSpend[] = [];
  departments: DepartmentBreakdown[] = [];
  actuals: BudgetActual[] = [];
  filteredActuals: BudgetActual[] = [];
  allocations: BudgetAllocation[] = [];
  tenantConfig: TenantConfig | null = null;
  costCategories: CostCategory[] = [];
  budgetImportResult: any = null;

  tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'forecast',  label: 'Forecast',  icon: '📅' },
    { key: 'actuals',   label: 'Actuals',   icon: '💰' },
    { key: 'reports',   label: 'Reports',   icon: '📋' },
    { key: 'settings',  label: 'Settings',  icon: '⚙️' }
  ];

  reportTypes = [
    { key: 'summary', label: 'Budget Summary' },
    { key: 'cph',     label: 'Cost Per Hire' },
    { key: 'dept',    label: 'Department Budget' },
    { key: 'vendor',  label: 'Vendor Spend' },
    { key: 'hc',      label: 'Headcount vs Budget' },
    { key: 'audit',   label: 'Compliance / Audit' }
  ];
  activeReport = 'summary';

  spendCategories = ['BaseSalary','SigningBonus','AgencyFee','BackgroundCheck',
    'RelocationCost','TrainingCost','EquipmentCost','Other'];

  categoryColors = ['#1565C0','#0ea5e9','#8b5cf6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4'];

  editingRow: { [key: string]: boolean } = {};
  expandedDepts: { [dept: string]: boolean } = {};
  lineItemsByDept: { [dept: string]: any[] } = {};

  actualsFilter = { dept: '', category: '', from: '', to: '' };
  showActualDrawer = false;
  showAllocDrawer = false;

  newActual: any = { spendDate: new Date().toISOString().slice(0, 10), departmentName: '', spendCategory: 'Other', amount: 0, invoiceReference: '', notes: '' };
  newAlloc: any = { departmentName: '', departmentCode: '', quarter: 0, category: 0, headcountPlanned: 1, allottedAmount: 0, notes: '' };
  newFy: any = { label: '', startDate: '', endDate: '', totalBudgetAmount: 0 };
  newCat: any = { categoryName: '', categoryCode: '', defaultEstimatePerHire: null };

  // Chart scale helpers
  get maxMonthly(): number {
    if (!this.kpi?.monthlyTrend?.length) return 1;
    return Math.max(...this.kpi.monthlyTrend.flatMap(m => [m.planned, m.actual]), 1);
  }
  get maxQuarterly(): number {
    if (!this.kpi?.budgetByQuarter?.length) return 1;
    return Math.max(...this.kpi.budgetByQuarter.flatMap(q => [q.planned, q.actual]), 1);
  }
  get maxVendorSpend(): number {
    if (!this.kpi?.topVendorsBySpend?.length) return 1;
    return Math.max(...this.kpi.topVendorsBySpend.map(v => v.totalSpend), 1);
  }

  scaleBar(value: number, max: number): number {
    return max > 0 ? Math.round((value / max) * 120) : 0;
  }
  min100(v: number): number { return Math.min(v, 100); }

  buildConicGradient(cats: { pct: number }[]): string {
    let stops = '';
    let cumulative = 0;
    cats.forEach((c, i) => {
      const color = this.categoryColors[i % this.categoryColors.length];
      stops += `${color} ${cumulative}% ${cumulative + c.pct}%, `;
      cumulative += c.pct;
    });
    return `conic-gradient(${stops.slice(0, -2)})`;
  }

  getVariance(actual: BudgetActual): number {
    // Return allocated amount - actual (positive = under budget)
    const allocation = this.allocations.find(a =>
      a.id === actual.allocationId || a.departmentName === actual.departmentName);
    if (!allocation) return 0;
    return allocation.allottedAmount - actual.amount;
  }

  constructor(private svc: BudgetService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['fy']) this.selectedFyId = params['fy'];
      if (params['tab']) this.activeTab = params['tab'];
    });
    this.loadFiscalYears();
    this.loadConfig();
    this.loadCostCategories();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([], { queryParams: { tab, fy: this.selectedFyId || undefined }, queryParamsHandling: 'merge' });
    this.loadTabData(tab);
  }

  onFyChange() {
    const fy = this.fiscalYears.find(f => f.id === this.selectedFyId);
    this.selectedFyLabel = fy?.fiscalYearLabel ?? '';
    this.router.navigate([], { queryParams: { fy: this.selectedFyId }, queryParamsHandling: 'merge' });
    this.loadTabData(this.activeTab);
  }

  loadTabData(tab: string) {
    if (!this.selectedFyId) return;
    switch (tab) {
      case 'dashboard': this.loadDashboard(); break;
      case 'forecast':  this.loadForecast();  break;
      case 'actuals':   this.loadActuals();   break;
      case 'reports':   this.loadReportsData(); break;
    }
  }

  loadFiscalYears() {
    this.svc.getFiscalYears().subscribe(fys => {
      this.fiscalYears = fys;
      if (!this.selectedFyId && fys.length) {
        const active = fys.find(f => f.status === 'Active') ?? fys[0];
        this.selectedFyId = active.id;
        this.selectedFyLabel = active.fiscalYearLabel;
        this.loadDashboard();
      }
    });
  }

  loadDashboard() {
    if (!this.selectedFyId) return;
    this.loading = true;
    this.svc.getDashboard(this.selectedFyId).subscribe({
      next: kpi => { this.kpi = kpi; this.loading = false; },
      error: () => this.loading = false
    });
  }

  loadForecast() {
    if (!this.selectedFyId) return;
    this.svc.getForecast(this.selectedFyId).subscribe(f => this.forecast = f);
    this.svc.getAllocations(this.selectedFyId).subscribe(a => this.allocations = a);
  }

  loadActuals() {
    if (!this.selectedFyId) return;
    this.svc.getActuals(this.selectedFyId).subscribe(a => {
      this.actuals = a;
      this.filteredActuals = [...a];
    });
    this.svc.getAllocations(this.selectedFyId).subscribe(a => this.allocations = a);
  }

  loadReportsData() {
    if (!this.selectedFyId) return;
    if (!this.kpi) this.loadDashboard();
    this.svc.getCostPerHire(this.selectedFyId).subscribe(c => this.cph = c);
    this.svc.getVendorSpend(this.selectedFyId).subscribe(v => this.vendorSpend = v);
    this.svc.getDepartmentBreakdown(this.selectedFyId).subscribe(d => this.departments = d);
    this.svc.getActuals(this.selectedFyId).subscribe(a => this.actuals = a);
  }

  loadConfig() {
    this.svc.getConfig().subscribe(c => this.tenantConfig = c);
  }

  loadCostCategories() {
    this.svc.getCostCategories().subscribe(c => this.costCategories = c);
  }

  filterActuals() {
    this.filteredActuals = this.actuals.filter(a => {
      if (this.actualsFilter.dept && a.departmentName?.toLowerCase().indexOf(this.actualsFilter.dept.toLowerCase()) < 0) return false;
      if (this.actualsFilter.category && a.spendCategory !== this.actualsFilter.category) return false;
      if (this.actualsFilter.from && a.spendDate < this.actualsFilter.from) return false;
      if (this.actualsFilter.to && a.spendDate > this.actualsFilter.to) return false;
      return true;
    });
  }

  saveActual() {
    const payload = { ...this.newActual, fiscalYearId: this.selectedFyId };
    this.svc.createActual(payload).subscribe(() => {
      this.showActualDrawer = false;
      this.newActual = { spendDate: new Date().toISOString().slice(0, 10), departmentName: '', spendCategory: 'Other', amount: 0 };
      this.loadActuals();
    });
  }

  approveActual(actual: BudgetActual) {
    this.svc.updateActual(actual.id, { isApproved: true }).subscribe(() => this.loadActuals());
  }

  deleteActualEntry(id: string) {
    if (!confirm('Delete this actual entry?')) return;
    this.svc.deleteActual(id).subscribe(() => this.loadActuals());
  }

  openAddAllocationDrawer() { this.showAllocDrawer = true; }

  saveAllocation() {
    const payload = { ...this.newAlloc, fiscalYearId: this.selectedFyId, quarter: +this.newAlloc.quarter, category: +this.newAlloc.category };
    this.svc.createAllocation(payload).subscribe(() => {
      this.showAllocDrawer = false;
      this.newAlloc = { departmentName: '', departmentCode: '', quarter: 0, category: 0, headcountPlanned: 1, allottedAmount: 0, notes: '' };
      this.loadForecast();
    });
  }

  startEditCell(row: ForecastRow, quarter: 'Q1'|'Q2'|'Q3'|'Q4') {
    this.editingRow[row.department + '_' + quarter] = true;
  }

  saveAllocationQuarter(row: ForecastRow, quarter: 'Q1'|'Q2'|'Q3'|'Q4', event: Event) {
    this.editingRow[row.department + '_' + quarter] = false;
    const value = +(event.target as HTMLInputElement).value;
    const alloc = this.allocations.find(a =>
      a.departmentName === row.department && a.quarter === quarter);
    if (alloc) {
      this.svc.updateAllocation(alloc.id, { allottedAmount: value }).subscribe(() => this.loadForecast());
    } else {
      this.svc.createAllocation({
        fiscalYearId: this.selectedFyId, departmentName: row.department,
        quarter: ['Q1','Q2','Q3','Q4'].indexOf(quarter), category: 0,
        headcountPlanned: row.headcountPlanned, allottedAmount: value
      }).subscribe(() => this.loadForecast());
    }
  }

  toggleLineItems(dept: string) {
    this.expandedDepts[dept] = !this.expandedDepts[dept];
    if (this.expandedDepts[dept] && !this.lineItemsByDept[dept]) {
      const alloc = this.allocations.find(a => a.departmentName === dept);
      if (alloc) {
        this.svc.getLineItems(alloc.id).subscribe(li => this.lineItemsByDept[dept] = li);
      }
    }
  }

  addLineItemForDept(dept: string) {
    const alloc = this.allocations.find(a => a.departmentName === dept);
    if (!alloc) return;
    this.svc.createLineItem({ allocationId: alloc.id, lineItemType: 0, plannedAmount: 0 })
      .subscribe(() => this.toggleLineItems(dept));
  }

  createFiscalYear() {
    this.svc.createFiscalYear({
      fiscalYearLabel: this.newFy.label,
      startDate: this.newFy.startDate,
      endDate: this.newFy.endDate,
      totalBudgetAmount: +this.newFy.totalBudgetAmount,
      currency: this.tenantConfig?.defaultCurrency ?? 'USD'
    }).subscribe(() => {
      this.newFy = { label: '', startDate: '', endDate: '', totalBudgetAmount: 0 };
      this.loadFiscalYears();
    });
  }

  lockFY(fy: FiscalYear) {
    if (!confirm(`Lock ${fy.fiscalYearLabel}? No further edits will be allowed.`)) return;
    this.svc.lockFiscalYear(fy.id).subscribe(() => this.loadFiscalYears());
  }

  cloneFY(fy: FiscalYear) {
    this.svc.cloneFiscalYear(fy.id).subscribe(() => this.loadFiscalYears());
  }

  saveConfig() {
    if (!this.tenantConfig) return;
    this.svc.updateConfig(this.tenantConfig).subscribe(c => this.tenantConfig = c);
  }

  saveCostCategory(cat: CostCategory) {
    this.svc.updateCostCategory(cat.id, cat).subscribe();
  }

  addCostCategory() {
    const order = this.costCategories.length + 1;
    this.svc.createCostCategory({ ...this.newCat, displayOrder: order, isActive: true })
      .subscribe(() => {
        this.newCat = { categoryName: '', categoryCode: '', defaultEstimatePerHire: null };
        this.loadCostCategories();
      });
  }

  exportExcel(reportType = 'all') {
    if (!this.selectedFyId) return;
    this.svc.exportExcel(this.selectedFyId, reportType).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `Budget_${this.selectedFyLabel}_${reportType}.xlsx`;
      a.click(); URL.revokeObjectURL(url);
    });
  }

  exportPpt() {
    if (!this.selectedFyId) return;
    this.svc.exportPpt(this.selectedFyId).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `Budget_${this.selectedFyLabel}.pptx`;
      a.click(); URL.revokeObjectURL(url);
    });
  }

  downloadBudgetTemplate() {
    const apiUrl = environment.apiUrl;
    this.http.get(`${apiUrl}/api/budget/import-template`, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Budget_Import_Template.xlsx';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  downloadBudgetSample() {
    this.downloadBudgetTemplate();
  }

  onBudgetExcelUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);

    const apiUrl = environment.apiUrl;
    this.http.post<any>(`${apiUrl}/api/budget/import-excel`, fd).subscribe({
      next: res => {
        this.budgetImportResult = res;
        this.loadFiscalYears();
      },
      error: err => {
        alert('Import failed: ' + (err?.error?.error ?? 'Unknown error'));
      }
    });
    input.value = '';
  }
}
