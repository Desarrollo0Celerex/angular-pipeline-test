import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { PolicyService } from '@services/policy.service';

import { AlertUnusualReportedSinistersComponent } from './alert-unusual-reported-sinisters.component';

@NgModule({
  declarations: [
    AlertUnusualReportedSinistersComponent
  ],
  exports: [
      AlertUnusualReportedSinistersComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      PolicyService
  ]
})
export class AlertUnusualReportedSinistersModule { }
