import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowNoFractionalReceiptComponent } from './modal-show-no-fractional-receipt.component';

@NgModule({
  declarations: [ModalShowNoFractionalReceiptComponent],
  exports: [ModalShowNoFractionalReceiptComponent],
  imports: [
    CommonModule
  ]
})
export class ModalShowNoFractionalReceiptModule { }
