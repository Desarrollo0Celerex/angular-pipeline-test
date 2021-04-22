import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmApplyPolicyChangesComponent } from './modal-confirm-apply-policy-changes.component';

@NgModule({
  declarations: [ModalConfirmApplyPolicyChangesComponent],
  exports: [ModalConfirmApplyPolicyChangesComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmApplyPolicyChangesModule { }
