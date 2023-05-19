import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPartnerRenewalProgressComponent } from './chart-partner-renewal-progress.component';

@NgModule({
  declarations: [
    ChartPartnerRenewalProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  exports: [
      ChartPartnerRenewalProgressComponent
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPartnerRenewalProgressModule { }
