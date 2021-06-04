import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ContactFileService } from '@services/contact-file.service';

import { ModalTransferContactFileComponent } from './modal-transfer-contact-file.component';

@NgModule({
  declarations: [ModalTransferContactFileComponent],
  exports: [ModalTransferContactFileComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [ContactFileService]
})
export class ModalTransferContactFileModule { }
