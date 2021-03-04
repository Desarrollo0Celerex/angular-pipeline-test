import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelFoundFormatPipe } from './label-found-format.pipe';

@NgModule({
  declarations: [LabelFoundFormatPipe],
  exports: [LabelFoundFormatPipe],
  imports: [
    CommonModule
  ]
})
export class LabelFoundFormatModule { }
