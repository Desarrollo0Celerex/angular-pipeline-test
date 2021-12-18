import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiActiveClientsModule } from '@components/card-kpi-active-clients/card-kpi-active-clients.module';
import { CardKpiActiveLeadsModule } from '@components/card-kpi-active-leads/card-kpi-active-leads.module';
import { CardKpiActivePoliciesModule } from '@components/card-kpi-active-policies/card-kpi-active-policies.module';
import { CardKpiQuotesModule } from '@components/card-kpi-quotes/card-kpi-quotes.module';
import { CardKpiRenewalsModule } from '@components/card-kpi-renewals/card-kpi-renewals.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PolicyService } from '@services/policy.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    CardKpiActiveClientsModule,
    CardKpiActiveLeadsModule,
    CardKpiActivePoliciesModule,
    CardKpiQuotesModule,
    CardKpiRenewalsModule,
    CommonModule,
    DashboardRoutingModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      PolicyService,
  ]
})
export class DashboardModule { }
