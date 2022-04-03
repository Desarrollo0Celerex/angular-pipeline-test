import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { PolicyService } from '@services/policy.service';

import { AlertUnusualPolicyIncreaseComponent } from './alert-unusual-policy-increase.component';

@NgModule({
  declarations: [
    AlertUnusualPolicyIncreaseComponent
  ],
  exports: [
      AlertUnusualPolicyIncreaseComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [PolicyService]
})
export class AlertUnusualPolicyIncreaseModule { }
