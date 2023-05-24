import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PartnerReceiptsPendingByRangeRoutingModule } from './partner-receipts-pending-by-range-routing.module';
import { PartnerReceiptsPendingByRangePage } from './partner-receipts-pending-by-range.page';

@NgModule({
  declarations: [
    PartnerReceiptsPendingByRangePage
  ],
  imports: [
    CommonModule,
    CardContentTitleModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    PartnerReceiptsPendingByRangeRoutingModule
  ]
})
export class PartnerReceiptsPendingByRangeModule { }
