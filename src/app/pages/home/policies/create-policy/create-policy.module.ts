import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerInsurancesModule } from '@components/container-insurances/container-insurances.module';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyPage } from './create-policy.page';

@NgModule({
  declarations: [CreatePolicyPage],
  imports: [
    CommonModule,
    ContainerInsurancesModule,
    CreatePolicyRoutingModule
  ]
})
export class CreatePolicyModule { }
