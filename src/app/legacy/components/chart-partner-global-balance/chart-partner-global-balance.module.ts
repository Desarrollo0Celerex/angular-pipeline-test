import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PartnerService } from '@services/partner.service';

import { ChartPartnerGlobalBalanceComponent } from './chart-partner-global-balance.component';

@NgModule({
  declarations: [
    ChartPartnerGlobalBalanceComponent
  ],
  exports: [
      ChartPartnerGlobalBalanceComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PartnerService]
})
export class ChartPartnerGlobalBalanceModule { }
