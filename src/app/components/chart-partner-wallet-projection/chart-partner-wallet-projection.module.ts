import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { ChartPartnerWalletProjectionComponent } from './chart-partner-wallet-projection.component';

@NgModule({
  declarations: [
    ChartPartnerWalletProjectionComponent
  ],
  exports: [
    ChartPartnerWalletProjectionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      PartnerService
  ]
})
export class ChartPartnerWalletProjectionModule { }
