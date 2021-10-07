import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyPaymentWithBalanceOutstandingModule } from '@components/modal-confirm-apply-payment-with-balance-outstanding/modal-confirm-apply-payment-with-balance-outstanding.module';
import { ModalConfirmApplyPaymentWithBalanceRemainingModule } from '@components/modal-confirm-apply-payment-with-balance-remaining/modal-confirm-apply-payment-with-balance-remaining.module';
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
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe, PaymentService, ReceiptPaidService]
})
export class ModalApplyPaymentModule { }
