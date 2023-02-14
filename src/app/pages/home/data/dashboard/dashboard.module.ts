import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardKpiTotalActiveClientsModule } from '@components/card-kpi-total-active-clients/card-kpi-total-active-clients.module';
import { CardKpiTotalActiveLeadsModule } from '@components/card-kpi-total-active-leads/card-kpi-total-active-leads.module';
import { CardKpiTotalActivePoliciesModule } from '@components/card-kpi-total-active-policies/card-kpi-total-active-policies.module';
import { ContainerLastContactsModule } from '@components/container-last-contacts/container-last-contacts.module';
import { ContainerWorkspaceExternalPoliciesModule } from '@components/container-workspace-external-policies/container-workspace-external-policies.module';
import { ContainerWalletKpisModule } from '@components/container-wallet-kpis/container-wallet-kpis.module';
import { ContainerWalletResumeModule } from '@components/container-wallet-resume/container-wallet-resume.module';
import { ContainerWorkspaceKpisModule } from '@components/container-workspace-kpis/container-workspace-kpis.module';
import { ContainerWorkspacePoliciesIncompleteModule } from '@components/container-workspace-policies-incomplete/container-workspace-policies-incomplete.module';
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
    CommonModule,
    ContainerWorkspaceKpisModule,
    ContainerLastContactsModule,
    ContainerWorkspaceExternalPoliciesModule,
    ContainerWalletKpisModule,
    ContainerWalletResumeModule,
    ContainerWorkspacePoliciesIncompleteModule,
    ContainerWorkspacePoliciesPendingModule,
    DashboardRoutingModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      PolicyService,
  ]
})
export class DashboardModule { }
