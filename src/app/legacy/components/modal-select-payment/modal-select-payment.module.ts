import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPaymentShortModule } from '@components/card-payment-short/card-payment-short.module';

import { ModalSelectPaymentComponent } from './modal-select-payment.component';

@NgModule({
  declarations: [
    ModalSelectPaymentComponent
  ],
  exports: [
      ModalSelectPaymentComponent
  ],
  imports: [
    CommonModule,
    CardPaymentShortModule
  ]
})
export class ModalSelectPaymentModule { }
