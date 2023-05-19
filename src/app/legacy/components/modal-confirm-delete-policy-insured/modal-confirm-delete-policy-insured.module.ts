import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeletePolicyInsuredComponent } from './modal-confirm-delete-policy-insured.component';

@NgModule({
  declarations: [
    ModalConfirmDeletePolicyInsuredComponent
  ],
  exports: [
    ModalConfirmDeletePolicyInsuredComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeletePolicyInsuredModule { }
