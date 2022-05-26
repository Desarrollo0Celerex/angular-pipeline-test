import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { CardPartnerPaymentProgressComponent } from './card-partner-payment-progress.component';

@NgModule({
  declarations: [
    CardPartnerPaymentProgressComponent
  ],
  exports: [
      CardPartnerPaymentProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class CardPartnerPaymentProgressModule { }
