import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { catchError } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'http://localhost:3000/api/v1/projects';
  private http = inject(HttpClient);
  private cs = inject(CommonService);

  createProject(project: Project) {
    return this.http.post<any>(`${this.apiUrl}`, project).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }

  getAllProjects() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }
}
