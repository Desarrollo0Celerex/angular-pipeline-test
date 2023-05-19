import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { PolicyService } from '@services/policy.service';

import { AlertWorkspacePoliciesIncompleteComponent } from './alert-workspace-policies-incomplete.component';

@NgModule({
  declarations: [
    AlertWorkspacePoliciesIncompleteComponent
  ],
  exports: [
    AlertWorkspacePoliciesIncompleteComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
    PolicyService
  ]
})
export class AlertWorkspacePoliciesIncompleteModule { }
