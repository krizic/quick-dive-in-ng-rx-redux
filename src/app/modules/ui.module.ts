import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule,
  MdInputModule, MdLineModule,
  MdListModule
} from '@angular/material';

const MdModules = [
  MdButtonModule,
  MdInputModule,
  MdListModule,
  MdCardModule,
  MdCheckboxModule,
  MdListModule,
  MdLineModule
];

@NgModule({
  imports: [...MdModules, CommonModule, NoopAnimationsModule],
  exports: [...MdModules]
})
export class UIModule { }
