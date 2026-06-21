import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password';
import { ResetPasswordComponent } from './auth/reset-password/reset-password';
import { DashboardComponent } from './dashboard/dashboard';
import { AdminDashboardComponent } from './admin/admin-dashboard';
import { MemberDashboardComponent } from './member/member-dashboard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'project_admin', 'member'] },
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'member',
    component: MemberDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['member', 'project_admin'] },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
