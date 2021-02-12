import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSendWhatsappModule } from '@components/button-send-whatsapp/button-send-whatsapp.module';
import { ButtonSendEmailModule } from '@components/button-send-email/button-send-email.module';

import { ModalShowContactDataComponent } from './modal-show-contact-data.component';

@NgModule({
  declarations: [ModalShowContactDataComponent],
  exports: [ModalShowContactDataComponent],
  imports: [
    ButtonSendEmailModule,
    ButtonSendWhatsappModule,
    CommonModule
  ]
})
export class ModalShowContactDataModule { }
