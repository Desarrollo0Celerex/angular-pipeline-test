import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardUserModule } from '@components/card-user/card-user.module';
import { ModalSelectRoleModule } from '@components/modal-select-role/modal-select-role.module';
import { WorkspaceUserService } from '@services/workspace-user.service';
import { RoleService } from '@services/role.service';

import { ContainerWorkspaceUsersComponent } from './container-workspace-users.component';

@NgModule({
  declarations: [
    ContainerWorkspaceUsersComponent
  ],
  exports: [
      ContainerWorkspaceUsersComponent
  ],
  imports: [
    CommonModule,
    CardUserModule,
    ModalSelectRoleModule
  ],
  providers: [
    WorkspaceUserService,
    RoleService
  ]
})
export class ContainerWorkspaceUsersModule { }
