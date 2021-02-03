import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerSendInvitationsModule } from '@components/container-send-invitations/container-send-invitations.module';
import { ContainerListSentInvitationsModule } from '@components/container-list-sent-invitations/container-list-sent-invitations.module';

import { SendInvitationsRoutingModule } from './send-invitations-routing.module';
import { SendInvitationsPage } from './send-invitations.page';
import { SendInvitationsService } from './send-invitations.service';

@NgModule({
  declarations: [SendInvitationsPage],
  imports: [
    CommonModule,
    ContainerListSentInvitationsModule,
    ContainerSendInvitationsModule,
    SendInvitationsRoutingModule
  ],
  providers: [SendInvitationsService]
})
export class SendInvitationsModule { }
