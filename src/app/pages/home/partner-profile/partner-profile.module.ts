import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPartnerAnnualWalletModule } from '@components/card-partner-annual-wallet/card-partner-annual-wallet.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { PartnerProfileRoutingModule } from './partner-profile-routing.module';
import { PartnerProfileLayout } from './partner-profile.layout';

@NgModule({
  declarations: [
    PartnerProfileLayout
  ],
  imports: [
    CardPartnerAnnualWalletModule,
    CommonModule,
    LoadingContentModule,
    PartnerProfileRoutingModule
  ],
  providers: [
      PartnerService
  ]
})
export class PartnerProfileModule { }
