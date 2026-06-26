import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  /* Injecting Service */
  authService = inject(AuthService);
  private router = inject(Router);
  commonService = inject(CommonService);

  /* Initilizing varibales */
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.maxLength(8)] })
  });

  onLogin() {
    this.loginForm.markAllAsTouched();
    const loginData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.login(loginData);
    }
  }

  login(currentUser: any) {
    this.isLoading.set(true);
    this.authService.loginUser(currentUser).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        // Redirect based on user role
        if (user?.role === 'admin') {
          this.router.navigateByUrl('/admin');
        } else if (user?.role === 'member' || user?.role === 'project_admin') {
          this.router.navigate(['/member', user.id]);
        } else {
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Login failed');
        this.isLoading.set(false);
      }
    });
  }

  forgetPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  fieldClass(controlName: string) {
    return this.commonService.inputFieldClass(this.loginForm,controlName);
  }
}
 