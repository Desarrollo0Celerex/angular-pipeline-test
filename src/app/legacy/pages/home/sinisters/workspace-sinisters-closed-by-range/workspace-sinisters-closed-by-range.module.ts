import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDownloadReportOpenSinistersModule } from '@components/button-download-report-open-sinisters/button-download-report-open-sinisters.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsWorkspaceSinistersClosedModule } from '@components/container-charts-workspace-sinisters-closed/container-charts-workspace-sinisters-closed.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceSinistersClosedByRangeRoutingModule } from './workspace-sinisters-closed-by-range-routing.module';
import { WorkspaceSinistersClosedByRangePage } from './workspace-sinisters-closed-by-range.page';


@NgModule({
  declarations: [
    WorkspaceSinistersClosedByRangePage
  ],
  imports: [
    ButtonDownloadReportOpenSinistersModule,
    CardContentTitleModule,
    CommonModule,
    ContainerChartsWorkspaceSinistersClosedModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceSinistersClosedByRangeRoutingModule
  ]
})
export class WorkspaceSinistersClosedByRangeModule { }
