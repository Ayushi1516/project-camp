import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ProjectFormComponent } from '../project-form/project-form';
import { ProjectService } from '../../../services/project.service';
import { NotificationService } from '../../../services/notification.service';
import { project, Projects } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  imports: [DialogModule],
})
export class ProjectListComponent {
  private readonly dialog = inject(Dialog);
  private projectService = inject(ProjectService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private refreshTrigger = signal(0);

  projects = signal<Projects[]>([]);
  isLoading = signal<boolean>(false);
  projectCount = computed(() => this.projects().length);

  // This would be determined by your authentication service
  isAdmin = this.authService.hasRole('admin') || false;

  constructor() {
    // This effect will run once on creation, and again every time
    // the refreshTrigger signal is updated.
    effect(() => {
      // Read the trigger signal to create a dependency
      this.refreshTrigger();
      this.getProjectList();
    });
  }

  openCreateProjectDialog(project?: project): void {
    const dialogRef = this.dialog.open<boolean>(ProjectFormComponent, {
      width: '600px', // You can set the width here
      maxWidth: '90vw', // A good practice for responsiveness
      data: {project}
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

  navigateToProjectDetail(projectId: string): void {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      this.notificationService.showError('Could not find user ID to navigate.');
      return;
    }
    this.router.navigate(['/member', userId, 'projects', projectId]);
  }

  onUpdate(projectId: string) {
    const projectToUpdate = this.projects().find(p => p.project._id == projectId);
    projectToUpdate ? this.openCreateProjectDialog(projectToUpdate.project) : null;
  }

  onDelete(projectId: string) {
    const projectToDelete = this.projects().find(p => p.project._id == projectId);
    projectToDelete ? this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Project deleted successfully.');
        this.refreshTrigger.update(count => count + 1);
      },
      error: () => {
        this.notificationService.showError('Failed to delete project.');
      }
    }) : null;
  }
}
