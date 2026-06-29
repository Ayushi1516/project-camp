import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-dashboard',
  imports: [RouterModule],
  templateUrl: './member-dashboard.html'
})
export class MemberDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
    isSidebarOpen = signal(false);


  constructor() {
    // You can access the parameter snapshot for the initial value
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log('User ID from route:', userId);
  }

  toggleSidebar() {
    this.isSidebarOpen.update(open => !open);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
