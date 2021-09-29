import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteRenewedPolicyComponent } from './modal-confirm-delete-renewed-policy.component';

@NgModule({
  declarations: [
    ModalConfirmDeleteRenewedPolicyComponent
  ],
  exports: [
      ModalConfirmDeleteRenewedPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteRenewedPolicyModule { }
