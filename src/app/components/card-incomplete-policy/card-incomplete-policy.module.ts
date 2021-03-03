import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardIncompletePolicyComponent } from './card-incomplete-policy.component';

@NgModule({
  declarations: [CardIncompletePolicyComponent],
  exports: [CardIncompletePolicyComponent],
  imports: [
    CommonModule
  ]
})
export class CardIncompletePolicyModule { }
