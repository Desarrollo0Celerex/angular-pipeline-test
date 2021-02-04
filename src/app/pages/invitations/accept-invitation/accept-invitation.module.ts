import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationService } from '@services/invitation.service';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationPage } from './accept-invitation.page';
import { AcceptInvitationService } from './accept-invitation.service';


@NgModule({
  declarations: [AcceptInvitationPage],
  imports: [
    CommonModule,
    AcceptInvitationRoutingModule
  ],
  providers: [AcceptInvitationService, InvitationService]
})
export class AcceptInvitationModule { }
