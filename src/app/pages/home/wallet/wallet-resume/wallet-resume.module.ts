import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { WalletService } from '@services/wallet.service';

import { WalletResumeRoutingModule } from './wallet-resume-routing.module';
import { WalletResumePage } from './wallet-resume.page';


@NgModule({
  declarations: [
    WalletResumePage
  ],
  imports: [
    CommonModule,
    WalletResumeRoutingModule,
    LoadingContentModule
  ],
  providers: [
      WalletService
  ]
})
export class WalletResumeModule { }
