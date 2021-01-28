import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

const routes: Routes = [
    { path: '', redirectTo: ROUTES_NAME.login, pathMatch: 'full' },

    // auth
    { path: ROUTES_NAME.login, loadChildren: () => import('@pages/auth/login/login.module').then( mod => mod.LoginModule) },
    { path: ROUTES_NAME.identify_user(':authToken'), loadChildren: () => import('@pages/auth/identify-user/identify-user.module').then( mod => mod.IdentifyUserModule) },

    // data
    { path: ROUTES_NAME.dashboard, loadChildren: () => import('@pages/data/dashboard/dashboard.module').then( mod => mod.DashboardModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

    // Home
    { path: '', loadChildren: () => import('@pages/home/home.module').then(mod => mod.HomeModule) },

    // workspace
    { path: ROUTES_NAME.checkWorkspaceStatus, loadChildren: () => import('@pages/workspace/check-workspace-status/check-workspace-status.module').then( mod => mod.CheckWorkspaceStatusModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.welcome, loadChildren: () => import('@pages/workspace/welcome/welcome.module').then( mod => mod.WelcomeModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.createWorkspace, loadChildren: () => import('@pages/workspace/create-workspace/create-workspace.module').then(mod => mod.CreateWorkspaceModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.uploadWorkspaceAvatar, loadChildren: () => import('@pages/workspace/upload-workspace-avatar/upload-workspace-avatar.module').then(mod => mod.UploadWorkspaceAvatarModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.activateWorkspace, loadChildren: () => import('@pages/workspace/activate-workspace/activate-workspace.module').then(mod => mod.ActivateWorkspaceModule), canActivate: [UserAuthenticatedGuard] },

    // error
    { path: ROUTES_NAME.notFound, loadChildren: () => import('@pages/error/not-found/not-found.module').then( mod => mod.NotFoundModule) },
    { path: ROUTES_NAME.notAuthenticated, loadChildren: () => import('@pages/error/not-authenticated/not-authenticated.module').then( mod => mod.NotAuthenticatedModule) },

    { path: '**', redirectTo: ROUTES_NAME.notFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
