import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceSubcategoryService } from '@services/insurance-subcategory.service';

import { ContainerInsurancesBySubcategoryComponent } from './container-insurances-by-subcategory.component';

@NgModule({
  declarations: [
    ContainerInsurancesBySubcategoryComponent
  ],
  exports: [
    ContainerInsurancesBySubcategoryComponent
  ],
  imports: [
    CardInsuranceModule,
    CommonModule,
    LoadingContentModule
  ],
  providers: [
    ContactService,
    InsuranceService,
    InsuranceSubcategoryService
  ]
})
export class ContainerInsurancesBySubcategoryModule { }
