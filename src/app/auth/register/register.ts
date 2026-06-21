import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  destroyRef = inject(DestroyRef);
  commonService = inject(CommonService);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);
  registerForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.nullValidator, Validators.maxLength(8)],
    }),
    isProjectAdmin: new FormControl(false),
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const userData = this.registerForm.value;
    const newUser = {
      email: userData.email,
      password: userData.password,
      username: userData.name,
      role: userData.isProjectAdmin ? 'project_admin' : 'member',
    };
    this.register(newUser);
  }

  register(user: any) {
    this.authService
      .registerUser(user).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          const errorText =
            err?.error?.message || err?.message || 'Registration failed. Please try again.';
          this.errorMessage.set(errorText);
          console.log(errorText);
          this.isLoading.set(false);
        },
      });
  }

  fieldClass(controlName: string) {
    return this.commonService.inputFieldClass(this.registerForm, controlName);
  }
}
