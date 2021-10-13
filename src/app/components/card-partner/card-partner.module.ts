import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPartnerComponent } from './card-partner.component';

@NgModule({
  declarations: [
    CardPartnerComponent
  ],
  exports: [
      CardPartnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardPartnerModule { }
