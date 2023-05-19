import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportPendingRenewalsModule } from '@components/card-report-pending-renewals/card-report-pending-renewals.module';
import { ContainerChartsPendingRenewalsModule } from '@components/container-charts-pending-renewals/container-charts-pending-renewals.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PolicyService } from '@services/policy.service';

import { WorkspaceRenewalsPendingByRangeRoutingModule } from './workspace-renewals-pending-by-range-routing.module';
import { WorkspaceRenewalsPendingByRangePage } from './workspace-renewals-pending-by-range.page';


@NgModule({
  declarations: [
    WorkspaceRenewalsPendingByRangePage
  ],
  imports: [
    CardContentTitleModule,
    CardReportPendingRenewalsModule,
    ContainerChartsPendingRenewalsModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    WorkspaceRenewalsPendingByRangeRoutingModule
  ],
  providers: [
    PolicyService
  ]
})
export class WorkspaceRenewalsPendingByRangeModule { }
