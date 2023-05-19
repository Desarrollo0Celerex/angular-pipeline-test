import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicyPaymentsBehaviorComponent } from './chart-policy-payments-behavior.component';

@NgModule({
  declarations: [
    ChartPolicyPaymentsBehaviorComponent
  ],
  exports: [
      ChartPolicyPaymentsBehaviorComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicyPaymentsBehaviorModule { }
