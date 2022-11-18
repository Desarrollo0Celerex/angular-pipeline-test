import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe  } from '@angular/common';

import { SinisterStatusNameModule } from '@pipes/sinister-status-name/sinister-status-name.module';

import { CardPolicyRecordComponent } from './card-policy-record.component';

@NgModule({
  declarations: [CardPolicyRecordComponent],
  exports: [CardPolicyRecordComponent],
  imports: [
    CommonModule,
    SinisterStatusNameModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class CardPolicyRecordModule { }
