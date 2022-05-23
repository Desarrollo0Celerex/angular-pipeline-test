import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerService } from '@services/partner.service';

import { CardPartnerAnnualWalletComponent } from './card-partner-annual-wallet.component';

@NgModule({
  declarations: [
    CardPartnerAnnualWalletComponent
  ],
  exports: [
      CardPartnerAnnualWalletComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PartnerService
  ]
})
export class CardPartnerAnnualWalletModule { }
