import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerGlobalKpisModule } from '@components/container-global-kpis/container-global-kpis.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { QuotationService } from '@services/quotation.service';
import { PolicyService } from '@services/policy.service';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';


@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    ContainerGlobalKpisModule,
    DashboardRoutingModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      PolicyService,
      QuotationService,
  ]
})
export class DashboardModule { }
