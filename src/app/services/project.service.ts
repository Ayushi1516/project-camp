import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { project } from '../models/project.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'http://localhost:3000/api/v1/projects';
  private http = inject(HttpClient);
  private cs = inject(CommonService);

  createProject(project: project) {
    return this.http.post<any>(`${this.apiUrl}`, project).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }

  getAllProjects() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }

  /* for admin */
  updateProject(projectId: string, project: project) {
    return this.http.put<any>(`${this.apiUrl}/${projectId}`, project).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }

  deleteProject(projectId: string) {
    return this.http.delete<any>(`${this.apiUrl}/${projectId}`).pipe(
      catchError((error: HttpErrorResponse) => this.cs.handleError(error))
    );
  }
}
