import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

import { ContainerListInsurancesComponent } from './container-list-insurances.component';

@NgModule({
  declarations: [ContainerListInsurancesComponent],
  exports: [ContainerListInsurancesComponent],
  imports: [
    CardInsuranceModule,
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ContactService,
      InsuranceService,
      InsuranceCategoryService
  ]
})
export class ContainerListInsurancesModule { }
