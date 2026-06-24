import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="min-h-screen bg-slate-50 p-8">
      <div class="mx-auto max-w-6xl">
        <!-- Admin View -->
        <ng-container *ngIf="authService.hasRole('admin')">
          <div class="mb-8 flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold text-slate-950">Admin Dashboard</h1>
              <p class="mt-2 text-slate-600">Manage projects, members, and permissions across your workspace.</p>
            </div>
            <div class="rounded-lg bg-blue-50 px-4 py-3">
              <p class="text-sm font-semibold text-blue-900">Role: Admin</p>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">👥 Members</h2>
              <p class="mt-2 text-slate-600">Manage team members and permissions.</p>
            </a>
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">🔐 Permissions</h2>
              <p class="mt-2 text-slate-600">Configure access levels.</p>
            </a>
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">📊 Reports</h2>
              <p class="mt-2 text-slate-600">View workspace analytics.</p>
            </a>
          </div>
        </ng-container>

        <!-- Member/Project Admin View -->
        <ng-container *ngIf="authService.hasAnyRole(['member', 'project_admin']) && !authService.hasRole('admin')">
          <div class="mb-8 flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold text-slate-950">My Dashboard</h1>
              <p class="mt-2 text-slate-600">Manage your projects, tasks, and notes.</p>
            </div>
            <div class="rounded-lg bg-green-50 px-4 py-3">
              <p class="text-sm font-semibold text-green-900">Role: {{ authService.userRole() }}</p>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-3">
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">📁 My Projects</h2>
              <p class="mt-2 text-slate-600">View projects you are part of.</p>
            </a>
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">✓ My Tasks</h2>
              <p class="mt-2 text-slate-600">Track tasks assigned to you.</p>
            </a>
            <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
              <h2 class="text-xl font-semibold text-slate-950">📝 My Notes</h2>
              <p class="mt-2 text-slate-600">Create and organize your notes.</p>
            </a>
          </div>
        </ng-container>
      </div>
    </main>
  `,
})
export class DashboardComponent {
  authService = inject(AuthService);
}
