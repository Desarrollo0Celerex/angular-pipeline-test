import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerListInsurancesModule } from '@components/container-list-insurances/container-list-insurances.module';
import { ModalGetPolicyDetailsModule } from '@components/modal-get-policy-details/modal-get-policy-details.module';
import { PolicyService } from '@services/policy.service';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyPage } from './create-policy.page';
import { CreatePolicyService } from './create-policy.service';

@NgModule({
  declarations: [CreatePolicyPage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContainerListInsurancesModule,
    CreatePolicyRoutingModule,
    ModalGetPolicyDetailsModule
  ],
  providers: [CreatePolicyService, PolicyService]
})
export class CreatePolicyModule { }
