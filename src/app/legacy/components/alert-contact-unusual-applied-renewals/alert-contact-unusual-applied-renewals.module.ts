import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertContactUnusualAppliedRenewalsComponent } from './alert-contact-unusual-applied-renewals.component';

@NgModule({
  declarations: [
    AlertContactUnusualAppliedRenewalsComponent
  ],
  exports: [
      AlertContactUnusualAppliedRenewalsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertContactUnusualAppliedRenewalsModule { }
