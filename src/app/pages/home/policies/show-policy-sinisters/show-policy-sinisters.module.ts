import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerTimelineModule } from '@components/container-timeline/container-timeline.module';

import { ShowPolicySinistersRoutingModule } from './show-policy-sinisters-routing.module';
import { ShowPolicySinistersPage } from './show-policy-sinisters.page';

@NgModule({
  declarations: [ShowPolicySinistersPage],
  imports: [
    CommonModule,
    ContainerTimelineModule,
    ShowPolicySinistersRoutingModule
  ]
})
export class ShowPolicySinistersModule { }
