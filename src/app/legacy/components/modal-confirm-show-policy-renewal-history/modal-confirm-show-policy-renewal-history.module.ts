import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPolicyRenewalHistoryComponent } from './modal-confirm-show-policy-renewal-history.component';

@NgModule({
  declarations: [
    ModalConfirmShowPolicyRenewalHistoryComponent
  ],
  exports: [
      ModalConfirmShowPolicyRenewalHistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShowPolicyRenewalHistoryModule { }
