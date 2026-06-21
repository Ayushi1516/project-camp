import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  imports: [ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  isLoading = signal(false);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  forgotForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] })
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const email = this.forgotForm.value.email;
      this.authService.requestPasswordReset(email).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.message.set('Password reset code sent to your email.');
          this.router.navigateByUrl('/reset-password');
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to send reset email.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
