import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertUnusualPolicyIncreaseComponent } from './alert-unusual-policy-increase.component';

@NgModule({
  declarations: [
    AlertUnusualPolicyIncreaseComponent
  ],
  exports: [
      AlertUnusualPolicyIncreaseComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertUnusualPolicyIncreaseModule { }
