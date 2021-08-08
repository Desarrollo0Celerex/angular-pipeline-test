import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeletePolicyCompleteComponent } from './modal-confirm-delete-policy-complete.component';

import { PolicyService } from '@services/policy.service';

@NgModule({
  declarations: [
    ModalConfirmDeletePolicyCompleteComponent
  ],
  exports: [ModalConfirmDeletePolicyCompleteComponent],
  imports: [
    CommonModule
  ],
  providers: [PolicyService]
})
export class ModalConfirmDeletePolicyCompleteModule { }
