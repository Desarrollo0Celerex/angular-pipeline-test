import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertPartnerUnusualAppliedRenewalsComponent } from './alert-partner-unusual-applied-renewals.component';

@NgModule({
  declarations: [
    AlertPartnerUnusualAppliedRenewalsComponent
  ],
  exports: [
      AlertPartnerUnusualAppliedRenewalsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertPartnerUnusualAppliedRenewalsModule { }
