import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HorizonService } from './horizon.service';
import { AppComponent } from './app.component';
import { TaskModule } from './task/task.module';
import { UIModule } from './modules/ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:      [
    BrowserModule,
    TaskModule,
    UIModule
  ],
  providers:    [HorizonService],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
