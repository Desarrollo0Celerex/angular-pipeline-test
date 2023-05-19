import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardReportPendingReceiptsModule } from '@components/card-report-pending-receipts/card-report-pending-receipts.module';
import { ContainerChartsPendingPaymentsModule } from '@components/container-charts-pending-payments/container-charts-pending-payments.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { WorkspaceReceiptsPendingByRangeRoutingModule } from './workspace-receipts-pending-by-range-routing.module';
import { WorkspaceReceiptsPendingByRangePage } from './workspace-receipts-pending-by-range.page';


@NgModule({
  declarations: [
    WorkspaceReceiptsPendingByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportPendingReceiptsModule,
    CommonModule,
    ContainerChartsPendingPaymentsModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceReceiptsPendingByRangeRoutingModule
  ]
})
export class WorkspaceReceiptsPendingByRangeModule { }
