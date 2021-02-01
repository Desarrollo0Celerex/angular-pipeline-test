import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalChangeRoleModule } from '@components/modal-change-role/modal-change-role.module';
import { RoleService } from '@services/role.service';
import { WorkspaceService } from '@services/workspace.service';

import { SendInvitationsRoutingModule } from './send-invitations-routing.module';
import { SendInvitationsPage } from './send-invitations.page';
import { SendInvitationsService } from './send-invitations.service';

@NgModule({
  declarations: [SendInvitationsPage],
  imports: [
    CommonModule,
    FormsModule,
    ModalChangeRoleModule,
    ReactiveFormsModule,
    SendInvitationsRoutingModule
  ],
  providers: [RoleService, SendInvitationsService, WorkspaceService]
})
export class SendInvitationsModule { }
