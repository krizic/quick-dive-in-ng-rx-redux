import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksComponentsModule } from './components/tasks.components.module';
import { TasksPageComponent } from './tasks-page.component';

@NgModule({
  imports:      [
    CommonModule,
    TasksComponentsModule
  ],
  exports:      [
    TasksComponentsModule,
    TasksPageComponent
  ],
  declarations: [
    TasksPageComponent
  ],
  providers:    [],
})
export class TasksPageModule {
}
