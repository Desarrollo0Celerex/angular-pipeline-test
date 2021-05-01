import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmApplyPaymentWithBalanceOutstandingComponent } from './modal-confirm-apply-payment-with-balance-outstanding.component';

@NgModule({
  declarations: [ModalConfirmApplyPaymentWithBalanceOutstandingComponent],
  exports: [ModalConfirmApplyPaymentWithBalanceOutstandingComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmApplyPaymentWithBalanceOutstandingModule { }
