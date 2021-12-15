import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PolicyService } from '@services/policy.service';

import { LastPoliciesToRenewRoutingModule } from './last-policies-to-renew-routing.module';
import { LastPoliciesToRenewPage } from './last-policies-to-renew.page';

@NgModule({
  declarations: [
    LastPoliciesToRenewPage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentKpisModule,
    ContentListModule,
    LastPoliciesToRenewRoutingModule
  ],
  providers: [
      PolicyService
  ]
})
export class LastPoliciesToRenewModule { }
