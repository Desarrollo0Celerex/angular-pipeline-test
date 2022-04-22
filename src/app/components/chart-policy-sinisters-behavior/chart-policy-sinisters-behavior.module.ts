import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicySinistersBehaviorComponent } from './chart-policy-sinisters-behavior.component';

@NgModule({
  declarations: [
    ChartPolicySinistersBehaviorComponent
  ],
  exports: [
      ChartPolicySinistersBehaviorComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicySinistersBehaviorModule { }
