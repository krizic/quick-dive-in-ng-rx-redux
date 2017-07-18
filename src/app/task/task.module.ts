import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TaskAddComponent,
    TaskListComponent
  ],
  exports: [
    TaskAddComponent,
    TaskListComponent
  ]
})
export class TaskModule { }
