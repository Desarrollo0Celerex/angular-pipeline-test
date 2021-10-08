import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyPaymentWithBalanceOutstandingModule } from '@components/modal-confirm-apply-payment-with-balance-outstanding/modal-confirm-apply-payment-with-balance-outstanding.module';
import { ModalConfirmApplyPaymentWithBalanceRemainingModule } from '@components/modal-confirm-apply-payment-with-balance-remaining/modal-confirm-apply-payment-with-balance-remaining.module';
import { ModalNotifyAmountExceededModule } from '@components/modal-notify-amount-exceeded/modal-notify-amount-exceeded.module';
import { ModalNotifyReceiptsExceededModule } from '@components/modal-notify-receipts-exceeded/modal-notify-receipts-exceeded.module';
import { ModalNotifyMissingReceiptsModule } from '@components/modal-notify-missing-receipts/modal-notify-missing-receipts.module';
import { ModalNotifyMissingAmountModule } from '@components/modal-notify-missing-amount/modal-notify-missing-amount.module';
import { PaymentService } from '@services/payment.service';
import { ReceiptPaidService } from '@services/receipt-paid.service';

import { ModalApplyPaymentComponent } from './modal-apply-payment.component';

@NgModule({
  declarations: [ModalApplyPaymentComponent],
  exports: [ModalApplyPaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmApplyPaymentWithBalanceOutstandingModule,
    ModalConfirmApplyPaymentWithBalanceRemainingModule,
    ReactiveFormsModule,
    ModalNotifyAmountExceededModule,
    ModalNotifyReceiptsExceededModule,
    ModalNotifyMissingReceiptsModule,
    ModalNotifyMissingAmountModule
  ],
  providers: [CurrencyPipe, PaymentService, ReceiptPaidService]
})
export class ModalApplyPaymentModule { }
