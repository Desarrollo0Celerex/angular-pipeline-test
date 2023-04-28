import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardReportContactPendingReceiptsModule } from '@components/card-report-contact-pending-receipts/card-report-contact-pending-receipts.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContactPendingPaymentsByRangeRoutingModule } from './contact-pending-payments-by-range-routing.module';
import { ContactPendingPaymentsByRangePage } from './contact-pending-payments-by-range.page';


@NgModule({
  declarations: [
    ContactPendingPaymentsByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportContactPendingReceiptsModule,
    CommonModule,
    ContactPendingPaymentsByRangeRoutingModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule
  ]
})
export class ContactPendingPaymentsByRangeModule { }
