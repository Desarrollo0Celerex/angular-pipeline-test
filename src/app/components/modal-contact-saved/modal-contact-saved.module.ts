import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrcodeTransferContactModule } from '@components/qrcode-transfer-contact/qrcode-transfer-contact.module';

import { ModalContactSavedComponent } from './modal-contact-saved.component';

@NgModule({
  declarations: [ModalContactSavedComponent],
  exports: [ModalContactSavedComponent],
  imports: [
    CommonModule,
    QrcodeTransferContactModule
  ]
})
export class ModalContactSavedModule { }
