import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartClientsModule } from '@components/chart-clients/chart-clients.module';
import { PolicyService } from '@services/policy.service';

import { ContainerChartsPendingRenewalsComponent } from './container-charts-pending-renewals.component';

@NgModule({
  declarations: [
    ContainerChartsPendingRenewalsComponent
  ],
  exports: [
      ContainerChartsPendingRenewalsComponent
  ],
  imports: [
    CommonModule,
    ChartClientsModule,
    ChartInsurersModule,
    ChartInsurancesModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerChartsPendingRenewalsModule { }
