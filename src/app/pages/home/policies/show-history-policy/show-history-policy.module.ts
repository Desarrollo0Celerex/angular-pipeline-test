import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';

import { ShowHistoryPolicyRoutingModule } from './show-history-policy-routing.module';
import { ShowHistoryPolicyPage } from './show-history-policy.page';


@NgModule({
  declarations: [ShowHistoryPolicyPage],
  imports: [
    CommonModule,
    ContainerPolicyDetailsModule,
    ShowHistoryPolicyRoutingModule
  ]
})
export class ShowHistoryPolicyModule { }
