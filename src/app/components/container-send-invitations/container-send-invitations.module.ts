import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalChangeRoleModule } from '@components/modal-change-role/modal-change-role.module';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';
import { WorkspaceService } from '@services/workspace.service';

import { ContainerSendInvitationsComponent } from './container-send-invitations.component';
import { ContainerSendInvitationsService } from './container-send-invitations.service';


@NgModule({
  declarations: [ContainerSendInvitationsComponent],
  exports: [ContainerSendInvitationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalChangeRoleModule,
    ReactiveFormsModule
  ],
  providers: [ContainerSendInvitationsService, InvitationService, RoleService, WorkspaceService]
})
export class ContainerSendInvitationsModule { }
