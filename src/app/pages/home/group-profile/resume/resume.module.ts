import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGroupWalletGlobalModule } from '@components/card-group-wallet-global/card-group-wallet-global.module';
import { ChartGroupActiveCoveragesModule } from '@components/chart-group-active-coverages/chart-group-active-coverages.module';
import { ChartGroupGlobalBalanceModule } from '@components/chart-group-global-balance/chart-group-global-balance.module';
import { ChartGroupPreferredInsurersModule } from '@components/chart-group-preferred-insurers/chart-group-preferred-insurers.module';
import { ChartGroupRenewalProgressModule } from '@components/chart-group-renewal-progress/chart-group-renewal-progress.module';
import { ChartGroupWalletProjectionModule } from '@components/chart-group-wallet-projection/chart-group-wallet-projection.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CardGroupWalletGlobalModule,
    ChartGroupActiveCoveragesModule,
    ChartGroupGlobalBalanceModule,
    ChartGroupPreferredInsurersModule,
    ChartGroupRenewalProgressModule,
    ChartGroupWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule,
    ContentListModule
  ]
})
export class ResumeModule { }
