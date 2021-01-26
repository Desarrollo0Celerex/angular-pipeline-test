import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneCodeService } from '@services/phone-code.service';

import { DropdownSelectPhoneCodeComponent } from './dropdown-select-phone-code.component';
import { DropdownSelectPhoneCodeService } from './dropdown-select-phone-code.service';

@NgModule({
  declarations: [DropdownSelectPhoneCodeComponent],
  exports: [DropdownSelectPhoneCodeComponent],
  imports: [
    CommonModule
  ],
  providers: [DropdownSelectPhoneCodeService, PhoneCodeService]
})
export class DropdownSelectPhoneCodeModule { }
