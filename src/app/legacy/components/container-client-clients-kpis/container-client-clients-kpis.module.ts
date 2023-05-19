import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { ClientService } from '@services/client.service';
import { InsuranceService } from '@services/insurance.service';
import { InsurerService } from '@services/insurer.service';

import { ContainerClientClientsKpisComponent } from './container-client-clients-kpis.component';

@NgModule({
  declarations: [
    ContainerClientClientsKpisComponent
  ],
  exports: [
      ContainerClientClientsKpisComponent
  ],
  imports: [
    CommonModule,
    CardKpiOneModule
  ],
  providers: [
      ClientService,
      InsuranceService,
      InsurerService
  ]
})
export class ContainerClientClientsKpisModule { }
