import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardKpiOneModule } from '@components/card-kpi-one/card-kpi-one.module';
import { InsuranceService } from '@services/insurance.service';

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
      InsuranceService
  ]
})
export class ContainerClientClientsKpisModule { }
