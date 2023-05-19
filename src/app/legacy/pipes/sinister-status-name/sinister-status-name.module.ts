import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterStatusNamePipe } from './sinister-status-name.pipe';

@NgModule({
  declarations: [
    SinisterStatusNamePipe
  ],
  exports: [
      SinisterStatusNamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SinisterStatusNameModule { }
