import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendInvitationsModule } from '@components/send-invitations/send-invitations.module';
import { SentInvitationsModule } from '@components/sent-invitations/sent-invitations.module';

import { ListInvitationsRoutingModule } from './list-invitations-routing.module';
import { ListInvitationsPage } from './list-invitations.page';
import { ListInvitationsService } from './list-invitations.service';

@NgModule({
  declarations: [ListInvitationsPage],
  imports: [
    CommonModule,
    SentInvitationsModule,
    SendInvitationsModule,
    ListInvitationsRoutingModule
  ],
  providers: [ListInvitationsService]
})
export class ListInvitationsModule { }
