import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalSelectPaymentModule } from '@components/modal-select-payment/modal-select-payment.module';
import { PaymentService } from '@services/payment.service';

import { ModalSearchPaymentComponent } from './modal-search-payment.component';

@NgModule({
  declarations: [
    ModalSearchPaymentComponent
  ],
  exports: [
      ModalSearchPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalSelectPaymentModule
  ],
  providers: [
      PaymentService
  ]
})
export class ModalSearchPaymentModule { }
