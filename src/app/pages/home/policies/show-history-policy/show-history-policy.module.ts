import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerTimelineModule } from '@components/container-timeline/container-timeline.module';

import { ShowHistoryPolicyRoutingModule } from './show-history-policy-routing.module';
import { ShowHistoryPolicyPage } from './show-history-policy.page';

@NgModule({
  declarations: [ShowHistoryPolicyPage],
  imports: [
    CommonModule,
    ContainerTimelineModule,
    ShowHistoryPolicyRoutingModule
  ]
})
export class ShowHistoryPolicyModule { }
