import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

import { ModalConfirmGoToAgenthosSupportComponent } from './modal-confirm-go-to-agenthos-support.component';

@NgModule({
  declarations: [
    ModalConfirmGoToAgenthosSupportComponent
  ],
  exports: [
    ModalConfirmGoToAgenthosSupportComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    WorkspaceService,
    WorkspaceUserService,
  ]
})
export class ModalConfirmGoToAgenthosSupportModule { }
