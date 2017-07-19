import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  HorizonService,
  TasksService,
  UserService
} from './';


@NgModule()
export class ApiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        HorizonService,
        TasksService,
        UserService
      ]
    };
  }
}
