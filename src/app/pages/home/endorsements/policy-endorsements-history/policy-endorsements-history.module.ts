import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualAddedEndorsementsModule } from '@components/alert-unusual-added-endorsements/alert-unusual-added-endorsements.module';
import { ChartPolicyEndorsementsModule } from '@components/chart-policy-endorsements/chart-policy-endorsements.module';
import { ContainerPolicyEndorsementsManagerModule } from '@components/container-policy-endorsements-manager/container-policy-endorsements-manager.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PolicyEndorsementsHistoryRoutingModule } from './policy-endorsements-history-routing.module';
import { PolicyEndorsementsHistoryPage } from './policy-endorsements-history.page';

@NgModule({
  declarations: [
    PolicyEndorsementsHistoryPage
  ],
  imports: [
    AlertUnusualAddedEndorsementsModule,
    ChartPolicyEndorsementsModule,
    CommonModule,
    ContainerPolicyDetailsModule,
    ContainerPolicyEndorsementsManagerModule,
    ContentListModule,
    PolicyEndorsementsHistoryRoutingModule,
  ]
})
export class PolicyEndorsementsHistoryModule { }
