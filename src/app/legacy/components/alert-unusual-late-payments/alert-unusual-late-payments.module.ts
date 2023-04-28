import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertUnusualLatePaymentsComponent } from './alert-unusual-late-payments.component';

@NgModule({
  declarations: [
    AlertUnusualLatePaymentsComponent
  ],
  exports: [
      AlertUnusualLatePaymentsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertUnusualLatePaymentsModule { }
