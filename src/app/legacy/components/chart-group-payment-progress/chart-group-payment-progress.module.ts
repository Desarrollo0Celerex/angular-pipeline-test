import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartGroupPaymentProgressComponent } from './chart-group-payment-progress.component';

@NgModule({
  declarations: [
    ChartGroupPaymentProgressComponent
  ],
  exports: [
      ChartGroupPaymentProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartGroupPaymentProgressModule { }
