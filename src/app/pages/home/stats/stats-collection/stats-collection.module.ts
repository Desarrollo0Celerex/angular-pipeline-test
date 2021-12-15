import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartAppliedPaymentsModule } from '@components/chart-applied-payments/chart-applied-payments.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';

import { StatsCollectionRoutingModule } from './stats-collection-routing.module';
import { StatsCollectionPage } from './stats-collection.page';

@NgModule({
  declarations: [
    StatsCollectionPage
  ],
  imports: [
    ChartAppliedPaymentsModule,
    CommonModule,
    ContainerSelectStatsPeriodModule,
    MenuStatsModule,
    StatsCollectionRoutingModule
  ]
})
export class StatsCollectionModule { }
