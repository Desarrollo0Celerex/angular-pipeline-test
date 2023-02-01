import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerInsurancesByCategoryModule } from '@components/container-insurances-by-category/container-insurances-by-category.module';
import { ContainerInsurancesBySubcategoryModule } from '@components/container-insurances-by-subcategory/container-insurances-by-subcategory.module';
import { ContainerInsurancesMostUsedModule } from '@components/container-insurances-most-used/container-insurances-most-used.module';
import { ContentMainActionModule } from '@components/content-main-action/content-main-action.module';
import { ContentSearchEngineModule } from '@components/content-search-engine/content-search-engine.module';
import { ModalGetPolicyDetailsModule } from '@components/modal-get-policy-details/modal-get-policy-details.module';

import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

import { ContainerInsurancesComponent } from './container-insurances.component';

@NgModule({
  declarations: [
    ContainerInsurancesComponent
  ],
  exports: [
    ContainerInsurancesComponent
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContainerInsurancesByCategoryModule,
    ContainerInsurancesBySubcategoryModule,
    ContainerInsurancesMostUsedModule,
    ContentMainActionModule,
    ContentSearchEngineModule,
    ModalGetPolicyDetailsModule
  ],
  providers: [
    PolicyService,
    QuotationService
  ]
})
export class ContainerInsurancesModule { }
