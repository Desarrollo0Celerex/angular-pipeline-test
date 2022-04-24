import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { ModalShowPaymentEvidenceFileComponent } from './modal-show-payment-evidence-file.component';

@NgModule({
  declarations: [
    ModalShowPaymentEvidenceFileComponent
  ],
  exports: [
      ModalShowPaymentEvidenceFileComponent
  ],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ]
})
export class ModalShowPaymentEvidenceFileModule { }
