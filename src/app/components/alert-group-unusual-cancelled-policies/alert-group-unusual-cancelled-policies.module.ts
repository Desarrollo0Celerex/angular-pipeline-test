import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertGroupUnusualCancelledPoliciesComponent } from './alert-group-unusual-cancelled-policies.component';

@NgModule({
  declarations: [
    AlertGroupUnusualCancelledPoliciesComponent
  ],
  exports: [
      AlertGroupUnusualCancelledPoliciesComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertGroupUnusualCancelledPoliciesModule { }
