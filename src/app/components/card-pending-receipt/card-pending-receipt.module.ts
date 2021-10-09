import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPendingReceiptComponent } from './card-pending-receipt.component';

@NgModule({
  declarations: [
    CardPendingReceiptComponent
  ],
  exports: [
      CardPendingReceiptComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardPendingReceiptModule { }
