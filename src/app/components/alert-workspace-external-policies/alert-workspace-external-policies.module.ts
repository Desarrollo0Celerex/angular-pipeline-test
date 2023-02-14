import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { ExternalPolicyService } from '@services/external-policy.service';

import { AlertWorkspaceExternalPoliciesComponent } from './alert-workspace-external-policies.component';

@NgModule({
  declarations: [
    AlertWorkspaceExternalPoliciesComponent
  ],
  exports: [
    AlertWorkspaceExternalPoliciesComponent
  ],
  imports: [
    CommonModule,
    ImageAgenthosAssistantModule
  ],
  providers: [
    ExternalPolicyService
  ]
})
export class AlertWorkspaceExternalPoliciesModule { }
