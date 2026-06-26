import { Routes } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard';
import { DashboardHomeComponent } from './dashboard-home';
import { TaskListComponent } from '../tasks/task-list/task-list';
import { TaskDetailComponent } from '../tasks/task-detail/task-detail';
import { NoteListComponent } from '../notes/note-list/note-list';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberDashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent }, // Default view
      {
        path: 'projects',
        loadChildren: () =>
          import('../projects/projects.routes').then(r => r.PROJECT_ROUTES),
      },
       { path: 'teams', component: TaskDetailComponent },
       { path: 'tasks', component: TaskListComponent},
       { path: 'notes', component: NoteListComponent}
    ],
  },
];