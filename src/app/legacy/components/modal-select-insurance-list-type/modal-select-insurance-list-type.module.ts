import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectInsuranceListTypeComponent } from './modal-select-insurance-list-type.component';

@NgModule({
  declarations: [
    ModalSelectInsuranceListTypeComponent
  ],
  exports: [
    ModalSelectInsuranceListTypeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalSelectInsuranceListTypeModule { }
