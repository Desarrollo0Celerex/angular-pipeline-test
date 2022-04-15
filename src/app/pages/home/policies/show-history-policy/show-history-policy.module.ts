import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualAddedEndorsementsModule } from '@components/alert-unusual-added-endorsements/alert-unusual-added-endorsements.module';
import { AlertUnusualLatePaymentsModule } from '@components/alert-unusual-late-payments/alert-unusual-late-payments.module';
import { AlertUnusualPolicyIncreaseModule } from '@components/alert-unusual-policy-increase/alert-unusual-policy-increase.module';
import { AlertUnusualReportedSinistersModule } from '@components/alert-unusual-reported-sinisters/alert-unusual-reported-sinisters.module';
import { ChartPolicySinistersModule } from '@components/chart-policy-sinisters/chart-policy-sinisters.module';
import { ChartPolicyPaymentsModule } from '@components/chart-policy-payments/chart-policy-payments.module';
import { ChartPolicyEndorsementsModule } from '@components/chart-policy-endorsements/chart-policy-endorsements.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerPolicyManagerModule } from '@components/container-policy-manager/container-policy-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ShowHistoryPolicyRoutingModule } from './show-history-policy-routing.module';
import { ShowHistoryPolicyPage } from './show-history-policy.page';

@NgModule({
  declarations: [ShowHistoryPolicyPage],
  imports: [
    AlertUnusualAddedEndorsementsModule,
    AlertUnusualLatePaymentsModule,
    AlertUnusualPolicyIncreaseModule,
    AlertUnusualReportedSinistersModule,
    ChartPolicyEndorsementsModule,
    ChartPolicyPaymentsModule,
    ChartPolicySinistersModule,
    CommonModule,
    ContainerPolicyDetailsModule,
    ContainerPolicyManagerModule,
    ContentListModule,
    ShowHistoryPolicyRoutingModule
  ]
})
export class ShowHistoryPolicyModule { }
