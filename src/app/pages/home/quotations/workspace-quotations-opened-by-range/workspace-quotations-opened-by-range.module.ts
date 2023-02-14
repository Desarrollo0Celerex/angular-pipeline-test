import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspaceQuotationsOpenedModule } from '@components/container-charts-workspace-quotations-opened/container-charts-workspace-quotations-opened.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceQuotationsOpenedByRangeRoutingModule } from './workspace-quotations-opened-by-range-routing.module';
import { WorkspaceQuotationsOpenedByRangePage } from './workspace-quotations-opened-by-range.page';

@NgModule({
  declarations: [
    WorkspaceQuotationsOpenedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsWorkspaceQuotationsOpenedModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceQuotationsOpenedByRangeRoutingModule
  ]
})
export class WorkspaceQuotationsOpenedByRangeModule { }
