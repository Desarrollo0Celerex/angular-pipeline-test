import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { ModalCreateQuotationModule } from '@components/modal-create-quotation/modal-create-quotation.module';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

import { ListInsurancesRoutingModule } from './list-insurances-routing.module';
import { ListInsurancesPage } from './list-insurances.page';
import { ListInsurancesService } from './list-insurances.service';

@NgModule({
  declarations: [ListInsurancesPage],
  imports: [
    ContainerContactDetailsModule,
    CardInsuranceModule,
    CommonModule,
    ListInsurancesRoutingModule,
    ModalCreateQuotationModule
  ],
  providers: [InsuranceService, InsuranceCategoryService, ListInsurancesService]
})
export class ListInsurancesModule { }
