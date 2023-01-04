import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContentsModule } from '@components/contents/contents.module';

import { ListPolicyInsuredsRoutingModule } from './list-policy-insureds-routing.module';
import { ListPolicyInsuredsPage } from './list-policy-insureds.page';

@NgModule({
  declarations: [
    ListPolicyInsuredsPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContentsModule,
    ListPolicyInsuredsRoutingModule
  ]
})
export class ListPolicyInsuredsModule { }
