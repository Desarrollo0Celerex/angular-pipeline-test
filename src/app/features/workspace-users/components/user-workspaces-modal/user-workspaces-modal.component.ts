import { Component } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { LoadingService } from '@core/services/loading/loading.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { UserWorkspaceService } from '@userWorkspace/services/user-workspace.service';
import { WorkspaceUserService } from '@workspace-users/services/workspace-user.service';
import { Workspace } from '@workspace/interfaces/workspace.interface';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-user-workspaces-modal',
    templateUrl: './user-workspaces-modal.component.html',
    styles: [],
})
export class UserWorkspacesModalComponent {
    modalId = 'agt-user-workspaces-modal';
    userWorkspaces: Workspace[] = [];

    constructor(
        private _authService: AuthService,
        private _loadingService: LoadingService,
        private _userWorkspaceService: UserWorkspaceService
    ) {}

    openModal(): void {
        ModalPlugin.show(this.modalId);
        this._loadUserWorkspaces();
    }

    onSelectWorkspace(newWorkspaceId: string): void {
        this._loadingService.show();
        this._userWorkspaceService
            .updateUserWorkspace(newWorkspaceId)
            .subscribe(() => {
                this._loadingService.hide();
                this._authService.logout(true, ROUTES_NAME.workspaceWelcome);
            });
    }

    private _loadUserWorkspaces(): void {
        const fields =
            'workspaceId,workspaceAvatarUrl,workspaceBrandName,workspaceRealName';
        this._userWorkspaceService
            .getUserWorkspaces(fields)
            .subscribe((workspaces) => {
                this.userWorkspaces = workspaces.filter(
                    (workspace) =>
                        workspace.workspaceId !== this._authService.workspaceId
                );
            });
    }
}
