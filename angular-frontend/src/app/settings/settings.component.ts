import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';

interface SettingsTab { id: string;
  label: string;
  icon: string;
  requiredRoles: string[];
}

@Component({ selector: 'app-settings',
  template: `
    <div class="settings-container">
      <!-- Settings Navigation -->
      <div class="settings-nav">
        <div class="settings-nav-section">
          <div class="settings-nav-label">Personal</div>
          <a 
            *ngFor="let tab of availableTabs.personal" 
            [class.active]="activeTab === tab.id"
            (click)="setActiveTab(tab.id)"
            class="settings-nav-item"
          >
            <svg class="settings-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="tab.icon | safeHtml"></svg>
            <span>{{ tab.label }}</span>
          </a>
        </div>

        <div class="settings-nav-section" *ngIf="availableTabs.organization.length > 0">
          <div class="settings-nav-label">Organization</div>
          <a 
            *ngFor="let tab of availableTabs.organization" 
            [class.active]="activeTab === tab.id"
            (click)="setActiveTab(tab.id)"
            class="settings-nav-item"
          >
            <svg class="settings-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="tab.icon | safeHtml"></svg>
            <span>{{ tab.label }}</span>
          </a>
        </div>

        <div class="settings-nav-section" *ngIf="availableTabs.platform.length > 0">
          <div class="settings-nav-label">Platform</div>
          <a 
            *ngFor="let tab of availableTabs.platform" 
            [class.active]="activeTab === tab.id"
            (click)="setActiveTab(tab.id)"
            class="settings-nav-item"
          >
            <svg class="settings-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="tab.icon | safeHtml"></svg>
            <span>{{ tab.label }}</span>
          </a>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="settings-content">
        <!-- Profile Settings -->
        <div class="settings-section" *ngIf="activeTab === 'profile'">
          <div class="settings-header">
            <h2 class="settings-title">Profile Settings</h2>
            <p class="settings-description">Manage your personal information and preferences</p>
          </div>

          <div class="card">
            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" class="input" formControlName="firstName" />
                </div>

                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="input" formControlName="lastName" />
                </div>

                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="input" formControlName="email" disabled />
                </div>

                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="input" formControlName="phone" />
                </div>

                <div class="form-group">
                  <label class="form-label">Department</label>
                  <input type="text" class="input" formControlName="department" />
                </div>

                <div class="form-group">
                  <label class="form-label">Designation</label>
                  <input type="text" class="input" formControlName="designation" />
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!profileForm.valid || saving">
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Team Management (TenantAdmin+) -->
        <div class="settings-section" *ngIf="activeTab === 'team'">
          <div class="settings-header">
            <div>
              <h2 class="settings-title">Team Management</h2>
              <p class="settings-description">Manage team members and their permissions</p>
            </div>
            <button class="btn btn-primary" (click)="openAddUserModal()">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 6px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Team Member
            </button>
          </div>

          <div class="card">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let user of teamMembers" (click)="viewUserDetails(user)">
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="avatar-sm">{{ user.initials }}</div>
                        <span class="font-medium">{{ user.fullName }}</span>
                      </div>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span class="chip" [ngClass]="getRoleChipClass(user.role)">
                        {{ user.role }}
                      </span>
                    </td>
                    <td>{{ user.department }}</td>
                    <td>
                      <span class="chip" [ngClass]="user.isActive ? 'chip-success' : 'chip-neutral'">
                        {{ user.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="text-small text-secondary">
                      {{ user.lastLoginAt | date:'short' }}
                    </td>
                    <td>
                      <button class="btn btn-ghost btn-icon" [matMenuTriggerFor]="userActions">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                      </button>
                      <mat-menu #userActions="matMenu">
                        <button mat-menu-item (click)="editUser(user)">Edit</button>
                        <button mat-menu-item (click)="resetPassword(user)">Reset Password</button>
                        <button mat-menu-item (click)="toggleUserStatus(user)">
                          {{ user.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                        <mat-divider></mat-divider>
                        <button mat-menu-item class="text-danger" (click)="deleteUser(user)">Delete</button>
                      </mat-menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Company Settings (TenantAdmin+) -->
        <div class="settings-section" *ngIf="activeTab === 'company'">
          <div class="settings-header">
            <h2 class="settings-title">Company Settings</h2>
            <p class="settings-description">Manage your organization's information</p>
          </div>

          <div class="card">
            <form [formGroup]="companyForm" (ngSubmit)="saveCompany()">
              <div class="form-grid">
                <div class="form-group full-width">
                  <label class="form-label">Company Name</label>
                  <input type="text" class="input" formControlName="companyName" />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Address</label>
                  <textarea class="input textarea" formControlName="address" rows="3"></textarea>
                </div>

                <div class="form-group">
                  <label class="form-label">Industry</label>
                  <select class="input" formControlName="industry">
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Employee Count</label>
                  <input type="number" class="input" formControlName="employeeCount" />
                </div>

                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="input" formControlName="phone" />
                </div>

                <div class="form-group">
                  <label class="form-label">Website</label>
                  <input type="url" class="input" formControlName="website" />
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!companyForm.valid || saving">
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Permissions & Roles (TenantAdmin+) -->
        <div class="settings-section" *ngIf="activeTab === 'permissions'">
          <div class="settings-header">
            <h2 class="settings-title">Permissions & Roles</h2>
            <p class="settings-description">Configure role-based access control</p>
          </div>

          <div class="card">
            <div class="permissions-matrix">
              <table class="table">
                <thead>
                  <tr>
                    <th>Feature / Module</th>
                    <th>SuperAdmin</th>
                    <th>TenantAdmin</th>
                    <th>TeamLead</th>
                    <th>Recruiter</th>
                    <th>Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let permission of permissions">
                    <td class="font-medium">{{ permission.module }}</td>
                    <td *ngFor="let role of ['SuperAdmin', 'TenantAdmin', 'TeamLead', 'Recruiter', 'Viewer']">
                      <div class="permission-cell">
                        <label class="checkbox-label">
                          <input 
                            type="checkbox" 
                            [checked]="hasPermission(permission, role)"
                            [disabled]="!canEditRole(role)"
                            (change)="togglePermission(permission, role, $event)"
                          />
                          <span class="permission-type">{{ getPermissionLevel(permission, role) }}</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="permission-legend">
              <div class="legend-item">
                <span class="chip chip-success">Full</span> - Create, Read, Update, Delete
              </div>
              <div class="legend-item">
                <span class="chip chip-info">Edit</span> - Create, Read, Update
              </div>
              <div class="legend-item">
                <span class="chip chip-warning">View</span> - Read only
              </div>
              <div class="legend-item">
                <span class="chip chip-neutral">None</span> - No access
              </div>
            </div>
          </div>
        </div>

        <!-- Integrations (TenantAdmin+) -->
        <div class="settings-section" *ngIf="activeTab === 'integrations'">
          <div class="settings-header">
            <h2 class="settings-title">Integrations</h2>
            <p class="settings-description">Connect with your ATS and other tools</p>
          </div>

          <!-- ATS Integrations -->
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <h3 class="card-title">ATS Platforms</h3>
            </div>

            <div class="integration-list">
              <div class="integration-item" *ngFor="let integration of atsIntegrations">
                <div class="integration-info">
                  <div class="integration-logo">{{ integration.name[0] }}</div>
                  <div>
                    <div class="integration-name">{{ integration.name }}</div>
                    <div class="integration-description">{{ integration.description }}</div>
                  </div>
                </div>
                <div class="integration-status">
                  <span class="chip" [ngClass]="integration.connected ? 'chip-success' : 'chip-neutral'">
                    {{ integration.connected ? 'Connected' : 'Not Connected' }}
                  </span>
                  <button 
                    class="btn" 
                    [ngClass]="integration.connected ? 'btn-secondary' : 'btn-primary'"
                    (click)="toggleIntegration(integration)"
                  >
                    {{ integration.connected ? 'Configure' : 'Connect' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- API Keys -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">API Keys</h3>
              <button class="btn btn-primary" (click)="generateApiKey()">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 6px;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
                Generate New Key
              </button>
            </div>

            <div class="api-key-list">
              <div class="api-key-item" *ngFor="let key of apiKeys">
                <div class="api-key-info">
                  <div class="api-key-name">{{ key.name }}</div>
                  <div class="api-key-value">{{ key.key }}</div>
                  <div class="api-key-meta">
                    Created {{ key.createdAt | date:'medium' }} • Last used {{ key.lastUsedAt | date:'short' }}
                  </div>
                </div>
                <button class="btn btn-ghost btn-icon" (click)="deleteApiKey(key)">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="settings-section" *ngIf="activeTab === 'notifications'">
          <div class="settings-header">
            <h2 class="settings-title">Notification Preferences</h2>
            <p class="settings-description">Choose how you want to be notified</p>
          </div>

          <div class="card">
            <div class="notification-settings">
              <div class="notification-category" *ngFor="let category of notificationCategories">
                <h4 class="notification-category-title">{{ category.name }}</h4>
                <div class="notification-option" *ngFor="let option of category.options">
                  <div>
                    <div class="notification-option-label">{{ option.label }}</div>
                    <div class="notification-option-description">{{ option.description }}</div>
                  </div>
                  <div class="notification-toggles">
                    <label class="toggle-label">
                      <input type="checkbox" [(ngModel)]="option.email" />
                      <span>Email</span>
                    </label>
                    <label class="toggle-label">
                      <input type="checkbox" [(ngModel)]="option.inApp" />
                      <span>In-App</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" (click)="saveNotificationSettings()">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        <!-- Billing (TenantAdmin+) -->
        <div class="settings-section" *ngIf="activeTab === 'billing'">
          <div class="settings-header">
            <h2 class="settings-title">Billing & Subscription</h2>
            <p class="settings-description">Manage your subscription and billing information</p>
          </div>

          <!-- Current Plan -->
          <div class="card" style="margin-bottom: 24px;">
            <div class="billing-current-plan">
              <div>
                <div class="billing-plan-name">{{ currentPlan.name }}</div>
                <div class="billing-plan-price">{{ currentPlan.price }}</div>
                <div class="billing-plan-period">{{ currentPlan.billingPeriod }}</div>
              </div>
              <button class="btn btn-primary" (click)="upgradePlan()">Upgrade Plan</button>
            </div>

            <div class="billing-features">
              <div class="billing-feature" *ngFor="let feature of currentPlan.features">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="text-success">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Usage Stats -->
          <div class="card">
            <h3 class="card-title">Current Usage</h3>
            <div class="usage-stats">
              <div class="usage-stat" *ngFor="let stat of usageStats">
                <div class="usage-stat-label">{{ stat.label }}</div>
                <div class="usage-stat-progress">
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      [style.width.%]="(stat.current / stat.limit) * 100"
                      [ngClass]="getUsageClass(stat)"
                    ></div>
                  </div>
                  <div class="usage-stat-values">
                    {{ stat.current | number }} / {{ stat.limit | number }} {{ stat.unit }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Platform Settings (SuperAdmin only) -->
        <div class="settings-section" *ngIf="activeTab === 'platform'">
          <div class="settings-header">
            <h2 class="settings-title">Platform Settings</h2>
            <p class="settings-description">System-wide configuration (SuperAdmin only)</p>
          </div>

          <div class="card">
            <div class="platform-settings">
              <div class="form-group">
                <label class="form-label">Platform Mode</label>
                <select class="input" [(ngModel)]="platformSettings.mode">
                  <option value="production">Production</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="demo">Demo Mode</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Default Trial Period (days)</label>
                <input type="number" class="input" [(ngModel)]="platformSettings.trialDays" />
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="platformSettings.allowSignups" />
                  <span>Allow new tenant signups</span>
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="platformSettings.requireEmailVerification" />
                  <span>Require email verification</span>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" (click)="savePlatformSettings()">
                Save Platform Settings
              </button>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-section danger-zone" *ngIf="canAccessDangerZone">
          <div class="settings-header">
            <h2 class="settings-title">Danger Zone</h2>
            <p class="settings-description">Irreversible actions - proceed with caution</p>
          </div>

          <div class="card card-danger">
            <div class="danger-action" *ngIf="currentUser.role === 'TenantAdmin'">
              <div>
                <h4 class="danger-action-title">Delete Organization</h4>
                <p class="danger-action-description">
                  Permanently delete your organization and all associated data. This action cannot be undone.
                </p>
              </div>
              <button class="btn btn-danger" (click)="deleteOrganization()">
                Delete Organization
              </button>
            </div>

            <div class="danger-action" *ngIf="currentUser.role === 'SuperAdmin'">
              <div>
                <h4 class="danger-action-title">Reset All Data</h4>
                <p class="danger-action-description">
                  Clear all demo data and reset the platform to initial state.
                </p>
              </div>
              <button class="btn btn-danger" (click)="resetPlatform()">
                Reset Platform
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { display: flex;
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto; }

    .settings-nav { flex: 0 0 220px;
      position: sticky;
      top: 88px;
      align-self: flex-start; }

    .settings-nav-section { margin-bottom: 32px; }

    .settings-nav-label { font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-3);
      margin-bottom: 8px; }

    .settings-nav-item { display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      color: var(--text-2);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
      margin-bottom: 2px; }

    .settings-nav-item:hover { background: var(--surface-alt);
      color: var(--text); }

    .settings-nav-item.active { background: var(--brand-violet-50);
      color: var(--brand-violet-700); }

    .settings-nav-icon { width: 18px;
      height: 18px;
      flex-shrink: 0; }

    .settings-content { flex: 1; }

    .settings-header { margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start; }

    .settings-title { font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 4px; }

    .settings-description { font-size: 14px;
      color: var(--text-2); }

    .form-grid { display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px; }

    .form-group { display: flex;
      flex-direction: column; }

    .form-group.full-width { grid-column: 1 / -1; }

    .form-label { font-size: 13px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 6px; }

    .form-actions { display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--border); }

    .avatar-sm { width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--brand-gradient);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 12px; }

    .permissions-matrix { overflow-x: auto; }

    .permission-cell { text-align: center; }

    .checkbox-label { display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer; }

    .permission-type { font-size: 11px;
      color: var(--text-3); }

    .permission-legend { display: flex;
      gap: 16px;
      padding: 16px;
      background: var(--surface-alt);
      border-radius: var(--radius-md);
      margin-top: 16px; }

    .legend-item { display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px; }

    .integration-list { display: flex;
      flex-direction: column;
      gap: 16px; }

    .integration-item { display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md); }

    .integration-info { display: flex;
      gap: 12px;
      align-items: center; }

    .integration-logo { width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background: var(--brand-violet-50);
      color: var(--brand-violet-500);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px; }

    .integration-name { font-weight: 600;
      font-size: 15px;
      color: var(--text); }

    .integration-description { font-size: 13px;
      color: var(--text-2);
      margin-top: 2px; }

    .integration-status { display: flex;
      gap: 12px;
      align-items: center; }

    .api-key-list { display: flex;
      flex-direction: column;
      gap: 12px; }

    .api-key-item { display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: var(--surface-alt);
      border-radius: var(--radius-md); }

    .api-key-name { font-weight: 500;
      font-size: 14px;
      color: var(--text); }

    .api-key-value { font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--text-2);
      margin-top: 4px; }

    .api-key-meta { font-size: 12px;
      color: var(--text-3);
      margin-top: 4px; }

    .notification-category { margin-bottom: 32px; }

    .notification-category-title { font-size: 15px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 16px; }

    .notification-option { display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid var(--border); }

    .notification-option:last-child { border-bottom: none; }

    .notification-option-label { font-size: 14px;
      font-weight: 500;
      color: var(--text); }

    .notification-option-description { font-size: 13px;
      color: var(--text-2);
      margin-top: 2px; }

    .notification-toggles { display: flex;
      gap: 24px; }

    .toggle-label { display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-2);
      cursor: pointer; }

    .billing-current-plan { display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 20px; }

    .billing-plan-name { font-size: 20px;
      font-weight: 600;
      color: var(--text); }

    .billing-plan-price { font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      color: var(--brand-violet-500);
      margin-top: 8px; }

    .billing-plan-period { font-size: 14px;
      color: var(--text-2); }

    .billing-features { display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px; }

    .billing-feature { display: flex;
      gap: 8px;
      align-items: center;
      font-size: 14px;
      color: var(--text-2); }

    .usage-stats { display: flex;
      flex-direction: column;
      gap: 20px; }

    .usage-stat-label { font-size: 14px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 8px; }

    .usage-stat-progress { display: flex;
      align-items: center;
      gap: 12px; }

    .usage-stat-values { font-size: 13px;
      color: var(--text-2);
      min-width: 120px;
      text-align: right; }

    .danger-zone { margin-top: 48px; }

    .card-danger { border-color: var(--danger-500); }

    .danger-action { display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--border); }

    .danger-action:last-child { border-bottom: none; }

    .danger-action-title { font-size: 15px;
      font-weight: 600;
      color: var(--danger-500);
      margin-bottom: 4px; }

    .danger-action-description { font-size: 13px;
      color: var(--text-2); }

    .btn-danger { background: var(--danger-500);
      color: white;
      border: none; }

    .btn-danger:hover { background: var(--danger-600); }

    .btn-icon { width: 32px;
      height: 32px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center; }
  `]
})
export class SettingsComponent implements OnInit { activeTab = 'profile';
  currentUser: any;
  saving = false;
  
