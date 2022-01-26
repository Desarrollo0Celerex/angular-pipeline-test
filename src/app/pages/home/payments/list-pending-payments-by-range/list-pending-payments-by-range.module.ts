import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardReportPendingReceiptsModule } from '@components/card-report-pending-receipts/card-report-pending-receipts.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListPendingPaymentsByRangeRoutingModule } from './list-pending-payments-by-range-routing.module';
import { ListPendingPaymentsByRangePage } from './list-pending-payments-by-range.page';


@NgModule({
  declarations: [
    ListPendingPaymentsByRangePage
  ],
  imports: [
    CardReportPendingReceiptsModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    ListPendingPaymentsByRangeRoutingModule
  ]
})
export class ListPendingPaymentsByRangeModule { }
