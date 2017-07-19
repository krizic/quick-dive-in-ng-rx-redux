import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './components/signin.component';
import { SigninPageComponent } from './signin-page.component';
import { ApiModule } from '../../api/api.module';
import { UIModule } from '../../modules/ui.module';


@NgModule({
  imports:      [
    CommonModule,
    ApiModule,
    UIModule
  ],
  exports:      [
    SigninPageComponent,
    SigninComponent
  ],
  declarations: [
    SigninPageComponent,
    SigninComponent
  ],
  providers:    [],
})
export class SigninPageModule {
}
