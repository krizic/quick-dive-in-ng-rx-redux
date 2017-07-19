import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskModule } from './task/task.module';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:      [
    ApiModule.forRoot(),
    BrowserModule,
    TaskModule
  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
