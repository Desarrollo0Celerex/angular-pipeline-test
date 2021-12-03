import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartPoliciesModule } from '@components/chart-policies/chart-policies.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';

import { StatsPoliciesRoutingModule } from './stats-policies-routing.module';
import { StatsPoliciesPage } from './stats-policies.page';


@NgModule({
  declarations: [
    StatsPoliciesPage
  ],
  imports: [
    ChartPoliciesModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    MenuStatsModule,
    StatsPoliciesRoutingModule
  ]
})
export class StatsPoliciesModule { }
