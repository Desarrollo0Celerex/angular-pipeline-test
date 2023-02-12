import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { PolicyService } from '@services/policy.service';

import { ContainerChartsWorkspacePoliciesIssuedComponent } from './container-charts-workspace-policies-issued.component';

@NgModule({
  declarations: [
    ContainerChartsWorkspacePoliciesIssuedComponent
  ],
  exports: [
    ContainerChartsWorkspacePoliciesIssuedComponent
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
export class ContainerChartsWorkspacePoliciesIssuedModule { }