  profileForm!: FormGroup;
  companyForm!: FormGroup;
  
  teamMembers: any[] = [];
  permissions: any[] = [];
  atsIntegrations: any[] = [];
  apiKeys: any[] = [];
  notificationCategories: any[] = [];
  platformSettings: any = {};
  currentPlan: any = {};
  usageStats: any[] = [];

  availableTabs: { personal: any[]; organization: any[]; platform: any[] } = { personal: [],
    organization: [],
    platform: [] };

  canAccessDangerZone = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() { this.currentUser = this.authService.getCurrentUser();
    this.initializeForms();
    this.loadAvailableTabs();
    this.loadData(); }

  initializeForms() { this.profileForm = this.fb.group({ firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      email: [{ value: this.currentUser.email, disabled: true }],
      phone: [this.currentUser.phone],
      department: [this.currentUser.department],
      designation: [this.currentUser.designation] });

    this.companyForm = this.fb.group({ companyName: ['', Validators.required],
      address: [''],
      industry: [''],
      employeeCount: [0],
      phone: [''],
      website: [''] }); }

  loadAvailableTabs() { const allTabs: SettingsTab[] = [
      { id: 'profile', label: 'Profile', icon: '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: [] },
      { id: 'notifications', label: 'Notifications', icon: '<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: [] },
      { id: 'team', label: 'Team', icon: '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin', 'TenantAdmin'] },
      { id: 'company', label: 'Company', icon: '<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin', 'TenantAdmin'] },
      { id: 'permissions', label: 'Permissions', icon: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin', 'TenantAdmin'] },
      { id: 'integrations', label: 'Integrations', icon: '<path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin', 'TenantAdmin'] },
      { id: 'billing', label: 'Billing', icon: '<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin', 'TenantAdmin'] },
      { id: 'platform', label: 'Platform', icon: '<path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', requiredRoles: ['SuperAdmin'] }
    ];

