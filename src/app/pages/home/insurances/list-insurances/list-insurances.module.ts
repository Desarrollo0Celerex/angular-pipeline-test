import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

import { ListInsurancesRoutingModule } from './list-insurances-routing.module';
import { ListInsurancesPage } from './list-insurances.page';
import { ListInsurancesService } from './list-insurances.service';

@NgModule({
  declarations: [ListInsurancesPage],
  imports: [
    CardContactModule,
    CardInsuranceModule,
    CommonModule,
    ListInsurancesRoutingModule
  ],
  providers: [InsuranceService, InsuranceCategoryService, ListInsurancesService]
})
export class ListInsurancesModule { }
