import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PhonePreviewWalletModule } from '@components/phone-preview-wallet/phone-preview-wallet.module';
import { WalletService } from '@services/wallet.service';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';
import { ResumeService } from './resume.service';


@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CommonModule,
    LoadingContentModule,
    PhonePreviewWalletModule,
    ResumeRoutingModule
  ],
  providers: [
    ResumeService,
    WalletService
  ]
})
export class ResumeModule { }
