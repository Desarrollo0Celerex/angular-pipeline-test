import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartContactPaymentProgressComponent } from './chart-contact-payment-progress.component';

@NgModule({
  declarations: [
    ChartContactPaymentProgressComponent
  ],
  exports: [
      ChartContactPaymentProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartContactPaymentProgressModule { }
