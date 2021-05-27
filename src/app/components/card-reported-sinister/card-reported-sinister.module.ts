import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportedSinisterComponent } from './card-reported-sinister.component';

@NgModule({
  declarations: [CardReportedSinisterComponent],
  exports: [CardReportedSinisterComponent],
  imports: [
    CommonModule
  ]
})
export class CardReportedSinisterModule { }
