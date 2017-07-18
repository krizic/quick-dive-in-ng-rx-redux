import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UIModule } from '../modules/ui.module';
import { TaskAddRxComponent } from './task-add-rx/task-add-rx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  TaskAddComponent,
  TaskListComponent,
  TaskAddRxComponent
]

@NgModule({
  imports:      [
    UIModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports:      [
    ...COMPONENTS
  ]
})
export class TaskModule {
}
