import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspaceQuotationsClosedModule } from '@components/container-charts-workspace-quotations-closed/container-charts-workspace-quotations-closed.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceQuotationsClosedByRangeRoutingModule } from './workspace-quotations-closed-by-range-routing.module';
import { WorkspaceQuotationsClosedByRangePage } from './workspace-quotations-closed-by-range.page';

@NgModule({
  declarations: [
    WorkspaceQuotationsClosedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsWorkspaceQuotationsClosedModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceQuotationsClosedByRangeRoutingModule
  ]
})
export class WorkspaceQuotationsClosedByRangeModule { }
