import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReceiptAppliedComponent } from './card-receipt-applied.component';

@NgModule({
  declarations: [
    CardReceiptAppliedComponent
  ],
  exports: [
      CardReceiptAppliedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardReceiptAppliedModule { }
