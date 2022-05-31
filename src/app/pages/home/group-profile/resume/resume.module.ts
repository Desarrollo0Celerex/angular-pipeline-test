import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertGroupUnusualWalletDecreaseModule } from '@components/alert-group-unusual-wallet-decrease/alert-group-unusual-wallet-decrease.module';
import { CardGroupPaymentReportsModule } from '@components/card-group-payment-reports/card-group-payment-reports.module';
import { CardGroupRenewalReportsModule } from '@components/card-group-renewal-reports/card-group-renewal-reports.module';
import { CardGroupWalletGlobalModule } from '@components/card-group-wallet-global/card-group-wallet-global.module';
import { ChartGroupActiveCoveragesModule } from '@components/chart-group-active-coverages/chart-group-active-coverages.module';
import { ChartGroupGlobalBalanceModule } from '@components/chart-group-global-balance/chart-group-global-balance.module';
import { ChartGroupPaymentProgressModule } from '@components/chart-group-payment-progress/chart-group-payment-progress.module';
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
    AlertGroupUnusualWalletDecreaseModule,
    CardGroupPaymentReportsModule,
    CardGroupRenewalReportsModule,
    CardGroupWalletGlobalModule,
    ChartGroupActiveCoveragesModule,
    ChartGroupGlobalBalanceModule,
    ChartGroupPaymentProgressModule,
    ChartGroupPreferredInsurersModule,
    ChartGroupRenewalProgressModule,
    ChartGroupWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule,
    ContentListModule
  ]
})
export class ResumeModule { }
