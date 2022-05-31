import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertGroupUnusualAppliedPaymentsComponent } from './alert-group-unusual-applied-payments.component';

@NgModule({
  declarations: [
    AlertGroupUnusualAppliedPaymentsComponent
  ],
  exports: [
      AlertGroupUnusualAppliedPaymentsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertGroupUnusualAppliedPaymentsModule { }
