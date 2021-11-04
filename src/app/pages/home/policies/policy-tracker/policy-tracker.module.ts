import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    PolicyTrackerRoutingModule,
    ContainerPolicyDetailsModule,
    ContainerPolicyTrackerManagerModule,
    ContentListModule
  ]
})
export class PolicyTrackerModule { }
