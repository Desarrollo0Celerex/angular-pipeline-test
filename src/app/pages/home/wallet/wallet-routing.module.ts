import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { WalletLayout } from './wallet.layout';

const routes: Routes = [{
    path: '',
    component: WalletLayout,
    children: [
        { path: ROUTES_NAME.walletResume, loadChildren: () => import('@pages/home/wallet/wallet-resume/wallet-resume.module').then(mod => mod.WalletResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.walletIdentity, loadChildren: () => import('@pages/home/wallet/wallet-identity/wallet-identity.module').then(mod => mod.WalletIdentityModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.walletContact, loadChildren: () => import('@pages/home/wallet/wallet-contact/wallet-contact.module').then(mod => mod.WalletContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
