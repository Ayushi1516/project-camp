import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  imports: [ReactiveFormsModule]
})
export class ResetPasswordComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  resetForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    code: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(8)] })
  });

  onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const { email, code, password } = this.resetForm.value;
      this.authService.verifyResetCode(email, code, password).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set('Password reset successfully. Please login with your new password.');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Reset failed. Please try again.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
