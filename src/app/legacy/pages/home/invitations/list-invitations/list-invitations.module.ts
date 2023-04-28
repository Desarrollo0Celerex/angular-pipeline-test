import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendInvitationsModule } from '@components/send-invitations/send-invitations.module';
import { SentInvitationsModule } from '@components/sent-invitations/sent-invitations.module';
import { ContainerWorkspaceUsersModule } from '@components/container-workspace-users/container-workspace-users.module';

import { ListInvitationsRoutingModule } from './list-invitations-routing.module';
import { ListInvitationsPage } from './list-invitations.page';

@NgModule({
  declarations: [ListInvitationsPage],
  imports: [
    CommonModule,
    SentInvitationsModule,
    SendInvitationsModule,
    ListInvitationsRoutingModule,
    ContainerWorkspaceUsersModule
  ]
})
export class ListInvitationsModule { }
