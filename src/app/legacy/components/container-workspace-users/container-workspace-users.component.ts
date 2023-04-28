import { Component, OnInit } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { UserRole } from '@interfaces/user-role.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ContainerWorkspaceUsersService } from './container-workspace-users.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-workspace-users',
    templateUrl: './container-workspace-users.component.html',
    styles: [],
    providers: [ContainerWorkspaceUsersService],
})
export class ContainerWorkspaceUsersComponent implements OnInit {
    modalIdChangeRole: string = 'modal-change-role';
    selectedRoleId: number = 0;
    selectedUserId: string = '';
    selectedIndex: number = 0;

    constructor(
        private _containerWorkspaceUsersService: ContainerWorkspaceUsersService,
        private _loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.model.loadUserRoles();
        this.model.loadWorkspaceUsers();
    }

    get model(): ContainerWorkspaceUsersService {
        return this._containerWorkspaceUsersService;
    }

    requestChangeRole(userRole: UserRole): void {
        this.selectedRoleId = userRole.roleId;
        this.selectedUserId = userRole.userId;
        this.selectedIndex = userRole.index;
        ModalPlugin.show(this.modalIdChangeRole);
    }

    updateRole(roleId: number): void {
        this._loadingService.show();
        this.model.updateUserRole(this.selectedUserId, roleId).subscribe(() => {
            this.model.updateUserRoleLocal(roleId, this.selectedIndex);
            this._loadingService.hide();
            AlertHelper.userRoleUpdated();
        });
    }
}
