import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPartnerActiveCoveragesModule } from '@components/card-partner-active-coverages/card-partner-active-coverages.module';
import { CardPartnerWalletGlobalModule } from '@components/card-partner-wallet-global/card-partner-wallet-global.module';
import { CardPartnerWalletProjectionModule } from '@components/card-partner-wallet-projection/card-partner-wallet-projection.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CardPartnerActiveCoveragesModule,
    CardPartnerWalletGlobalModule,
    CardPartnerWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
