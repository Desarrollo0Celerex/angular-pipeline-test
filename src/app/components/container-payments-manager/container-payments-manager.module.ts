import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalChangePaymentDateModule } from '@components/modal-change-payment-date/modal-change-payment-date.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { PaymentService } from '@services/payment.service';

import { ContainerPaymentsManagerComponent } from './container-payments-manager.component';

@NgModule({
  declarations: [
    ContainerPaymentsManagerComponent
  ],
  exports: [
      ContainerPaymentsManagerComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    ModalShowPolicyFileModule,
    ModalChangePaymentDateModule
  ],
  providers: [
      PaymentService
  ]
})
export class ContainerPaymentsManagerModule { }
