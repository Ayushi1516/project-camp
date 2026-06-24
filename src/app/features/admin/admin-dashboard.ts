import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="min-h-screen bg-slate-50 p-8">
      <div class="mx-auto max-w-6xl">
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
          <!-- Projects Management -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-blue-50 p-3">
              <span class="text-2xl">📊</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Projects</h2>
            <p class="mt-2 text-sm text-slate-600">Create and manage all projects in your workspace.</p>
          </a>

          <!-- Members Management -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-green-50 p-3">
              <span class="text-2xl">👥</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Members</h2>
            <p class="mt-2 text-sm text-slate-600">Invite, manage roles, and permissions for team members.</p>
          </a>

          <!-- Permissions -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-purple-50 p-3">
              <span class="text-2xl">🔐</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Permissions</h2>
            <p class="mt-2 text-sm text-slate-600">Configure access levels and role-based permissions.</p>
          </a>

          <!-- Tasks -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-orange-50 p-3">
              <span class="text-2xl">✓</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Tasks</h2>
            <p class="mt-2 text-sm text-slate-600">View and manage all tasks across the workspace.</p>
          </a>

          <!-- Reports -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-red-50 p-3">
              <span class="text-2xl">📈</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Reports</h2>
            <p class="mt-2 text-sm text-slate-600">View analytics and reports for your workspace.</p>
          </a>

          <!-- Workspace Settings -->
          <a href="#" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md">
            <div class="mb-4 inline-block rounded-lg bg-slate-100 p-3">
              <span class="text-2xl">⚙️</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-950">Settings</h2>
            <p class="mt-2 text-sm text-slate-600">Configure workspace settings and integrations.</p>
          </a>
        </div>
      </div>
    </main>
  `,
})
export class AdminDashboardComponent {
  authService = inject(AuthService);
}
