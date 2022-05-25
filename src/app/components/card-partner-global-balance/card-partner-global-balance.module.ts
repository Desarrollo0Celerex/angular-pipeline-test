import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { CardPartnerGlobalBalanceComponent } from './card-partner-global-balance.component';

@NgModule({
  declarations: [
    CardPartnerGlobalBalanceComponent
  ],
  exports: [
      CardPartnerGlobalBalanceComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PartnerService]
})
export class CardPartnerGlobalBalanceModule { }
