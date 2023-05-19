import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryService } from '@services/country.service';

import { DropdownSelectPhoneCodeComponent } from './dropdown-select-phone-code.component';
import { DropdownSelectPhoneCodeService } from './dropdown-select-phone-code.service';

@NgModule({
  declarations: [DropdownSelectPhoneCodeComponent],
  exports: [DropdownSelectPhoneCodeComponent],
  imports: [
    CommonModule
  ],
  providers: [
      DropdownSelectPhoneCodeService,
      CountryService
  ]
})
export class DropdownSelectPhoneCodeModule { }
