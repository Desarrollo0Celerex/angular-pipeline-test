import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertContactUnusualWalletDecreaseModule } from '@components/alert-contact-unusual-wallet-decrease/alert-contact-unusual-wallet-decrease.module';
import { ChartContactActiveCoveragesModule } from '@components/chart-contact-active-coverages/chart-contact-active-coverages.module';
import { CardContactConversionRateModule } from '@components/card-contact-conversion-rate/card-contact-conversion-rate.module';
import { CardContactProtectionRateModule } from '@components/card-contact-protection-rate/card-contact-protection-rate.module';
import { CardContactPaymentReportsModule } from '@components/card-contact-payment-reports/card-contact-payment-reports.module';
import { CardContactRenewalReportsModule } from '@components/card-contact-renewal-reports/card-contact-renewal-reports.module';
import { ChartContactGlobalBalanceModule } from '@components/chart-contact-global-balance/chart-contact-global-balance.module';
import { ChartContactPaymentProgressModule } from '@components/chart-contact-payment-progress/chart-contact-payment-progress.module';
import { ChartContactPreferredInsurersModule } from '@components/chart-contact-preferred-insurers/chart-contact-preferred-insurers.module';
import { CardWalletGlobalModule } from '@components/card-wallet-global/card-wallet-global.module';
import { ChartContactWalletProjectionModule } from '@components/chart-contact-wallet-projection/chart-contact-wallet-projection.module';
import { CardContactSinistersRateModule } from '@components/card-contact-sinisters-rate/card-contact-sinisters-rate.module';
import { ChartContactRenewalProgressModule } from '@components/chart-contact-renewal-progress/chart-contact-renewal-progress.module';
import { ModalContactSavedModule } from '@components/modal-contact-saved/modal-contact-saved.module';
import { QuotationService } from '@services/quotation.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';

@NgModule({
  declarations: [ResumePage],
  imports: [
    AlertContactUnusualWalletDecreaseModule,
    ChartContactActiveCoveragesModule,
    CardContactConversionRateModule,
    CardContactProtectionRateModule,
    CardContactPaymentReportsModule,
    CardContactRenewalReportsModule,
    ChartContactGlobalBalanceModule,
    ChartContactPaymentProgressModule,
    ChartContactPreferredInsurersModule,
    CardWalletGlobalModule,
    ChartContactWalletProjectionModule,
    CardContactSinistersRateModule,
    ChartContactRenewalProgressModule,
    CommonModule,
    ModalContactSavedModule,
    ResumeRoutingModule
  ],
  providers: [QuotationService, ResumeService]
})
export class ResumeModule { }
