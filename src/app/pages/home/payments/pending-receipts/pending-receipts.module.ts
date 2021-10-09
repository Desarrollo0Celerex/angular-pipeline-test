import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerPaymentsManagerModule } from '@components/container-payments-manager/container-payments-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PendingReceiptsRoutingModule } from './pending-receipts-routing.module';
import { PendingReceiptsPage } from './pending-receipts.page';

@NgModule({
  declarations: [
    PendingReceiptsPage
  ],
  imports: [
    CommonModule,
    PendingReceiptsRoutingModule,
    ContainerPolicyDetailsModule,
    ContainerPaymentsManagerModule,
    ContentListModule
  ]
})
export class PendingReceiptsModule { }
