import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactModule } from '@components/card-contact/card-contact.module';

import { ListInsurancesRoutingModule } from './list-insurances-routing.module';
import { ListInsurancesPage } from './list-insurances.page';
import { ListInsurancesService } from './list-insurances.service';

@NgModule({
  declarations: [ListInsurancesPage],
  imports: [
    CardContactModule,
    CommonModule,
    ListInsurancesRoutingModule
  ],
  providers: [ListInsurancesService]
})
export class ListInsurancesModule { }
