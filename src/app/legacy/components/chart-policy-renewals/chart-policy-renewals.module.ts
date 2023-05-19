import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { StatisticService } from '@services/statistic.service';

import { ChartPolicyRenewalsComponent } from './chart-policy-renewals.component';

@NgModule({
  declarations: [
    ChartPolicyRenewalsComponent
  ],
  exports: [
      ChartPolicyRenewalsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      StatisticService
  ]
})
export class ChartPolicyRenewalsModule { }
