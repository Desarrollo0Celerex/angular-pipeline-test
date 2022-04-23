import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPendingPaymentsComponent } from './modal-confirm-show-pending-payments.component';

@NgModule({
  declarations: [
    ModalConfirmShowPendingPaymentsComponent
  ],
  exports: [
      ModalConfirmShowPendingPaymentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPendingPaymentsModule { }
