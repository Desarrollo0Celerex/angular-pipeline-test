import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPaymentShortComponent } from './card-payment-short.component';

@NgModule({
  declarations: [
    CardPaymentShortComponent
  ],
  exports: [
      CardPaymentShortComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardPaymentShortModule { }
