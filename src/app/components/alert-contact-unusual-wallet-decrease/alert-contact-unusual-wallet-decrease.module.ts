import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertContactUnusualWalletDecreaseComponent } from './alert-contact-unusual-wallet-decrease.component';

@NgModule({
  declarations: [
    AlertContactUnusualWalletDecreaseComponent
  ],
  exports: [
      AlertContactUnusualWalletDecreaseComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertContactUnusualWalletDecreaseModule { }
