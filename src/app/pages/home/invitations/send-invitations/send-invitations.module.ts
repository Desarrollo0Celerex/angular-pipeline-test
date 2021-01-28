import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendInvitationsRoutingModule } from './send-invitations-routing.module';
import { SendInvitationsPage } from './send-invitations.page';
import { SendInvitationsService } from './send-invitations.service';


@NgModule({
  declarations: [SendInvitationsPage],
  imports: [
    CommonModule,
    SendInvitationsRoutingModule
  ],
  providers: [SendInvitationsService]
})
export class SendInvitationsModule { }
