import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalConfirmUpdatePolicyComponent } from './modal-confirm-update-policy.component';

@NgModule({
  declarations: [ModalConfirmUpdatePolicyComponent],
  exports: [ModalConfirmUpdatePolicyComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ModalConfirmUpdatePolicyModule { }
