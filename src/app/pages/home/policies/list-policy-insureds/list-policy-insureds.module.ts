import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { ListPolicyInsuredsRoutingModule } from './list-policy-insureds-routing.module';
import { ListPolicyInsuredsPage } from './list-policy-insureds.page';

@NgModule({
  declarations: [
    ListPolicyInsuredsPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ListPolicyInsuredsRoutingModule
  ],
  providers: [
    PolicyInsuredService
  ]
})
export class ListPolicyInsuredsModule { }
