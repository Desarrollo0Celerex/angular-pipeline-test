import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicyEndorsementsBehaviorComponent } from './chart-policy-endorsements-behavior.component';

@NgModule({
  declarations: [
    ChartPolicyEndorsementsBehaviorComponent
  ],
  exports: [ChartPolicyEndorsementsBehaviorComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicyEndorsementsBehaviorModule { }
