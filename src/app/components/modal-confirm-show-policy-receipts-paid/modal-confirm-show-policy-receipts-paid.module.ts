import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPolicyReceiptsPaidComponent } from './modal-confirm-show-policy-receipts-paid.component';

@NgModule({
  declarations: [
    ModalConfirmShowPolicyReceiptsPaidComponent
  ],
  exports: [
    ModalConfirmShowPolicyReceiptsPaidComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPolicyReceiptsPaidModule { }
