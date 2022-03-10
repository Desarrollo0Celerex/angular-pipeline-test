import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { ExternalPolicyService } from '@services/external-policy.service';

import { ContainerChartsExternalPoliciesComponent } from './container-charts-external-policies.component';

@NgModule({
  declarations: [
    ContainerChartsExternalPoliciesComponent
  ],
  exports: [
      ContainerChartsExternalPoliciesComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule,
    ModalFilterResultsModule
  ],
  providers: [
      ExternalPolicyService
  ]
})
export class ContainerChartsExternalPoliciesModule { }
