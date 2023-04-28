import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalDownloadFileComponent } from './modal-download-file.component';

@NgModule({
  declarations: [
    ModalDownloadFileComponent
  ],
  exports: [
      ModalDownloadFileComponent
  ],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalDownloadFileModule { }
