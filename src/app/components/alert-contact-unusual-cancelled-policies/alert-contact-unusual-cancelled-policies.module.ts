import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertContactUnusualCancelledPoliciesComponent } from './alert-contact-unusual-cancelled-policies.component';

@NgModule({
  declarations: [
    AlertContactUnusualCancelledPoliciesComponent
  ],
  exports: [
      AlertContactUnusualCancelledPoliciesComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertContactUnusualCancelledPoliciesModule { }
