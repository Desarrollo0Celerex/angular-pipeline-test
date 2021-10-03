import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartGeneratedLeadsModule } from '@components/chart-generated-leads/chart-generated-leads.module';
import { ChartGeneratedQuotesModule } from '@components/chart-generated-quotes/chart-generated-quotes.module';
import { ChartLeadAcquisitionChannelsModule } from '@components/chart-lead-acquisition-channels/chart-lead-acquisition-channels.module';
import { ChartLeadChannelsWithHigherConversionModule } from '@components/chart-lead-channels-with-higher-conversion/chart-lead-channels-with-higher-conversion.module';
import { ContainerLeadChannelsKpisModule } from '@components/container-lead-channels-kpis/container-lead-channels-kpis.module';
import { ContainerLeadConversionKpisModule } from '@components/container-lead-conversion-kpis/container-lead-conversion-kpis.module';
import { ContainerLeadPartnerKpisModule } from '@components/container-lead-partner-kpis/container-lead-partner-kpis.module';
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
    ContainerSelectStatsPeriodModule,
    ChartGeneratedLeadsModule,
    ChartGeneratedQuotesModule,
    ChartLeadAcquisitionChannelsModule,
    ChartLeadChannelsWithHigherConversionModule,
    ContainerLeadChannelsKpisModule,
    ContainerLeadConversionKpisModule,
    ContainerLeadPartnerKpisModule
  ]
})
export class StatsLeadsModule { }
