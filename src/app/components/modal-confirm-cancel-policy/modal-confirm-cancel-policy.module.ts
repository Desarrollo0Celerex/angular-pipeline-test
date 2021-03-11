import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalConfirmCancelPolicyComponent } from './modal-confirm-cancel-policy.component';

@NgModule({
  declarations: [ModalConfirmCancelPolicyComponent],
  exports: [ModalConfirmCancelPolicyComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ModalConfirmCancelPolicyModule { }
