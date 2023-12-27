import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceService } from './services/workspace.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, WorkspaceRoutingModule],
    providers: [WorkspaceService],
})
export class WorkspaceModule {}
