import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertPartnerUnusualWalletDecreaseComponent } from './alert-partner-unusual-wallet-decrease.component';

@NgModule({
  declarations: [
    AlertPartnerUnusualWalletDecreaseComponent
  ],
  exports: [
      AlertPartnerUnusualWalletDecreaseComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertPartnerUnusualWalletDecreaseModule { }
