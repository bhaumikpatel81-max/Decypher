import { Component, OnInit } from '@angular/core';
import { VendorService, Vendor } from '../services/vendor.service';

@Component({
  selector: 'app-vendors',
  template: `
    <section class="stack-page">
      <div class="kpi-grid">
        <article class="kpi-tile">
          <div class="kpi-label">Total Vendors</div>
          <div class="kpi-value">{{ vendors.length }}</div>
          <div class="kpi-meta">Connected to local database</div>
        </article>
        <article class="kpi-tile">
          <div class="kpi-label">Avg Quality</div>
          <div class="kpi-value">{{ avgQualityScore }}%</div>
          <div class="kpi-meta">Weighted vendor delivery score</div>
        </article>
        <article class="kpi-tile">
          <div class="kpi-label">Submissions</div>
          <div class="kpi-value">{{ submissionsThisMonth }}</div>
          <div class="kpi-meta">Current database total</div>
        </article>
      </div>

      <div class="card form-row">
        <input class="input" placeholder="Search vendors..." [(ngModel)]="searchTerm" (input)="applyFilters()">
        <select class="select" [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr><th>Vendor</th><th>Contact</th><th>Requirements</th><th>Assigned By</th><th>Submissions</th><th>Joinings</th><th>Quality</th><th>SLA</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let vendor of filteredVendors">
              <td><strong>{{ vendor.name }}</strong></td>
              <td>{{ vendor.contactPerson }}<br><small>{{ vendor.email }}</small></td>
              <td>{{ vendor.requirementsAssigned || 0 }}</td>
              <td>{{ vendor.assignedBy || '-' }}</td>
              <td>{{ vendor.submissions || vendor.totalSubmissions }}</td>
              <td>{{ vendor.joinings || vendor.successfulPlacements }}</td>
              <td><span class="chip chip-brand">{{ vendor.qualityScore }}%</span></td>
              <td>{{ vendor.slaScore }}%</td>
              <td>{{ vendor.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class VendorsComponent implements OnInit {
  vendors: any[] = [];
  filteredVendors: any[] = [];
  avgQualityScore = 0;
  submissionsThisMonth = 0;
  searchTerm = '';
  statusFilter = '';

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
    this.vendorService.getVendorPerformanceMetrics('default').subscribe(metrics => {
      this.avgQualityScore = metrics.avgQualityScore || 0;
      this.submissionsThisMonth = metrics.submissionsThisMonth || 0;
    });
  }

  loadVendors(): void {
    this.vendorService.getAllVendors('default').subscribe(vendors => {
      this.vendors = vendors;
      this.filteredVendors = vendors;
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVendors = this.vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(term) || vendor.email.toLowerCase().includes(term);
      const matchesStatus = !this.statusFilter || vendor.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
}
