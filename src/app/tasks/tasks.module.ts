import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list';

@NgModule({
  declarations: [],
  imports: [CommonModule, TaskListComponent],
  exports: [TaskListComponent]
})
export class TasksModule {}
