import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '@interfaces/role.interface';
import { User } from '@interfaces/user.interface';
import { UpdateUserRoleDataSend } from '@interfaces/update-user-role-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { WorkspaceUserService } from '@services/workspace-user.service';
import { RoleService } from '@services/role.service';

@Injectable()
export class ContainerWorkspaceUsersService {
    users: User[] = [];
    roles: Role[] = [];

    constructor(
        private _workspaceUserService: WorkspaceUserService,
        private _roleService: RoleService
    ) { }

    loadUserRoles(): void {
        const fields: string = 'roleId,name';
        this._roleService.getRoles(fields).subscribe( (res: HttpResponse) => {
            this.roles = res.data;
        });
    }

    loadWorkspaceUsers(): void {
        const fields: string = 'userId,avatarUrl,shortName,email,roleId,roleName';
        const page: number = 1;
        const perPage: number = 50;
        this._workspaceUserService.getWorkspaceUsers(fields, page, perPage).subscribe((res: HttpResponse) => {
            this.users = res.data.items;
        })
    }

    updateUserRole(userId: string, roleId: number): Observable<void> {
        const requestBody: UpdateUserRoleDataSend = { roleId };
        return this._workspaceUserService.updateWorkspaceUserRole(userId, requestBody);
    }

    updateUserRoleLocal(roleId: number, index: number): void {
        const roleName = this._getRoleName(roleId);
        this.users[index].roleName = roleName;
    }

    private _getRoleName(roleId: number): string {
        const role: Role | undefined = this.roles.find( (element: Role) => element.roleId == roleId)
        return (!!role) ? role.name : '';
    }
}
