import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspacePoliciesRenewedModule } from '@components/container-charts-workspace-policies-renewed/container-charts-workspace-policies-renewed.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspacePoliciesRenewedByRangeRoutingModule } from './workspace-policies-renewed-by-range-routing.module';
import { WorkspacePoliciesRenewedByRangePage } from './workspace-policies-renewed-by-range.page';

@NgModule({
  declarations: [
    WorkspacePoliciesRenewedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsWorkspacePoliciesRenewedModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspacePoliciesRenewedByRangeRoutingModule
  ]
})
export class WorkspacePoliciesRenewedByRangeModule { }
