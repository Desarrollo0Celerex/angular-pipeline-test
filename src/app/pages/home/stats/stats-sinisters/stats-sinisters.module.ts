import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartSinistersModule } from '@components/chart-sinisters/chart-sinisters.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module'
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module'

import { StatsSinistersRoutingModule } from './stats-sinisters-routing.module';
import { StatsSinistersPage } from './stats-sinisters.page';

@NgModule({
  declarations: [
    StatsSinistersPage
  ],
  imports: [
    ChartSinistersModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    MenuStatsModule,
    StatsSinistersRoutingModule
  ]
})
export class StatsSinistersModule { }
