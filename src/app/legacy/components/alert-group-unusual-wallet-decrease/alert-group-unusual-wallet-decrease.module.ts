import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { BusinessIntelligenceService } from '@services/business-intelligence.service';

import { AlertGroupUnusualWalletDecreaseComponent } from './alert-group-unusual-wallet-decrease.component';

@NgModule({
  declarations: [
    AlertGroupUnusualWalletDecreaseComponent
  ],
  exports: [
      AlertGroupUnusualWalletDecreaseComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
      BusinessIntelligenceService
  ]
})
export class AlertGroupUnusualWalletDecreaseModule { }
