import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerPolicyDetailsModule } from '@components/container-policy-details/container-policy-details.module';
import { ContainerPaymentsManagerModule } from '@components/container-payments-manager/container-payments-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ContainerTimelineComponent } from './container-timeline.component';

@NgModule({
  declarations: [ContainerTimelineComponent],
  exports: [ContainerTimelineComponent],
  imports: [
    CommonModule,
    ContentListModule,
    ContainerPolicyDetailsModule,
    ContainerPaymentsManagerModule
  ]
})
export class ContainerTimelineModule { }
