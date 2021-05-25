import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerManageSinisterModule } from '@components/container-manage-sinister/container-manage-sinister.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';

import { ShowSinisterHistoryRoutingModule } from './show-sinister-history-routing.module';
import { ShowSinisterHistoryPage } from './show-sinister-history.page';


@NgModule({
  declarations: [ShowSinisterHistoryPage],
  imports: [
    CommonModule,
    ContainerManageSinisterModule,
    ContainerPolicyDetailsModule,
    ShowSinisterHistoryRoutingModule
  ]
})
export class ShowSinisterHistoryModule { }
