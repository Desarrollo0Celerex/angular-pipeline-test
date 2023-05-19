import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardReportContactAppliedReceiptsModule } from '@components/card-report-contact-applied-receipts/card-report-contact-applied-receipts.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContactReceiptsAppliedByRangeRoutingModule } from './contact-receipts-applied-by-range-routing.module';
import { ContactReceiptsAppliedByRangePage } from './contact-receipts-applied-by-range.page';

@NgModule({
  declarations: [
    ContactReceiptsAppliedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportContactAppliedReceiptsModule,
    CommonModule,
    ContactReceiptsAppliedByRangeRoutingModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule
  ]
})
export class ContactReceiptsAppliedByRangeModule { }
