import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertUnusualAddedEndorsementsComponent } from './alert-unusual-added-endorsements.component';

@NgModule({
  declarations: [
    AlertUnusualAddedEndorsementsComponent
  ],
  exports: [
      AlertUnusualAddedEndorsementsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertUnusualAddedEndorsementsModule { }
