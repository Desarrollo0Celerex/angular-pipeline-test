import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmApplyCancellationComponent } from './modal-confirm-apply-cancellation.component';

@NgModule({
  declarations: [ModalConfirmApplyCancellationComponent],
  exports: [ModalConfirmApplyCancellationComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmApplyCancellationModule { }
