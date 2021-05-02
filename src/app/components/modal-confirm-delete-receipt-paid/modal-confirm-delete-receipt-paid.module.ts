import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteReceiptPaidComponent } from './modal-confirm-delete-receipt-paid.component';

@NgModule({
  declarations: [ModalConfirmDeleteReceiptPaidComponent],
  exports: [ModalConfirmDeleteReceiptPaidComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteReceiptPaidModule { }
