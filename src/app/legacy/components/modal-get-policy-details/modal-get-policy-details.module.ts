import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InsuranceTypeService } from '@services/insurance-type.service';

import { ModalGetPolicyDetailsComponent } from './modal-get-policy-details.component';
import { ModalGetPolicyDetailsService } from './modal-get-policy-details.service';

@NgModule({
  declarations: [ModalGetPolicyDetailsComponent],
  exports: [ModalGetPolicyDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [InsuranceTypeService, ModalGetPolicyDetailsService]
})
export class ModalGetPolicyDetailsModule { }
