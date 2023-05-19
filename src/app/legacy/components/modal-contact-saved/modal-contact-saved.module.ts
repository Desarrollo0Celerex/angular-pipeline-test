import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDownloadContactModule } from '@components/button-download-contact/button-download-contact.module';
import { QrcodeTransferContactModule } from '@components/qrcode-transfer-contact/qrcode-transfer-contact.module';

import { ModalContactSavedComponent } from './modal-contact-saved.component';

@NgModule({
  declarations: [ModalContactSavedComponent],
  exports: [ModalContactSavedComponent],
  imports: [
    ButtonDownloadContactModule,
    CommonModule,
    QrcodeTransferContactModule
  ]
})
export class ModalContactSavedModule { }
