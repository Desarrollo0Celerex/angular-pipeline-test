import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

import { ContainerInsurancesByCategoryComponent } from './container-insurances-by-category.component';

@NgModule({
  declarations: [
    ContainerInsurancesByCategoryComponent
  ],
  exports: [
    ContainerInsurancesByCategoryComponent
  ],
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
export class ContainerInsurancesByCategoryModule { }
