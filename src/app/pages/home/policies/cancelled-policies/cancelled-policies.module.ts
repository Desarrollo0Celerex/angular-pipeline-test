import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
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
    ContentListModule,
    ContentKpisModule,
    CancelledPoliciesRoutingModule
  ]
})
export class CancelledPoliciesModule { }
