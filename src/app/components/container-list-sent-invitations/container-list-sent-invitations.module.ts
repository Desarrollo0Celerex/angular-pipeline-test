import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShareInvitationLinkModule } from '@components/modal-share-invitation-link/modal-share-invitation-link.module';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';

import { ContainerListSentInvitationsComponent } from './container-list-sent-invitations.component';
import { ContainerListSentInvitationsService } from './container-list-sent-invitations.service';

@NgModule({
  declarations: [ContainerListSentInvitationsComponent],
  exports: [ContainerListSentInvitationsComponent],
  imports: [
    CommonModule,
    ModalShareInvitationLinkModule
  ],
  providers: [ContainerListSentInvitationsService, InvitationService, RoleService]
})
export class ContainerListSentInvitationsModule { }
