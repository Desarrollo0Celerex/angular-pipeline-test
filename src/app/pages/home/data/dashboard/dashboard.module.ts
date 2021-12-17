import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiQuotesModule } from '@components/card-kpi-quotes/card-kpi-quotes.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PolicyService } from '@services/policy.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';


@NgModule({
  declarations: [DashboardPage],
  imports: [
    CardKpiQuotesModule,
    CommonModule,
    DashboardRoutingModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      PolicyService,
  ]
})
export class DashboardModule { }
