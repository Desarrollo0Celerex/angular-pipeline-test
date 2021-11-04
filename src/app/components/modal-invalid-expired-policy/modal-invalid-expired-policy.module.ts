import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalInvalidExpiredPolicyComponent } from './modal-invalid-expired-policy.component';

@NgModule({
  declarations: [
    ModalInvalidExpiredPolicyComponent
  ],
  exports: [
      ModalInvalidExpiredPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalInvalidExpiredPolicyModule { }
