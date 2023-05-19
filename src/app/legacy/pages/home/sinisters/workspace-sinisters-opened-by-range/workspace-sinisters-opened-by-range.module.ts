import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDownloadReportOpenSinistersModule } from '@components/button-download-report-open-sinisters/button-download-report-open-sinisters.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsOpenedSinistersModule } from '@components/container-charts-opened-sinisters/container-charts-opened-sinisters.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceSinistersOpenedByRangeRoutingModule } from './workspace-sinisters-opened-by-range-routing.module';
import { WorkspaceSinistersOpenedByRangePage } from './workspace-sinisters-opened-by-range.page';

@NgModule({
  declarations: [
    WorkspaceSinistersOpenedByRangePage
  ],
  imports: [
    ButtonDownloadReportOpenSinistersModule,
    CardContentTitleModule,
    CommonModule,
    ContainerChartsOpenedSinistersModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceSinistersOpenedByRangeRoutingModule
  ]
})
export class WorkspaceSinistersOpenedByRangeModule { }
