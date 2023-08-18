import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckAcceptInvitationRoutingModule } from './check-accept-invitation-routing.module';
import { CheckAcceptInvitationPage } from './check-accept-invitation.page';


@NgModule({
  declarations: [
    CheckAcceptInvitationPage
  ],
  imports: [
    CommonModule,
    CheckAcceptInvitationRoutingModule
  ]
})
export class CheckAcceptInvitationModule { }
