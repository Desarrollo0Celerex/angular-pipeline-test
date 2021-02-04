import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { ModalActivateWorkspaceModule } from '@components/modal-activate-workspace/modal-activate-workspace.module';
import { WorkspaceService } from '@services/workspace.service';

import { ActivateWorkspaceRoutingModule } from './activate-workspace-routing.module';
import { ActivateWorkspacePage } from './activate-workspace.page';
import { ActivateWorkspaceService } from './activate-workspace.service';


@NgModule({
  declarations: [ActivateWorkspacePage],
  imports: [
    ActivateWorkspaceRoutingModule,
    CommonModule,
    LogoAgenthosDarkModule,
    ModalActivateWorkspaceModule
  ],
  providers: [ActivateWorkspaceService, WorkspaceService]
})
export class ActivateWorkspaceModule { }
