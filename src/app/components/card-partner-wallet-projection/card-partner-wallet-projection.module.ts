import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { CardPartnerWalletProjectionComponent } from './card-partner-wallet-projection.component';

@NgModule({
  declarations: [
    CardPartnerWalletProjectionComponent
  ],
  exports: [
    CardPartnerWalletProjectionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PartnerService
  ]
})
export class CardPartnerWalletProjectionModule { }
