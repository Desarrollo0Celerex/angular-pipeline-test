import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { ModalCaptureActivationCodeModule } from '@components/modal-capture-activation-code/modal-capture-activation-code.module';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { ActivateWorkspaceRoutingModule } from './activate-workspace-routing.module';
import { ActivateWorkspacePage } from './activate-workspace.page';
import { ActivateWorkspaceService } from './activate-workspace.service';

@NgModule({
    declarations: [ActivateWorkspacePage],
    imports: [
        ActivateWorkspaceRoutingModule,
        CommonModule,
        LogoAgenthosDarkModule,
        ModalCaptureActivationCodeModule,
    ],
    providers: [ActivateWorkspaceService, WorkspaceService],
})
export class ActivateWorkspaceModule {}
