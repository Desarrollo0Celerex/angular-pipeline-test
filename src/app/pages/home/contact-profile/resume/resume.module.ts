import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardActiveCoveragesModule } from '@components/card-active-coverages/card-active-coverages.module';
import { CardContactConversionRateModule } from '@components/card-contact-conversion-rate/card-contact-conversion-rate.module';
import { CardContactProtectionRateModule } from '@components/card-contact-protection-rate/card-contact-protection-rate.module';
import { CardGlobalBalanceModule } from '@components/card-global-balance/card-global-balance.module';
import { CardPreferredInsurersModule } from '@components/card-preferred-insurers/card-preferred-insurers.module';
import { CardWalletGlobalModule } from '@components/card-wallet-global/card-wallet-global.module';
import { CardWalletProjectionModule } from '@components/card-wallet-projection/card-wallet-projection.module';
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
    CardActiveCoveragesModule,
    CardContactConversionRateModule,
    CardContactProtectionRateModule,
    CardGlobalBalanceModule,
    CardPreferredInsurersModule,
    CardWalletGlobalModule,
    CardWalletProjectionModule,
    CardContactSinistersRateModule,
    ChartContactRenewalProgressModule,
    CommonModule,
    ModalContactSavedModule,
    ResumeRoutingModule
  ],
  providers: [QuotationService, ResumeService]
})
export class ResumeModule { }
