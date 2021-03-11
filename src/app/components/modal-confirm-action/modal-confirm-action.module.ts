import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmActionComponent } from './modal-confirm-action.component';

@NgModule({
  declarations: [ModalConfirmActionComponent],
  exports: [ModalConfirmActionComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmActionModule { }
