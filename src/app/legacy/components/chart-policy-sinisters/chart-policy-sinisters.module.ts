import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicySinistersComponent } from './chart-policy-sinisters.component';

@NgModule({
  declarations: [
    ChartPolicySinistersComponent
  ],
  exports: [
      ChartPolicySinistersComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicySinistersModule { }
