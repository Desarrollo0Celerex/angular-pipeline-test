import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { PolicyService } from '@services/policy.service';

import { ContainerChartsCancelledPoliciesComponent } from './container-charts-cancelled-policies.component';

@NgModule({
  declarations: [
    ContainerChartsCancelledPoliciesComponent
  ],
  exports: [
      ContainerChartsCancelledPoliciesComponent
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
export class ContainerChartsCancelledPoliciesModule { }
