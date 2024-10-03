import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceUserService } from './services/workspace-user.service';
import { UserWorkspacesModalComponent } from './components/user-workspaces-modal/user-workspaces-modal.component';
import { SharedModule } from '@shared/shared.module';
import { UserWorkspaceModule } from '@userWorkspace/user-workspace.module';

@NgModule({
    declarations: [UserWorkspacesModalComponent],
    exports: [UserWorkspacesModalComponent],
    imports: [CommonModule, SharedModule, UserWorkspaceModule],
    providers: [WorkspaceUserService],
})
export class WorkspaceUsersModule {}
