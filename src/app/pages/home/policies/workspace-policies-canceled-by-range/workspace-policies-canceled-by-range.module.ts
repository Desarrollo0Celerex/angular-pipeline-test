import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsCancelledPoliciesModule } from '@components/container-charts-cancelled-policies/container-charts-cancelled-policies.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspacePoliciesCanceledByRangeRoutingModule } from './workspace-policies-canceled-by-range-routing.module';
import { WorkspacePoliciesCanceledByRangePage } from './workspace-policies-canceled-by-range.page';


@NgModule({
  declarations: [
    WorkspacePoliciesCanceledByRangePage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    CardContentTitleModule,
    ContainerChartsCancelledPoliciesModule,
    ContentListModule,
    WorkspacePoliciesCanceledByRangeRoutingModule
  ]
})
export class WorkspacePoliciesCanceledByRangeModule { }
