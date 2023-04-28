import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalConfirmEndorsePolicyComponent } from './modal-confirm-endorse-policy.component';

@NgModule({
  declarations: [ModalConfirmEndorsePolicyComponent],
  exports: [ModalConfirmEndorsePolicyComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ModalConfirmEndorsePolicyModule { }
