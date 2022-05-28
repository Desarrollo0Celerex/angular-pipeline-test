import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertPartnerUnusualCancelledPoliciesModule } from '@components/alert-partner-unusual-cancelled-policies/alert-partner-unusual-cancelled-policies.module';
import { AlertPartnerUnusualAppliedRenewalsModule } from '@components/alert-partner-unusual-applied-renewals/alert-partner-unusual-applied-renewals.module';
import { CardPartnerActiveCoveragesModule } from '@components/card-partner-active-coverages/card-partner-active-coverages.module';
import { CardPartnerGlobalBalanceModule } from '@components/card-partner-global-balance/card-partner-global-balance.module';
import { CardPartnerPaymentProgressModule } from '@components/card-partner-payment-progress/card-partner-payment-progress.module';
import { CardPartnerPaymentReportsModule } from '@components/card-partner-payment-reports/card-partner-payment-reports.module';
import { CardPartnerPreferredInsurersModule } from '@components/card-partner-preferred-insurers/card-partner-preferred-insurers.module';
import { CardPartnerRenewalProgressModule } from '@components/card-partner-renewal-progress/card-partner-renewal-progress.module';
import { CardPartnerRenewalReportsModule } from '@components/card-partner-renewal-reports/card-partner-renewal-reports.module';
import { CardPartnerWalletGlobalModule } from '@components/card-partner-wallet-global/card-partner-wallet-global.module';
import { CardPartnerWalletProjectionModule } from '@components/card-partner-wallet-projection/card-partner-wallet-projection.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    AlertPartnerUnusualCancelledPoliciesModule,
    AlertPartnerUnusualAppliedRenewalsModule,
    CardPartnerActiveCoveragesModule,
    CardPartnerGlobalBalanceModule,
    CardPartnerPaymentProgressModule,
    CardPartnerPaymentReportsModule,
    CardPartnerPreferredInsurersModule,
    CardPartnerRenewalProgressModule,
    CardPartnerRenewalReportsModule,
    CardPartnerWalletGlobalModule,
    CardPartnerWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
