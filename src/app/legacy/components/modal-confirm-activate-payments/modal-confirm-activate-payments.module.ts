import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmActivatePaymentsComponent } from './modal-confirm-activate-payments.component';

@NgModule({
  declarations: [
    ModalConfirmActivatePaymentsComponent
  ],
  exports: [
      ModalConfirmActivatePaymentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmActivatePaymentsModule { }
