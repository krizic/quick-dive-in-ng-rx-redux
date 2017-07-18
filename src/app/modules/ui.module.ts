import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdInputModule,
  MdListModule
} from '@angular/material';

const MdModules = [
  MdButtonModule,
  MdInputModule,
  MdListModule
];

@NgModule({
  imports: [...MdModules, CommonModule, NoopAnimationsModule],
  exports: [...MdModules]
})
export class UIModule { }
