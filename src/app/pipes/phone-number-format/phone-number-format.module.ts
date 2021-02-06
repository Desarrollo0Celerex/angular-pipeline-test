import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberFormatPipe } from './phone-number-format.pipe';

@NgModule({
  declarations: [PhoneNumberFormatPipe],
  exports: [PhoneNumberFormatPipe],
  imports: [
    CommonModule
  ]
})
export class PhoneNumberFormatModule { }
