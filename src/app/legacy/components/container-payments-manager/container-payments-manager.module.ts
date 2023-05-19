import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmSuspendPaymentsModule } from '@components/modal-confirm-suspend-payments/modal-confirm-suspend-payments.module';
import { ModalConfirmActivatePaymentsModule } from '@components/modal-confirm-activate-payments/modal-confirm-activate-payments.module';
import { ModalConfirmShowPendingPaymentsModule } from '@components/modal-confirm-show-pending-payments/modal-confirm-show-pending-payments.module';
import { ModalConfirmShowPaymentHistoryModule } from '@components/modal-confirm-show-payment-history/modal-confirm-show-payment-history.module';
import { ModalConfirmShowPolicyReceiptsPaidModule } from '@components/modal-confirm-show-policy-receipts-paid/modal-confirm-show-policy-receipts-paid.module';
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
    ModalConfirmSuspendPaymentsModule,
    ModalConfirmActivatePaymentsModule,
    ModalConfirmShowPolicyReceiptsPaidModule,
    ModalConfirmShowPendingPaymentsModule,
    ModalConfirmShowPaymentHistoryModule
  ],
  providers: [
      PaymentService,
      PolicyService
  ]
})
export class ContainerPaymentsManagerModule { }
