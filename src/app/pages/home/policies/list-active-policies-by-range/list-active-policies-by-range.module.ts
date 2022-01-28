import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportActivePoliciesModule } from '@components/card-report-active-policies/card-report-active-policies.module';
import { ContainerChartsActivePoliciesModule } from '@components/container-charts-active-policies/container-charts-active-policies.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PolicyService } from '@services/policy.service';

import { ListActivePoliciesByRangeRoutingModule } from './list-active-policies-by-range-routing.module';
import { ListActivePoliciesByRangePage } from './list-active-policies-by-range.page';

@NgModule({
  declarations: [
    ListActivePoliciesByRangePage
  ],
  imports: [
    CardReportActivePoliciesModule,
    CommonModule,
    ContainerChartsActivePoliciesModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    ListActivePoliciesByRangeRoutingModule
  ],
  providers: [PolicyService]
})
export class ListActivePoliciesByRangeModule { }
