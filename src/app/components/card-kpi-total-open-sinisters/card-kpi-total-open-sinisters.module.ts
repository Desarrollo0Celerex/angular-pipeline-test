import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterService } from '@services/sinister.service';

import { CardKpiTotalOpenSinistersComponent } from './card-kpi-total-open-sinisters.component';

@NgModule({
  declarations: [
    CardKpiTotalOpenSinistersComponent
  ],
  exports: [
      CardKpiTotalOpenSinistersComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      SinisterService
  ]
})
export class CardKpiTotalOpenSinistersModule { }
