import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertPartnerUnusualAppliedPaymentsComponent } from './alert-partner-unusual-applied-payments.component';

@NgModule({
  declarations: [
    AlertPartnerUnusualAppliedPaymentsComponent
  ],
  exports: [
      AlertPartnerUnusualAppliedPaymentsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertPartnerUnusualAppliedPaymentsModule { }
