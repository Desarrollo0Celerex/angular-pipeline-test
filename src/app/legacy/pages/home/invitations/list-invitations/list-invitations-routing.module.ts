import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListInvitationsPage } from './list-invitations.page';

const routes: Routes = [{ path: '', component: ListInvitationsPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInvitationsRoutingModule { }
