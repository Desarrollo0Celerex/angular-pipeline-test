import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneComponent } from './card-kpi-one.component';

@NgModule({
  declarations: [
    CardKpiOneComponent
  ],
  exports: [
    CardKpiOneComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardKpiOneModule { }
