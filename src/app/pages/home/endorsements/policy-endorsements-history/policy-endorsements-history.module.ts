import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualAddedEndorsementsModule } from '@components/alert-unusual-added-endorsements/alert-unusual-added-endorsements.module';
import { ChartPolicyEndorsementsModule } from '@components/chart-policy-endorsements/chart-policy-endorsements.module';
import { ChartPolicyEndorsementsBehaviorModule } from '@components/chart-policy-endorsements-behavior/chart-policy-endorsements-behavior.module';
import { ContainerPolicyEndorsementsManagerModule } from '@components/container-policy-endorsements-manager/container-policy-endorsements-manager.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
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
    ChartPolicyEndorsementsBehaviorModule,
    CommonModule,
    ContainerContactDetailsModule,
    ContainerPolicyEndorsementsManagerModule,
    ContentListModule,
    PolicyEndorsementsHistoryRoutingModule,
  ]
})
export class PolicyEndorsementsHistoryModule { }
