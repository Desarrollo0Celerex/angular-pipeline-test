import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertPartnerUnusualCancelledPoliciesComponent } from './alert-partner-unusual-cancelled-policies.component';

@NgModule({
  declarations: [
    AlertPartnerUnusualCancelledPoliciesComponent
  ],
  exports: [
      AlertPartnerUnusualCancelledPoliciesComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertPartnerUnusualCancelledPoliciesModule { }
