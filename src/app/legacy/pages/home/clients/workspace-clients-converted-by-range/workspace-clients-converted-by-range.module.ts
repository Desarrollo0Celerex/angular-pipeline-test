import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceClientsConvertedByRangeRoutingModule } from './workspace-clients-converted-by-range-routing.module';
import { WorkspaceClientsConvertedByRangePage } from './workspace-clients-converted-by-range.page';


@NgModule({
  declarations: [
    WorkspaceClientsConvertedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceClientsConvertedByRangeRoutingModule
  ]
})
export class WorkspaceClientsConvertedByRangeModule { }
