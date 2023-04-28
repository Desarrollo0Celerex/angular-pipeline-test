import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShareInvitationLinkModule } from '@components/modal-share-invitation-link/modal-share-invitation-link.module';
import { InvitationService } from '@services/invitation.service';
import { RoleService } from '@services/role.service';

import { SentInvitationsComponent } from './sent-invitations.component';
import { SentInvitationsService } from './sent-invitations.service';

@NgModule({
  declarations: [SentInvitationsComponent],
  exports: [SentInvitationsComponent],
  imports: [
    CommonModule,
    ModalShareInvitationLinkModule
  ],
  providers: [SentInvitationsService, InvitationService, RoleService]
})
export class SentInvitationsModule { }
