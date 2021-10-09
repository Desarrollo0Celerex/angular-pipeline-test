import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PaymentService } from '@services/payment.service';

import { ModalChangePaymentDateComponent } from './modal-change-payment-date.component';

@NgModule({
  declarations: [
    ModalChangePaymentDateComponent
  ],
  exports: [
      ModalChangePaymentDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingContentModule
  ],
  providers: [
      PaymentService
  ]
})
export class ModalChangePaymentDateModule { }
