import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '', component: HomePage,
        children: [
            { path: ROUTES_NAME.sendInvitations, loadChildren: () => import('@pages/home/invitations/send-invitations/send-invitations.module').then(mod => mod.SendInvitationsModule), canActivate: [UserAuthenticatedGuard] }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
