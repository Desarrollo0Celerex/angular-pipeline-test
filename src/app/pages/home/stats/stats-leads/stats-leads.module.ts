import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';

import { StatsLeadsRoutingModule } from './stats-leads-routing.module';
import { StatsLeadsPage } from './stats-leads.page';


@NgModule({
  declarations: [
    StatsLeadsPage
  ],
  imports: [
    CommonModule,
    StatsLeadsRoutingModule,
    MenuStatsModule,
    ContainerSelectStatsPeriodModule
  ]
})
export class StatsLeadsModule { }
