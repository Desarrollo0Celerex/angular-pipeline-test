import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyInsuredComponent } from './card-policy-insured.component';

@NgModule({
  declarations: [
    CardPolicyInsuredComponent
  ],
  exports: [
    CardPolicyInsuredComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardPolicyInsuredModule { }
