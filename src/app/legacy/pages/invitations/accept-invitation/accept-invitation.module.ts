import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAgenthosDarkModule } from '@components/logo-agenthos-dark/logo-agenthos-dark.module';
import { InvitationService } from '@services/invitation.service';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationPage } from './accept-invitation.page';
import { AcceptInvitationService } from './accept-invitation.service';


@NgModule({
  declarations: [AcceptInvitationPage],
  imports: [
    AcceptInvitationRoutingModule,
    CommonModule,
    LogoAgenthosDarkModule
  ],
  providers: [AcceptInvitationService, InvitationService]
})
export class AcceptInvitationModule { }
