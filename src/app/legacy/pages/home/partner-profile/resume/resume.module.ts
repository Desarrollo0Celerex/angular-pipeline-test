import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertPartnerUnusualAppliedPaymentsModule } from '@components/alert-partner-unusual-applied-payments/alert-partner-unusual-applied-payments.module';
import { AlertPartnerUnusualAppliedRenewalsModule } from '@components/alert-partner-unusual-applied-renewals/alert-partner-unusual-applied-renewals.module';
import { AlertPartnerUnusualCancelledPoliciesModule } from '@components/alert-partner-unusual-cancelled-policies/alert-partner-unusual-cancelled-policies.module';
import { AlertPartnerUnusualWalletDecreaseModule } from '@components/alert-partner-unusual-wallet-decrease/alert-partner-unusual-wallet-decrease.module';
import { ChartPartnerActiveCoveragesModule } from '@components/chart-partner-active-coverages/chart-partner-active-coverages.module';
import { ChartPartnerGlobalBalanceModule } from '@components/chart-partner-global-balance/chart-partner-global-balance.module';
import { ChartPartnerPaymentProgressModule } from '@components/chart-partner-payment-progress/chart-partner-payment-progress.module';
import { CardPartnerPaymentReportsModule } from '@components/card-partner-payment-reports/card-partner-payment-reports.module';
import { ChartPartnerPreferredInsurersModule } from '@components/chart-partner-preferred-insurers/chart-partner-preferred-insurers.module';
import { ChartPartnerRenewalProgressModule } from '@components/chart-partner-renewal-progress/chart-partner-renewal-progress.module';
import { CardPartnerRenewalReportsModule } from '@components/card-partner-renewal-reports/card-partner-renewal-reports.module';
import { CardPartnerWalletGlobalModule } from '@components/card-partner-wallet-global/card-partner-wallet-global.module';
import { ChartPartnerWalletProjectionModule } from '@components/chart-partner-wallet-projection/chart-partner-wallet-projection.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    AlertPartnerUnusualAppliedPaymentsModule,
    AlertPartnerUnusualAppliedRenewalsModule,
    AlertPartnerUnusualCancelledPoliciesModule,
    AlertPartnerUnusualWalletDecreaseModule,
    ChartPartnerActiveCoveragesModule,
    ChartPartnerGlobalBalanceModule,
    ChartPartnerPaymentProgressModule,
    CardPartnerPaymentReportsModule,
    ChartPartnerPreferredInsurersModule,
    ChartPartnerRenewalProgressModule,
    CardPartnerRenewalReportsModule,
    CardPartnerWalletGlobalModule,
    ChartPartnerWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
