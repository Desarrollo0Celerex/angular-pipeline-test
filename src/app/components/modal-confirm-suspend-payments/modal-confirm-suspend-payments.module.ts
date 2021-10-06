import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmSuspendPaymentsComponent } from './modal-confirm-suspend-payments.component';

@NgModule({
  declarations: [
    ModalConfirmSuspendPaymentsComponent
  ],
  exports: [
      ModalConfirmSuspendPaymentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmSuspendPaymentsModule { }
