import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyRecordComponent } from './card-policy-record.component';

@NgModule({
  declarations: [CardPolicyRecordComponent],
  exports: [CardPolicyRecordComponent],
  imports: [
    CommonModule
  ]
})
export class CardPolicyRecordModule { }
