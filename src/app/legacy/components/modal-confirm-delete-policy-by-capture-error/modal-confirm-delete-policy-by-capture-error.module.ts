import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeletePolicyByCaptureErrorComponent } from './modal-confirm-delete-policy-by-capture-error.component';

@NgModule({
  declarations: [
    ModalConfirmDeletePolicyByCaptureErrorComponent
  ],
  exports: [
      ModalConfirmDeletePolicyByCaptureErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeletePolicyByCaptureErrorModule { }
