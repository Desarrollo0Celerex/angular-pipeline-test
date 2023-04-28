import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalConfirmShowPaymentHistoryComponent } from './modal-confirm-show-payment-history.component';

@NgModule({
  declarations: [ModalConfirmShowPaymentHistoryComponent],
  exports: [ModalConfirmShowPaymentHistoryComponent],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class ModalConfirmShowPaymentHistoryModule { }
