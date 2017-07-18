import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HorizonService } from './horizon.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HorizonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
