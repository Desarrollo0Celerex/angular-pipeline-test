import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmPolicyInsuredsComponent } from './modal-confirm-policy-insureds.component';

@NgModule({
  declarations: [
    ModalConfirmPolicyInsuredsComponent
  ],
  exports: [
    ModalConfirmPolicyInsuredsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmPolicyInsuredsModule { }
