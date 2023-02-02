import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualReportedSinistersModule } from '@components/alert-unusual-reported-sinisters/alert-unusual-reported-sinisters.module';
import { ChartPolicySinistersModule } from '@components/chart-policy-sinisters/chart-policy-sinisters.module';
import { ChartPolicySinistersBehaviorModule } from '@components/chart-policy-sinisters-behavior/chart-policy-sinisters-behavior.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerSinistersManagerModule } from '@components/container-sinisters-manager/container-sinisters-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ShowPolicyOpenSinistersRoutingModule } from './show-policy-open-sinisters-routing.module';
import { ShowPolicyOpenSinistersPage } from './show-policy-open-sinisters.page';


@NgModule({
  declarations: [
    ShowPolicyOpenSinistersPage
  ],
  imports: [
    AlertUnusualReportedSinistersModule,
    ChartPolicySinistersModule,
    ChartPolicySinistersBehaviorModule,
    CommonModule,
    ContainerContactDetailsModule,
    ContainerSinistersManagerModule,
    ContentListModule,
    ShowPolicyOpenSinistersRoutingModule
  ]
})
export class ShowPolicyOpenSinistersModule { }
