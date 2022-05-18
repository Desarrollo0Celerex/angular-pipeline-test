import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { PolicyService } from '@services/policy.service';

import { ContainerPendingPoliciesComponent } from './container-pending-policies.component';

@NgModule({
  declarations: [
    ContainerPendingPoliciesComponent
  ],
  exports: [
      ContainerPendingPoliciesComponent
  ],
  imports: [
    CardPolicyModule,
    CommonModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerPendingPoliciesModule { }
