import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

import { ContainerListInsurancesComponent } from './container-list-insurances.component';
import { ContainerListInsurancesService } from './container-list-insurances.service';

@NgModule({
  declarations: [ContainerListInsurancesComponent],
  exports: [ContainerListInsurancesComponent],
  imports: [
    CardInsuranceModule,
    CommonModule
  ],
  providers: [ContainerListInsurancesService, InsuranceService, InsuranceCategoryService]
})
export class ContainerListInsurancesModule { }
