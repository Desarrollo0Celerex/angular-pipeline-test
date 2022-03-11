import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardReportActivePoliciesModule } from '@components/card-report-active-policies/card-report-active-policies.module';
import { ChartCancelledPoliciesModule } from '@components/chart-cancelled-policies/chart-cancelled-policies.module';
import { ChartPendingRenovationsModule } from '@components/chart-pending-renovations/chart-pending-renovations.module';
import { ChartPoliciesModule } from '@components/chart-policies/chart-policies.module';
import { ChartPoliciesInsurancesModule } from '@components/chart-policies-insurances/chart-policies-insurances.module';
import { ChartPolicyRenewalProcessModule } from '@components/chart-policy-renewal-process/chart-policy-renewal-process.module';
import { ContainerIssuedPoliciesKpisModule } from '@components/container-issued-policies-kpis/container-issued-policies-kpis.module';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { MenuStatsModule } from '@components/menu-stats/menu-stats.module';
import { PolicyService } from '@services/policy.service';

import { StatsPoliciesRoutingModule } from './stats-policies-routing.module';
import { StatsPoliciesPage } from './stats-policies.page';

@NgModule({
  declarations: [
    StatsPoliciesPage
  ],
  imports: [
    CardReportActivePoliciesModule,
    ChartCancelledPoliciesModule,
    ChartPendingRenovationsModule,
    ChartPoliciesModule,
    ChartPoliciesInsurancesModule,
    ChartPolicyRenewalProcessModule,
    CommonModule,
    ContainerIssuedPoliciesKpisModule,
    ContainerSelectStatsPeriodModule,
    MenuStatsModule,
    StatsPoliciesRoutingModule
  ],
  providers: [
      PolicyService
  ]
})
export class StatsPoliciesModule { }
