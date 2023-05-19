import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportContactAppliedRenewalsModule } from '@components/card-report-contact-applied-renewals/card-report-contact-applied-renewals.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContactAppliedRenewalsByRangeRoutingModule } from './contact-applied-renewals-by-range-routing.module';
import { ContactAppliedRenewalsByRangePage } from './contact-applied-renewals-by-range.page';

@NgModule({
  declarations: [
    ContactAppliedRenewalsByRangePage
  ],
  imports: [
    CardReportContactAppliedRenewalsModule,
    CardContentTitleModule,
    CommonModule,
    ContactAppliedRenewalsByRangeRoutingModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule
  ]
})
export class ContactAppliedRenewalsByRangeModule { }
