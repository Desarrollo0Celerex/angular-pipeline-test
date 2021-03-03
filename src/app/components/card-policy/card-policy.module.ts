import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyComponent } from './card-policy.component';

@NgModule({
  declarations: [CardPolicyComponent],
  exports: [CardPolicyComponent],
  imports: [
    CommonModule
  ]
})
export class CardPolicyModule { }
