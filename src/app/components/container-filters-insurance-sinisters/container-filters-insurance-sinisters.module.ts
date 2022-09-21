import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartInsurancesModule } from '@components/chart-insurances/chart-insurances.module';
import { ChartInsurersModule } from '@components/chart-insurers/chart-insurers.module';
import { ChartContactTypesModule } from '@components/chart-contact-types/chart-contact-types.module';
import { ModalFilterResultsModule } from '@components/modal-filter-results/modal-filter-results.module';
import { SinisterService } from '@services/sinister.service';

import { ContainerFiltersInsuranceSinistersComponent } from './container-filters-insurance-sinisters.component';

@NgModule({
  declarations: [
    ContainerFiltersInsuranceSinistersComponent
  ],
  exports: [
      ContainerFiltersInsuranceSinistersComponent
  ],
  imports: [
    ChartInsurancesModule,
    ChartInsurersModule,
    ChartContactTypesModule,
    CommonModule,
    ModalFilterResultsModule
  ],
  providers: [
      SinisterService
  ]
})
export class ContainerFiltersInsuranceSinistersModule { }
