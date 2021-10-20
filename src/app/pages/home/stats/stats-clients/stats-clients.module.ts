import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartGeneratedClientsModule } from '@components/chart-generated-clients/chart-generated-clients.module';
import { ContainerClientClientsKpisModule } from '@components/container-client-clients-kpis/container-client-clients-kpis.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';

import { StatsClientsRoutingModule } from './stats-clients-routing.module';
import { StatsClientsPage } from './stats-clients.page';

@NgModule({
  declarations: [
    StatsClientsPage
  ],
  imports: [
    CommonModule,
    StatsClientsRoutingModule,
    ContainerSelectStatsPeriodModule,
    MenuStatsModule,
    ChartGeneratedClientsModule,
    ContainerClientClientsKpisModule
  ]
})
export class StatsClientsModule { }
