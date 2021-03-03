import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardIncompletePolicyModule } from '@components/card-incomplete-policy/card-incomplete-policy.module';
import { PolicyService } from '@services/policy.service';

import { ContainerIncompletePoliciesComponent } from './container-incomplete-policies.component';
import { ContainerIncompletePoliciesService } from './container-incomplete-policies.service';

@NgModule({
  declarations: [ContainerIncompletePoliciesComponent],
  exports: [ContainerIncompletePoliciesComponent],
  imports: [
    CardIncompletePolicyModule,
    CommonModule
  ],
  providers: [ContainerIncompletePoliciesService, PolicyService]
})
export class ContainerIncompletePoliciesModule { }
