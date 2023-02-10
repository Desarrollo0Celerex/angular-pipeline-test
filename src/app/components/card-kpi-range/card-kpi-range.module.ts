import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardKpiRangeComponent } from './card-kpi-range.component';

@NgModule({
  declarations: [
    CardKpiRangeComponent
  ],
  exports: [
    CardKpiRangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardKpiRangeModule { }
