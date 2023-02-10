import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardKpiTotalActiveClientsModule } from '@components/card-kpi-total-active-clients/card-kpi-total-active-clients.module';
import { CardKpiTotalActiveLeadsModule } from '@components/card-kpi-total-active-leads/card-kpi-total-active-leads.module';
import { CardKpiTotalActivePoliciesModule } from '@components/card-kpi-total-active-policies/card-kpi-total-active-policies.module';
import { CardKpiTotalLastCancelledPoliciesModule } from '@components/card-kpi-total-last-cancelled-policies/card-kpi-total-last-cancelled-policies.module';
import { CardKpiTotalOpenSinistersModule } from '@components/card-kpi-total-open-sinisters/card-kpi-total-open-sinisters.module';
import { CardKpiTotalPendingPaymentsModule } from '@components/card-kpi-total-pending-payments/card-kpi-total-pending-payments.module';
import { CardKpiTotalQuotesModule } from '@components/card-kpi-total-quotes/card-kpi-total-quotes.module';
import { ChartLeadsVsClientsModule } from '@components/chart-leads-vs-clients/chart-leads-vs-clients.module';
import { ChartQuotesVsEmissionsModule } from '@components/chart-quotes-vs-emissions/chart-quotes-vs-emissions.module';
import { ContainerLastContactsModule } from '@components/container-last-contacts/container-last-contacts.module';
import { ContainerWalletIncompleteExternalPoliciesModule } from '@components/container-wallet-incomplete-external-policies/container-wallet-incomplete-external-policies.module';
import { ContainerWalletKpisModule } from '@components/container-wallet-kpis/container-wallet-kpis.module';
import { ContainerWorkspaceKpisModule } from '@components/container-workspace-kpis/container-workspace-kpis.module';
import { ContainerWorkspaceIncompletePoliciesModule } from '@components/container-workspace-incomplete-policies/container-workspace-incomplete-policies.module';
import { ContainerWorkspacePoliciesPendingModule } from '@components/container-workspace-policies-pending/container-workspace-policies-pending.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PolicyService } from '@services/policy.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CardContentTitleModule,
    CardKpiTotalActiveClientsModule,
    CardKpiTotalActiveLeadsModule,
    CardKpiTotalActivePoliciesModule,
    CardKpiTotalLastCancelledPoliciesModule,
    CardKpiTotalOpenSinistersModule,
    CardKpiTotalPendingPaymentsModule,
    CardKpiTotalQuotesModule,
    CommonModule,
    ChartLeadsVsClientsModule,
    ChartQuotesVsEmissionsModule,
    ContainerWorkspaceKpisModule,
    ContainerLastContactsModule,
    ContainerWalletIncompleteExternalPoliciesModule,
    ContainerWalletKpisModule,
    ContainerWorkspaceIncompletePoliciesModule,
    ContainerWorkspacePoliciesPendingModule,
    DashboardRoutingModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      PolicyService,
  ]
})
export class DashboardModule { }
