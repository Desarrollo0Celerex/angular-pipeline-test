import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralNameFormatPipe } from './plural-name-format.pipe';

@NgModule({
  declarations: [PluralNameFormatPipe],
  exports: [PluralNameFormatPipe],
  imports: [
    CommonModule
  ]
})
export class PluralNameFormatModule { }
