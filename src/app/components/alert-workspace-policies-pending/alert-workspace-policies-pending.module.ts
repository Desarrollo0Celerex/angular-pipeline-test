import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { PolicyService } from '@services/policy.service';

import { AlertWorkspacePoliciesPendingComponent } from './alert-workspace-policies-pending.component';

@NgModule({
  declarations: [
    AlertWorkspacePoliciesPendingComponent
  ],
  exports: [
    AlertWorkspacePoliciesPendingComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
    PolicyService
  ]
})
export class AlertWorkspacePoliciesPendingModule { }
