import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmUpdateExternalPolicyComponent } from './modal-confirm-update-external-policy.component';

@NgModule({
  declarations: [
    ModalConfirmUpdateExternalPolicyComponent
  ],
  exports: [
      ModalConfirmUpdateExternalPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmUpdateExternalPolicyModule { }
