import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [RouterModule],
  templateUrl: './dashboard-home.html'
})
export class DashboardHomeComponent {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    // You can access the parameter snapshot for the initial value
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log('User ID from route:', userId);
  }
}
