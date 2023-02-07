import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRenewalAppliedComponent } from './card-renewal-applied.component';

@NgModule({
  declarations: [
    CardRenewalAppliedComponent
  ],
  exports: [
    CardRenewalAppliedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardRenewalAppliedModule { }
