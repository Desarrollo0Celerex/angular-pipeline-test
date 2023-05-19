import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { SinisterService } from '@services/sinister.service';

import { ContainerChartsWorkspaceSinistersClosedComponent } from './container-charts-workspace-sinisters-closed.component';

@NgModule({
  declarations: [
    ContainerChartsWorkspaceSinistersClosedComponent
  ],
  exports: [
    ContainerChartsWorkspaceSinistersClosedComponent
  ],
  imports: [
    CommonModule,
    ChartContactTypesModule,
    ChartInsurersModule,
    ChartInsurancesModule,
    ModalFilterResultsModule
  ],
  providers: [
    SinisterService
  ]
})
export class ContainerChartsWorkspaceSinistersClosedModule { }
