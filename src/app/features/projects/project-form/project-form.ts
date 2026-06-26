import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  templateUrl: './project-form.html',
  imports: [ReactiveFormsModule,],
})
export class ProjectFormComponent {

  private readonly dialogRef = inject(DialogRef<boolean>);
  private projectService = inject(ProjectService);
  projectForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    createdBy: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
  });

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(true);
   const projectData = this.projectForm.value as Project;
   if(projectData) {
    this.projectService.createProject(projectData).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    })
   }
  }
}
