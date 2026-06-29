import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { NotificationService } from '../../../services/notification.service';
import { project } from '../../../models/project.model';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-project-form',
  standalone: true,
  templateUrl: './project-form.html',
  imports: [ReactiveFormsModule,],
})
export class ProjectFormComponent implements OnInit{

  private readonly dialogRef = inject(DialogRef<boolean>);
  private readonly data: { project?: project } = inject(DIALOG_DATA);
  isEditMode = false;
  private projectId: string | undefined;

  private projectService = inject(ProjectService);
  private notificationService = inject(NotificationService);
  projectForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    createdBy: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit() {
    console.log(this.data);
    const project = this.data.project;
    if(project) {
      this.projectForm.patchValue(project);
      this.isEditMode = true;
      this.projectId = project._id
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if(this.projectForm.invalid) return;

   const projectData = this.projectForm.value as project;
   let action$: Observable<any>;

   if(this.isEditMode && this.projectId) {
    action$ = this.projectService.updateProject(this.projectId, projectData);
   } else action$ = this.projectService.createProject(projectData);

   action$.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Project updated successfully' : 'Project created successfully';
        this.notificationService.showSuccess(message);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.notificationService.showError('Failed to save project. Please try again.');
      }
    });
  }
}
