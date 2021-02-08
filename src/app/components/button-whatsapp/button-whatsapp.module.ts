import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';

import { ButtonWhatsappComponent } from './button-whatsapp.component';

@NgModule({
  declarations: [ButtonWhatsappComponent],
  exports: [ButtonWhatsappComponent],
  imports: [
    CommonModule,
    PhoneNumberFormatModule
  ]
})
export class ButtonWhatsappModule { }
