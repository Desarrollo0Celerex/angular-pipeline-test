import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceModule } from '@components/card-insurance/card-insurance.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ContainerInsurancesBySearchComponent } from './container-insurances-by-search.component';

@NgModule({
  declarations: [
    ContainerInsurancesBySearchComponent
  ],
  exports: [
    ContainerInsurancesBySearchComponent
  ],
  imports: [
    CardInsuranceModule,
    CommonModule,
    LoadingContentModule
  ]
})
export class ContainerInsurancesBySearchModule { }
