import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartGroupWalletProjectionComponent } from './chart-group-wallet-projection.component';

@NgModule({
  declarations: [
    ChartGroupWalletProjectionComponent
  ],
  exports: [
      ChartGroupWalletProjectionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartGroupWalletProjectionModule { }
