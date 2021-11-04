import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerPaymentsManagerModule } from '@components/container-payments-manager/container-payments-manager.module';
import { ContainerPolicyEndorsementsManagerModule } from '@components/container-policy-endorsements-manager/container-policy-endorsements-manager.module';
import { ContainerPolicyManagerModule } from '@components/container-policy-manager/container-policy-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContainerTimelineComponent } from './container-timeline.component';

@NgModule({
  declarations: [ContainerTimelineComponent],
  exports: [ContainerTimelineComponent],
  imports: [
    CommonModule,
    ContentListModule,
    ContainerPolicyDetailsModule,
    ContainerPolicyEndorsementsManagerModule,
    ContainerPolicyManagerModule,
    ContainerPaymentsManagerModule
  ]
})
export class ContainerTimelineModule { }
