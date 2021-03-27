import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalConfirmDeletePolicyComponent } from './modal-confirm-delete-policy.component';
import { ModalConfirmDeletePolicyService } from './modal-confirm-delete-policy.service';

@NgModule({
  declarations: [ModalConfirmDeletePolicyComponent],
  exports: [ModalConfirmDeletePolicyComponent],
  imports: [
    CommonModule
  ],
  providers: [ModalConfirmDeletePolicyService, PolicyService]
})
export class ModalConfirmDeletePolicyModule { }
