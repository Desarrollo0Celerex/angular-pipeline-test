import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalInvalidHistoryPolicyComponent } from './modal-invalid-history-policy.component';

@NgModule({
  declarations: [
    ModalInvalidHistoryPolicyComponent
  ],
  exports: [
      ModalInvalidHistoryPolicyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalInvalidHistoryPolicyModule { }
