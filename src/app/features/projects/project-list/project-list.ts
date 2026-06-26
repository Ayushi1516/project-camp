import { Component, computed, effect, inject, signal } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ProjectFormComponent } from '../project-form/project-form';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  imports: [DialogModule],
})
export class ProjectListComponent {
  private readonly dialog = inject(Dialog);
  private projectService = inject(ProjectService);
  private refreshTrigger = signal(0);

  projects = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  projectCount = computed(() => this.projects().length);

  // This would be determined by your authentication service
  isAdmin = true;

  constructor() {
    // This effect will run once on creation, and again every time
    // the refreshTrigger signal is updated.
    effect(() => {
      // Read the trigger signal to create a dependency
      this.refreshTrigger();
      this.getProjectList();
    });
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open<boolean>(ProjectFormComponent, {
      width: '600px', // You can set the width here
      maxWidth: '90vw', // A good practice for responsiveness
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('Dialog saved. Refreshing project list...');
        // Instead of calling getProjectList directly, we trigger the effect.
        this.refreshTrigger.update(count => count + 1);
      } else {
        console.log('Dialog was closed without saving.');
      }
    });
  }

  getProjectList() {
    this.isLoading.set(true);
    this.projectService.getAllProjects().subscribe({
      next:(res) => {
        this.projects.set(res.data);
        this.isLoading.set(false);
      }, 
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      }
    })
  }

  onUpdate(projectId: number) {
    console.log('Update project:', projectId); 
  }

  onDelete(projectId: number) {
    console.log('Delete project:', projectId);
  }
}
