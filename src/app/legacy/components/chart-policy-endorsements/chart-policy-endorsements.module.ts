import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicyEndorsementsComponent } from './chart-policy-endorsements.component';

@NgModule({
  declarations: [
    ChartPolicyEndorsementsComponent
  ],
  exports: [
      ChartPolicyEndorsementsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicyEndorsementsModule { }
