import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPartnerWalletProjectionModule } from '@components/card-partner-wallet-projection/card-partner-wallet-projection.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CardPartnerWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
