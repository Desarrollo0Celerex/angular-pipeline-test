import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { PolicyService } from '@services/policy.service';

import { CompletePolicyRoutingModule } from './complete-policy-routing.module';
import { CompletePolicyPage } from './complete-policy.page';
import { CompletePolicyService } from './complete-policy.service';


@NgModule({
  declarations: [CompletePolicyPage],
  imports: [
    CardContactModule,
    CommonModule,
    CompletePolicyRoutingModule,
    ModalShowPolicyModule
  ],
  providers: [CompletePolicyService, PolicyService]
})
export class CompletePolicyModule { }
