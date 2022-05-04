import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardReportAppliedReceiptsModule } from '@components/card-report-applied-receipts/card-report-applied-receipts.module';
import { ContainerChartsReceiptsAppliedModule } from '@components/container-charts-receipts-applied/container-charts-receipts-applied.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListReceiptsAppliedByRangeRoutingModule } from './list-receipts-applied-by-range-routing.module';
import { ListReceiptsAppliedByRangePage } from './list-receipts-applied-by-range.page';

@NgModule({
  declarations: [
    ListReceiptsAppliedByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportAppliedReceiptsModule,
    CommonModule,
    ContainerChartsReceiptsAppliedModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    ListReceiptsAppliedByRangeRoutingModule,
  ]
})
export class ListReceiptsAppliedByRangeModule { }
