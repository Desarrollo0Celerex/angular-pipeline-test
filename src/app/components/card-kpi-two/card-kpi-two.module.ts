import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiTwoComponent } from './card-kpi-two.component';

@NgModule({
  declarations: [
    CardKpiTwoComponent
  ],
  exports: [
      CardKpiTwoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardKpiTwoModule { }
