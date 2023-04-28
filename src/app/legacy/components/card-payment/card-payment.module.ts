import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPaymentComponent } from './card-payment.component';

@NgModule({
  declarations: [CardPaymentComponent],
  exports: [CardPaymentComponent],
  imports: [
    CommonModule
  ]
})
export class CardPaymentModule { }
