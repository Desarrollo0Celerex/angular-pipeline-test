import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalErrorUpdatingPaidReceiptComponent } from './modal-error-updating-paid-receipt.component';

@NgModule({
  declarations: [
    ModalErrorUpdatingPaidReceiptComponent
  ],
  exports: [
      ModalErrorUpdatingPaidReceiptComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalErrorUpdatingPaidReceiptModule { }
