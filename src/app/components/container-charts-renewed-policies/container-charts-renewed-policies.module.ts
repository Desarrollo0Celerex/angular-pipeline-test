import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { PolicyService } from '@services/policy.service';

import { ContainerChartsRenewedPoliciesComponent } from './container-charts-renewed-policies.component';

@NgModule({
  declarations: [
    ContainerChartsRenewedPoliciesComponent
  ],
  exports: [
      ContainerChartsRenewedPoliciesComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule,
    ModalFilterResultsModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerChartsRenewedPoliciesModule { }
