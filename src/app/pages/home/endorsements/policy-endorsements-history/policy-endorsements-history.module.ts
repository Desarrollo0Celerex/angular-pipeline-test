import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerTimelineModule } from '@components/container-timeline/container-timeline.module';

import { PolicyEndorsementsHistoryRoutingModule } from './policy-endorsements-history-routing.module';
import { PolicyEndorsementsHistoryPage } from './policy-endorsements-history.page';

@NgModule({
  declarations: [
    PolicyEndorsementsHistoryPage
  ],
  imports: [
    CommonModule,
    PolicyEndorsementsHistoryRoutingModule,
    ContainerTimelineModule
  ]
})
export class PolicyEndorsementsHistoryModule { }
