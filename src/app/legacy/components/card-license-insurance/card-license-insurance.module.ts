import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardLicenseInsuranceComponent } from './card-license-insurance.component';

@NgModule({
  declarations: [
    CardLicenseInsuranceComponent
  ],
  exports: [
    CardLicenseInsuranceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardLicenseInsuranceModule { }
