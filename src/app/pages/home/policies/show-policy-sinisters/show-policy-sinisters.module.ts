import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualReportedSinistersModule } from '@components/alert-unusual-reported-sinisters/alert-unusual-reported-sinisters.module';
import { ChartPolicySinistersModule } from '@components/chart-policy-sinisters/chart-policy-sinisters.module';
import { ChartPolicySinistersBehaviorModule } from '@components/chart-policy-sinisters-behavior/chart-policy-sinisters-behavior.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerSinistersManagerModule } from '@components/container-sinisters-manager/container-sinisters-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ShowPolicySinistersRoutingModule } from './show-policy-sinisters-routing.module';
import { ShowPolicySinistersPage } from './show-policy-sinisters.page';

@NgModule({
  declarations: [ShowPolicySinistersPage],
  imports: [
    AlertUnusualReportedSinistersModule,
    ChartPolicySinistersModule,
    ChartPolicySinistersBehaviorModule,
    CommonModule,
    ContainerPolicyDetailsModule,
    ContainerSinistersManagerModule,
    ContentListModule,
    ShowPolicySinistersRoutingModule
  ]
})
export class ShowPolicySinistersModule { }
