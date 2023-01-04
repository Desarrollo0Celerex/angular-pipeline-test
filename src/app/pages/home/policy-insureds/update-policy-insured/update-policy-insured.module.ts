import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePolicyInsuredRoutingModule } from './update-policy-insured-routing.module';
import { UpdatePolicyInsuredPage } from './update-policy-insured.page';

@NgModule({
  declarations: [
    UpdatePolicyInsuredPage
  ],
  imports: [
    CommonModule,
    UpdatePolicyInsuredRoutingModule
  ]
})
export class UpdatePolicyInsuredModule { }
