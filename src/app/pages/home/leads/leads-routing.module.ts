import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { LeadsLayout } from './leads.layout';

const routes: Routes = [{
    path: '',
    component: LeadsLayout,
    children: [
        { path: ROUTES_NAME.channels, loadChildren: () => import('@pages/home/leads/channels/channels.module').then(mod => mod.ChannelsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
