import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  HorizonService,
  TasksService
} from './';


@NgModule()
export class ApiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        HorizonService,
        TasksService
      ]
    };
  }
}
