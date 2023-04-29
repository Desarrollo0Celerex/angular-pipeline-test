import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { CheckWorkspaceStatusRoutingModule } from './check-workspace-status-routing.module';
import { CheckWorkspaceStatusPage } from './check-workspace-status.page';
import { CheckWorkspaceStatusService } from './check-workspace-status.service';

@NgModule({
    declarations: [CheckWorkspaceStatusPage],
    imports: [CommonModule, CheckWorkspaceStatusRoutingModule],
    providers: [CheckWorkspaceStatusService, WorkspaceService],
})
export class CheckWorkspaceStatusModule {}