    this.availableTabs.personal = allTabs.filter(tab => 
      tab.requiredRoles.length === 0 || tab.requiredRoles.includes(this.currentUser.role)
    ).filter(tab => tab.id === 'profile' || tab.id === 'notifications');

    this.availableTabs.organization = allTabs.filter(tab => 
      tab.requiredRoles.includes(this.currentUser.role)
    ).filter(tab => !['profile', 'notifications', 'platform'].includes(tab.id));

    this.availableTabs.platform = allTabs.filter(tab => 
      tab.id === 'platform' && tab.requiredRoles.includes(this.currentUser.role)
    );

    this.canAccessDangerZone = ['SuperAdmin', 'TenantAdmin'].includes(this.currentUser.role); }

  loadData() { // Load data based on active tab
    // This will call the backend APIs
  }

  setActiveTab(tabId: string) { this.activeTab = tabId;
    this.loadData(); }

  // Form submission methods
  saveProfile() {
    if (this.profileForm.valid) {
      this.saving = true;
      this.settingsService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.saving = false;
          // Show success toast
        },
        error: () => {
          this.saving = false;
          // Show error toast
        }
      });
    }
  }

  saveCompany() {
    if (this.companyForm.valid) {
      this.saving = true;
      this.settingsService.updateCompany(this.companyForm.value).subscribe({
        next: () => { this.saving = false; },
        error: () => { this.saving = false; }
      });
    }
  }

  // Helper methods
  getRoleChipClass(role: string): string {
    const classes: { [key: string]: string } = {
      'SuperAdmin': 'chip-danger',
      'TenantAdmin': 'chip-warning',
      'TeamLead': 'chip-info',
      'Recruiter': 'chip-brand',
      'Viewer': 'chip-neutral'
    };
    return classes[role] || 'chip-neutral';
  }

  hasPermission(permission: any, role: string): boolean { return permission.roles[role] !== 'none'; }

  canEditRole(role: string): boolean {
    if (this.currentUser.role === 'SuperAdmin') return true;
    if (this.currentUser.role === 'TenantAdmin' && role !== 'SuperAdmin') return true;
    return false;
  }

  getPermissionLevel(permission: any, role: string): string { return permission.roles[role] || 'none'; }

  togglePermission(permission: any, role: string, event: any) {
    // Implement permission toggle logic
  }

  getUsageClass(stat: any): string {
    const percent = (stat.current / stat.limit) * 100;
    if (percent >= 90) return 'progress-fill-danger';
    if (percent >= 70) return 'progress-fill-warning';
    return 'progress-fill';
  }

  // Action methods
  openAddUserModal() {}
  viewUserDetails(user: any) {}
  editUser(user: any) {}
  resetPassword(user: any) {}
  toggleUserStatus(user: any) {}
  deleteUser(user: any) {}
  toggleIntegration(integration: any) {}
  generateApiKey() {}
  deleteApiKey(key: any) {}
  saveNotificationSettings() {}
  upgradePlan() {}
  savePlatformSettings() {}
  deleteOrganization() {}
  resetPlatform() {}
}

