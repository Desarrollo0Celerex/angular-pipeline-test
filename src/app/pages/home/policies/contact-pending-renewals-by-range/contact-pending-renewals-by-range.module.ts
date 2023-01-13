import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportContactPendingRenewalsModule } from '@components/card-report-contact-pending-renewals/card-report-contact-pending-renewals.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContactPendingRenewalsByRangeRoutingModule } from './contact-pending-renewals-by-range-routing.module';
import { ContactPendingRenewalsByRangePage } from './contact-pending-renewals-by-range.page';

@NgModule({
  declarations: [
    ContactPendingRenewalsByRangePage
  ],
  imports: [
    CardReportContactPendingRenewalsModule,
    CommonModule,
    ContactPendingRenewalsByRangeRoutingModule,
    ContainerSelectStatsPeriodModule,
    CardContentTitleModule,
    ContentListModule
  ]
})
export class ContactPendingRenewalsByRangeModule { }
