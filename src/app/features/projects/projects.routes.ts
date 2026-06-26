import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { ProjectDetailComponent } from "./project-detail/project-detail";
import { ProjectListComponent } from "./project-list/project-list";
import { ProjectFormComponent } from "./project-form/project-form";

export const PROJECT_ROUTES: Routes = [
  { path: '', component: ProjectListComponent,  },
  { path: ':id', component: ProjectDetailComponent, },
  { path: 'new-project', component: ProjectFormComponent,  }
];