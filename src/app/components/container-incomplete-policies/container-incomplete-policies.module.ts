import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmDeletePolicyModule } from '@components/modal-confirm-delete-policy/modal-confirm-delete-policy.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { PolicyService } from '@services/policy.service';

import { ContainerIncompletePoliciesComponent } from './container-incomplete-policies.component';
import { ContainerIncompletePoliciesService } from './container-incomplete-policies.service';

@NgModule({
  declarations: [ContainerIncompletePoliciesComponent],
  exports: [ContainerIncompletePoliciesComponent],
  imports: [
    CardPolicyModule,
    CommonModule,
    ModalConfirmDeletePolicyModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule
  ],
  providers: [ContainerIncompletePoliciesService, PolicyService]
})
export class ContainerIncompletePoliciesModule { }
