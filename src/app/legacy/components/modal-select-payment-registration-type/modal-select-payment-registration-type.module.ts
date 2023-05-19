import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from '@services/payment.service';

import { ModalSelectPaymentRegistrationTypeComponent } from './modal-select-payment-registration-type.component';

@NgModule({
  declarations: [
    ModalSelectPaymentRegistrationTypeComponent
  ],
  exports: [
      ModalSelectPaymentRegistrationTypeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PaymentService
  ]
})
export class ModalSelectPaymentRegistrationTypeModule { }
