import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardInsuranceComponent } from './card-insurance.component';

@NgModule({
  declarations: [CardInsuranceComponent],
  exports: [CardInsuranceComponent],
  imports: [
    CommonModule
  ]
})
export class CardInsuranceModule { }
