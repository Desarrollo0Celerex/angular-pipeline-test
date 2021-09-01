import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmValidateExternalPolicyComponent } from './modal-confirm-validate-external-policy.component';

@NgModule({
  declarations: [
    ModalConfirmValidateExternalPolicyComponent
  ],
  exports: [
      ModalConfirmValidateExternalPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmValidateExternalPolicyModule { }
