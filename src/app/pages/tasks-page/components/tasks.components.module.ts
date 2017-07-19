import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UIModule } from '../../../modules/ui.module';
import { TaskAddRxComponent } from './task-add-rx/task-add-rx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskTimelineComponent } from './task-timeline/task-timeline.component';
import { LogsTimelineComponent } from './logs-timeline/logs-timeline.component';

const COMPONENTS = [
  TaskAddComponent,
  TaskListComponent,
  TaskAddRxComponent,
  TaskTimelineComponent,
  LogsTimelineComponent
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
export class TasksComponentsModule {
}
