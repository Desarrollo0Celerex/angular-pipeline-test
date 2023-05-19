import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartGroupRenewalProgressComponent } from './chart-group-renewal-progress.component';

@NgModule({
  declarations: [
    ChartGroupRenewalProgressComponent
  ],
  exports: [
      ChartGroupRenewalProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartGroupRenewalProgressModule { }
