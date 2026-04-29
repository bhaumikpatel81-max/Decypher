import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE = `${environment.apiUrl}/api/budget`;

export interface FiscalYear {
  id: string;
  fiscalYearLabel: string;
  startDate: string;
  endDate: string;
  totalBudgetAmount: number;
  currency: string;
  status: string;
  notes?: string;
  totalAllocated: number;
  totalSpent: number;
  remaining: number;
}

export interface BudgetAllocation {
  id: string;
  fiscalYearId: string;
  departmentName: string;
  departmentCode?: string;
  headcountPlanned: number;
  allottedAmount: number;
  category: string;
  quarter: string;
  notes?: string;
  actualSpend: number;
  variance: number;
  utilizationPct: number;
}

export interface BudgetLineItem {
  id: string;
  allocationId: string;
  lineItemType: string;
  plannedAmount: number;
  actualAmount?: number;
  notes?: string;
}

export interface BudgetActual {
  id: string;
  fiscalYearId: string;
  allocationId?: string;
  spendCategory: string;
  amount: number;
  spendDate: string;
  invoiceReference?: string;
  vendorId?: string;
  vendorName?: string;
  departmentName?: string;
  isApproved: boolean;
  notes?: string;
  createdAt: string;
}

export interface DashboardKpi {
  totalBudget: number;
  totalSpent: number;
  totalCommitted: number;
  remaining: number;
  utilizationPct: number;
  headcountPlanned: number;
  headcountFilled: number;
  headcountInProgress: number;
  costPerHireActual: number;
  costPerHireTarget: number;
  budgetByDepartment: { department: string; planned: number; actual: number }[];
  budgetByCategory: { category: string; amount: number; pct: number }[];
  budgetByQuarter: { quarter: string; planned: number; actual: number; headcountPlanned: number }[];
  topVendorsBySpend: { vendorId: string; vendorName: string; totalSpend: number; transactionCount: number }[];
  monthlyTrend: { month: string; year: number; planned: number; actual: number }[];
}

export interface ForecastRow {
  department: string;
  departmentCode?: string;
  q1Planned: number; q2Planned: number; q3Planned: number; q4Planned: number; totalPlanned: number;
  q1Actual: number; q2Actual: number; q3Actual: number; q4Actual: number; totalActual: number;
  headcountPlanned: number;
}

export interface Forecast {
  fiscalYearId: string;
  fiscalYearLabel: string;
  rows: ForecastRow[];
  totals: { q1Planned: number; q2Planned: number; q3Planned: number; q4Planned: number; total: number };
}

export interface CostPerHire {
  overallCostPerHire: number;
  targetCostPerHire: number;
  totalHires: number;
  totalSpend: number;
  byDepartment: { department: string; hires: number; totalSpend: number; costPerHire: number }[];
  byCategory: { category: string; amount: number; pctOfTotal: number }[];
}

export interface VendorSpend {
  vendorId?: string;
  vendorName: string;
  totalSpend: number;
  transactionCount: number;
}

export interface DepartmentBreakdown {
  department: string;
  departmentCode?: string;
  plannedBudget: number;
  actualSpend: number;
  variance: number;
  utilizationPct: number;
  headcountPlanned: number;
  headcountFilled: number;
}

export interface TenantConfig {
  id: string;
  fiscalYearStartMonth: number;
  defaultCurrency: string;
  budgetApprovalRequired: boolean;
  costPerHireTargetAmount?: number;
  approvalThresholdAmount?: number;
  brandColor: string;
}

export interface CostCategory {
  id: string;
  categoryName: string;
  categoryCode: string;
  isActive: boolean;
  displayOrder: number;
  defaultEstimatePerHire?: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(private http: HttpClient) {}

  // Fiscal Years
  getFiscalYears(): Observable<FiscalYear[]> {
    return this.http.get<FiscalYear[]>(`${BASE}/fiscal-years`);
  }
  createFiscalYear(body: any): Observable<FiscalYear> {
    return this.http.post<FiscalYear>(`${BASE}/fiscal-years`, body);
  }
  updateFiscalYear(id: string, body: any): Observable<FiscalYear> {
    return this.http.put<FiscalYear>(`${BASE}/fiscal-years/${id}`, body);
  }
  lockFiscalYear(id: string): Observable<void> {
    return this.http.post<void>(`${BASE}/fiscal-years/${id}/lock`, {});
  }
  cloneFiscalYear(id: string): Observable<FiscalYear> {
    return this.http.post<FiscalYear>(`${BASE}/fiscal-years/${id}/clone`, {});
  }

  // Allocations
  getAllocations(fiscalYearId?: string, dept?: string): Observable<BudgetAllocation[]> {
    let params = new HttpParams();
    if (fiscalYearId) params = params.set('fiscalYearId', fiscalYearId);
    if (dept) params = params.set('dept', dept);
    return this.http.get<BudgetAllocation[]>(`${BASE}/allocations`, { params });
  }
  createAllocation(body: any): Observable<BudgetAllocation> {
    return this.http.post<BudgetAllocation>(`${BASE}/allocations`, body);
  }
  updateAllocation(id: string, body: any): Observable<BudgetAllocation> {
    return this.http.put<BudgetAllocation>(`${BASE}/allocations/${id}`, body);
  }
  deleteAllocation(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/allocations/${id}`);
  }

  // Line Items
  getLineItems(allocationId?: string): Observable<BudgetLineItem[]> {
    let params = new HttpParams();
    if (allocationId) params = params.set('allocationId', allocationId);
    return this.http.get<BudgetLineItem[]>(`${BASE}/line-items`, { params });
  }
  createLineItem(body: any): Observable<BudgetLineItem> {
    return this.http.post<BudgetLineItem>(`${BASE}/line-items`, body);
  }
  updateLineItem(id: string, body: any): Observable<BudgetLineItem> {
    return this.http.put<BudgetLineItem>(`${BASE}/line-items/${id}`, body);
  }
  deleteLineItem(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/line-items/${id}`);
  }

  // Actuals
  getActuals(fiscalYearId?: string, from?: string, to?: string, dept?: string): Observable<BudgetActual[]> {
    let params = new HttpParams();
    if (fiscalYearId) params = params.set('fiscalYearId', fiscalYearId);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    if (dept) params = params.set('dept', dept);
    return this.http.get<BudgetActual[]>(`${BASE}/actuals`, { params });
  }
  createActual(body: any): Observable<BudgetActual> {
    return this.http.post<BudgetActual>(`${BASE}/actuals`, body);
  }
  updateActual(id: string, body: any): Observable<BudgetActual> {
    return this.http.put<BudgetActual>(`${BASE}/actuals/${id}`, body);
  }
  deleteActual(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/actuals/${id}`);
  }

  // Analytics
  getDashboard(fiscalYearId: string): Observable<DashboardKpi> {
    return this.http.get<DashboardKpi>(`${BASE}/dashboard?fiscalYearId=${fiscalYearId}`);
  }
  getForecast(fiscalYearId: string): Observable<Forecast> {
    return this.http.get<Forecast>(`${BASE}/forecast?fiscalYearId=${fiscalYearId}`);
  }
  getCostPerHire(fiscalYearId: string): Observable<CostPerHire> {
    return this.http.get<CostPerHire>(`${BASE}/cost-per-hire?fiscalYearId=${fiscalYearId}`);
  }
  getVendorSpend(fiscalYearId: string): Observable<VendorSpend[]> {
    return this.http.get<VendorSpend[]>(`${BASE}/vendor-spend?fiscalYearId=${fiscalYearId}`);
  }
  getDepartmentBreakdown(fiscalYearId: string): Observable<DepartmentBreakdown[]> {
    return this.http.get<DepartmentBreakdown[]>(`${BASE}/department-breakdown?fiscalYearId=${fiscalYearId}`);
  }

  // Config
  getConfig(): Observable<TenantConfig> {
    return this.http.get<TenantConfig>(`${BASE}/config`);
  }
  updateConfig(body: any): Observable<TenantConfig> {
    return this.http.put<TenantConfig>(`${BASE}/config`, body);
  }
  getCostCategories(): Observable<CostCategory[]> {
    return this.http.get<CostCategory[]>(`${BASE}/cost-categories`);
  }
  createCostCategory(body: any): Observable<CostCategory> {
    return this.http.post<CostCategory>(`${BASE}/cost-categories`, body);
  }
  updateCostCategory(id: string, body: any): Observable<CostCategory> {
    return this.http.put<CostCategory>(`${BASE}/cost-categories/${id}`, body);
  }

  // Exports
  exportExcel(fiscalYearId: string, reportType = 'all'): Observable<Blob> {
    return this.http.get(`${BASE}/export/excel?fiscalYearId=${fiscalYearId}&reportType=${reportType}`,
      { responseType: 'blob' });
  }
  exportPpt(fiscalYearId: string): Observable<Blob> {
    return this.http.get(`${BASE}/export/ppt?fiscalYearId=${fiscalYearId}`, { responseType: 'blob' });
  }
}
