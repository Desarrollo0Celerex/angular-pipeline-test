import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { modalConfirmApplyFractionalReceiptComponent } from './modal-confirm-apply-fractional-receipt.component';

@NgModule({
  declarations: [modalConfirmApplyFractionalReceiptComponent],
  exports: [modalConfirmApplyFractionalReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class modalConfirmApplyFractionalReceiptModule { }
