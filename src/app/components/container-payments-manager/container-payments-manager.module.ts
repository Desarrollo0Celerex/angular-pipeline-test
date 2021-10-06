import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalChangePaymentDateModule } from '@components/modal-change-payment-date/modal-change-payment-date.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalConfirmSuspendPaymentsModule } from '@components/modal-confirm-suspend-payments/modal-confirm-suspend-payments.module';
import { ModalConfirmActivatePaymentsModule } from '@components/modal-confirm-activate-payments/modal-confirm-activate-payments.module';
import { PaymentService } from '@services/payment.service';
import { PolicyService } from '@services/policy.service';

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
    ModalChangePaymentDateModule,
    ModalConfirmSuspendPaymentsModule,
    ModalConfirmActivatePaymentsModule
  ],
  providers: [
      PaymentService,
      PolicyService
  ]
})
export class ContainerPaymentsManagerModule { }
