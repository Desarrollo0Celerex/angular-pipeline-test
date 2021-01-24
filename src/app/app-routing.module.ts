import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

const routes: Routes = [
    { path: '', redirectTo: ROUTES_NAME.LOGIN, pathMatch: 'full' },

    // auth
    { path: ROUTES_NAME.LOGIN, loadChildren: () => import('@pages/auth/login/login.module').then( mod => mod.LoginModule) },
    { path: ROUTES_NAME.IDENTIFIER(':authToken'), loadChildren: () => import('@pages/auth/identifier/identifier.module').then( mod => mod.IdentifierModule) },

    // data
    { path: ROUTES_NAME.DASHBOARD, loadChildren: () => import('@pages/data/dashboard/dashboard.module').then( mod => mod.DashboardModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

    // workspace
    { path: ROUTES_NAME.CHECK_WORKSPACE_STATUS, loadChildren: () => import('@pages/workspace/check-workspace-status/check-workspace-status.module').then( mod => mod.CheckWorkspaceStatusModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.WELCOME, loadChildren: () => import('@pages/workspace/welcome/welcome.module').then( mod => mod.WelcomeModule), canActivate: [UserAuthenticatedGuard] },

    // error
    { path: ROUTES_NAME.NOT_AUTHENTICATED, loadChildren: () => import('@pages/error/not-authenticated/not-authenticated.module').then( mod => mod.NotAuthenticatedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
