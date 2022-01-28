import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { PolicyService } from '@services/policy.service';

import { ContainerChartsActivePoliciesComponent } from './container-charts-active-policies.component';

@NgModule({
  declarations: [
    ContainerChartsActivePoliciesComponent
  ],
  exports: [
      ContainerChartsActivePoliciesComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerChartsActivePoliciesModule { }
