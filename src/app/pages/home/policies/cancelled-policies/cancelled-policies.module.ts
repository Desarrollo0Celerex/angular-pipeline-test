import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsCancelledPoliciesModule } from '@components/container-charts-cancelled-policies/container-charts-cancelled-policies.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { CancelledPoliciesRoutingModule } from './cancelled-policies-routing.module';
import { CancelledPoliciesPage } from './cancelled-policies.page';


@NgModule({
  declarations: [
    CancelledPoliciesPage
  ],
  imports: [
    CommonModule,
    ContainerSelectStatsPeriodModule,
    CardContentTitleModule,
    ContainerChartsCancelledPoliciesModule,
    ContentListModule,
    CancelledPoliciesRoutingModule
  ]
})
export class CancelledPoliciesModule { }
