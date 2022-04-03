import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualPolicyIncreaseModule } from '@components/alert-unusual-policy-increase/alert-unusual-policy-increase.module';
import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerPolicyTrackerManagerModule } from '@components/container-policy-tracker-manager/container-policy-tracker-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PolicyTrackerRoutingModule } from './policy-tracker-routing.module';
import { PolicyTrackerPage } from './policy-tracker.page';

@NgModule({
  declarations: [
    PolicyTrackerPage
  ],
  imports: [
    AlertUnusualPolicyIncreaseModule,
    CommonModule,
    PolicyTrackerRoutingModule,
    ContainerPolicyDetailsModule,
    ContainerPolicyTrackerManagerModule,
    ContentListModule
  ]
})
export class PolicyTrackerModule { }
