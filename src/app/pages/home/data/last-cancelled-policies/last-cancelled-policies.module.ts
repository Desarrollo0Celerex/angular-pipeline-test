import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { LastCancelledPoliciesRoutingModule } from './last-cancelled-policies-routing.module';
import { LastCancelledPoliciesPage } from './last-cancelled-policies.page';


@NgModule({
  declarations: [
    LastCancelledPoliciesPage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    ContentListModule,
    ContentKpisModule,
    LastCancelledPoliciesRoutingModule
  ]
})
export class LastCancelledPoliciesModule { }
