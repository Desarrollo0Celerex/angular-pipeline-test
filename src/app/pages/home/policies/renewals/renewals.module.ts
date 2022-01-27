import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportPendingRenewalsModule } from '@components/card-report-pending-renewals/card-report-pending-renewals.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PolicyService } from '@services/policy.service';

import { RenewalsRoutingModule } from './renewals-routing.module';
import { RenewalsPage } from './renewals.page';

@NgModule({
  declarations: [
    RenewalsPage
  ],
  imports: [
    CardReportPendingRenewalsModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    RenewalsRoutingModule
  ],
  providers: [
      PolicyService
  ]
})
export class RenewalsModule { }
