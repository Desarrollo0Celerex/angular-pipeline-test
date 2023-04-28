import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptInvitationPage } from './accept-invitation.page';

const routes: Routes = [{ path: '', component: AcceptInvitationPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptInvitationRoutingModule { }
