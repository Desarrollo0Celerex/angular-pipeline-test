import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertGroupUnusualAppliedRenewalsComponent } from './alert-group-unusual-applied-renewals.component';

@NgModule({
  declarations: [
    AlertGroupUnusualAppliedRenewalsComponent
  ],
  exports: [
      AlertGroupUnusualAppliedRenewalsComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertGroupUnusualAppliedRenewalsModule { }
