import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerListInsurancesModule } from '@components/container-list-insurances/container-list-insurances.module';
import { ModalGetPolicyDetailsModule } from '@components/modal-get-policy-details/modal-get-policy-details.module';
import { PolicyService } from '@services/policy.service';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyPage } from './create-policy.page';

@NgModule({
  declarations: [CreatePolicyPage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContainerListInsurancesModule,
    CreatePolicyRoutingModule,
    ModalGetPolicyDetailsModule
  ],
  providers: [PolicyService]
})
export class CreatePolicyModule { }
