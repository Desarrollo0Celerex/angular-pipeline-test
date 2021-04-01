import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmAmountIncreaseComponent } from './modal-confirm-amount-increase.component';

@NgModule({
  declarations: [ModalConfirmAmountIncreaseComponent],
  exports: [ModalConfirmAmountIncreaseComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmAmountIncreaseModule { }
