import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPartnerWalletProjectionComponent } from './chart-partner-wallet-projection.component';

@NgModule({
  declarations: [
    ChartPartnerWalletProjectionComponent
  ],
  exports: [
    ChartPartnerWalletProjectionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPartnerWalletProjectionModule { }
