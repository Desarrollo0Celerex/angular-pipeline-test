import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualReportedSinistersModule } from '@components/alert-unusual-reported-sinisters/alert-unusual-reported-sinisters.module';
import { ChartPolicySinistersModule } from '@components/chart-policy-sinisters/chart-policy-sinisters.module';
import { ChartPolicySinistersBehaviorModule } from '@components/chart-policy-sinisters-behavior/chart-policy-sinisters-behavior.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerSinistersManagerModule } from '@components/container-sinisters-manager/container-sinisters-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ShowPolicyClosedSinistersRoutingModule } from './show-policy-closed-sinisters-routing.module';
import { ShowPolicyClosedSinistersPage } from './show-policy-closed-sinisters.page';


@NgModule({
  declarations: [
    ShowPolicyClosedSinistersPage
  ],
  imports: [
    AlertUnusualReportedSinistersModule,
    ChartPolicySinistersModule,
    ChartPolicySinistersBehaviorModule,
    CommonModule,
    ContainerContactDetailsModule,
    ContainerSinistersManagerModule,
    ContentListModule,
    ShowPolicyClosedSinistersRoutingModule
  ]
})
export class ShowPolicyClosedSinistersModule { }
