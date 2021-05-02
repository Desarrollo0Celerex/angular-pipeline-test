import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPaymentHistoryComponent } from './modal-confirm-show-payment-history.component';

@NgModule({
  declarations: [ModalConfirmShowPaymentHistoryComponent],
  exports: [ModalConfirmShowPaymentHistoryComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPaymentHistoryModule { }
