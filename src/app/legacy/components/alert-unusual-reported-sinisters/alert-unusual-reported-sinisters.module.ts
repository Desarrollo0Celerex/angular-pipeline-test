import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

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
      BusinessIntelligenceService
  ]
})
export class AlertUnusualReportedSinistersModule { }
