import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { CardPartnerWalletGlobalComponent } from './card-partner-wallet-global.component';

@NgModule({
  declarations: [
    CardPartnerWalletGlobalComponent
  ],
  exports: [
      CardPartnerWalletGlobalComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
    PartnerService
  ]
})
export class CardPartnerWalletGlobalModule { }
