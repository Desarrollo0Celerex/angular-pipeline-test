import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartContactRenewalProgressComponent } from './chart-contact-renewal-progress.component';

@NgModule({
  declarations: [
    ChartContactRenewalProgressComponent
  ],
  exports: [
      ChartContactRenewalProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartContactRenewalProgressModule { }
