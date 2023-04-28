import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceLeadsConvertedByRangeRoutingModule } from './workspace-leads-converted-by-range-routing.module';
import { WorkspaceLeadsConvertedByRangePage } from './workspace-leads-converted-by-range.page';

@NgModule({
  declarations: [
    WorkspaceLeadsConvertedByRangePage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    CardContentTitleModule,
    ContentListModule,
    WorkspaceLeadsConvertedByRangeRoutingModule
  ]
})
export class WorkspaceLeadsConvertedByRangeModule { }
