import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterStatusNameModule } from '@pipes/sinister-status-name/sinister-status-name.module';

import { CardReportedSinisterComponent } from './card-reported-sinister.component';

@NgModule({
  declarations: [CardReportedSinisterComponent],
  exports: [CardReportedSinisterComponent],
  imports: [
    CommonModule,
    SinisterStatusNameModule
  ]
})
export class CardReportedSinisterModule { }
