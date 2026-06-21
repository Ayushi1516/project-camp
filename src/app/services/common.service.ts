import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
}
