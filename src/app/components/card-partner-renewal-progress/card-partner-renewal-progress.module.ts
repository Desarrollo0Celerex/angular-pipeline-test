import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { CardPartnerRenewalProgressComponent } from './card-partner-renewal-progress.component';

@NgModule({
  declarations: [
    CardPartnerRenewalProgressComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  exports: [
      CardPartnerRenewalProgressComponent
  ],
  providers: [
      StatisticService
  ]
})
export class CardPartnerRenewalProgressModule { }
