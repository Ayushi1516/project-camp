import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let dynamicMessage = 'An unexpected network error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        dynamicMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error codes
        switch (error.status) {
          case 400:
            dynamicMessage = error.error?.message || 'Bad Request.';
            break;
          case 409:
            dynamicMessage = 'This username or email already exists.';
            break;
          case 500:
            dynamicMessage = 'Internal Server Error. Please try again later.';
            break;
          case 0:
            dynamicMessage = 'Cannot connect to the server. Please check your connection.';
            break;
        }
      }

      // Option A: Pass the clean message forward down the pipeline
      return throwError(() => new Error(dynamicMessage));
      
      // Option B: You can also inject a Toast/Notification service here 
      // to display the alert instantly to the user dynamically!
    })
  );
};