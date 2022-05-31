import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPartnerPaymentProgressComponent } from './chart-partner-payment-progress.component';

@NgModule({
  declarations: [
    ChartPartnerPaymentProgressComponent
  ],
  exports: [
      ChartPartnerPaymentProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPartnerPaymentProgressModule { }
