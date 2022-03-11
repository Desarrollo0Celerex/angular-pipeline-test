import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportRenewedPoliciesModule } from '@components/card-report-renewed-policies/card-report-renewed-policies.module';
import { ContainerChartsRenewedPoliciesModule } from '@components/container-charts-renewed-policies/container-charts-renewed-policies.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PolicyService } from '@services/policy.service';

import { ListRenewedPoliciesByRangeRoutingModule } from './list-renewed-policies-by-range-routing.module';
import { ListRenewedPoliciesByRangePage } from './list-renewed-policies-by-range.page';

@NgModule({
  declarations: [
    ListRenewedPoliciesByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportRenewedPoliciesModule,
    CommonModule,
    ContainerChartsRenewedPoliciesModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    ListRenewedPoliciesByRangeRoutingModule
  ],
  providers: [
    PolicyService
  ]
})
export class ListRenewedPoliciesByRangeModule { }
