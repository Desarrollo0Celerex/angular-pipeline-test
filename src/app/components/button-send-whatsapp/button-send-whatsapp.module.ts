import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberFormatModule } from '@pipes/phone-number-format/phone-number-format.module';

import { ButtonSendWhatsappComponent } from './button-send-whatsapp.component';

@NgModule({
  declarations: [ButtonSendWhatsappComponent],
  exports: [ButtonSendWhatsappComponent],
  imports: [
    CommonModule,
    PhoneNumberFormatModule
  ]
})
export class ButtonSendWhatsappModule { }
