import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardQuotationComponent } from './card-quotation.component';

@NgModule({
  declarations: [CardQuotationComponent],
  exports: [CardQuotationComponent],
  imports: [
    CommonModule
  ]
})
export class CardQuotationModule { }
