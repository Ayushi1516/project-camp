import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  inputFieldClass(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    const invalidTouched = control?.invalid && control?.touched;

    return {
      'border-red-500 focus:border-red-500': invalidTouched,
      'border-slate-200 focus:border-blue-500': !invalidTouched,
    };
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error?.error?.message || error.statusText || errorMessage;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
