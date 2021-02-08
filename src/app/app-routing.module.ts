import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';

const routes: Routes = [
    { path: '', redirectTo: ROUTES_NAME.login, pathMatch: 'full' },

    // Auth routes
    { path: ROUTES_NAME.login, loadChildren: () => import('@pages/auth/login/login.module').then( mod => mod.LoginModule) },
    { path: ROUTES_NAME.identify_user(':authToken'), loadChildren: () => import('@pages/auth/identify-user/identify-user.module').then( mod => mod.IdentifyUserModule) },

    // Errors routes
    { path: ROUTES_NAME.notFound, loadChildren: () => import('@pages/errors/not-found/not-found.module').then( mod => mod.NotFoundModule) },
    { path: ROUTES_NAME.notAuthenticated, loadChildren: () => import('@pages/errors/not-authenticated/not-authenticated.module').then( mod => mod.NotAuthenticatedModule) },
    { path: ROUTES_NAME.workspaceNotActivated, loadChildren: () => import('@pages/errors/workspace-not-activated/workspace-not-activated.module').then( mod => mod.WorkspaceNotActivatedModule) },
    { path: ROUTES_NAME.invalidExpressToken, loadChildren: () => import('@pages/errors/invalid-express-token/invalid-express-token.module').then( mod => mod.InvalidExpressTokenModule) },

    // Express routes
    { path: ROUTES_NAME.expressContact(':expressToken'), loadChildren: () => import('@pages/express/express-contact/express-contact.module').then(mod => mod.ExpressContactModule) },

    // Home routes
    { path: '', loadChildren: () => import('@pages/home/home.module').then(mod => mod.HomeModule) },

    // Invitations routes
    { path: ROUTES_NAME.acceptInvitation(':invitationToken'), loadChildren: () => import('@pages/invitations/accept-invitation/accept-invitation.module').then( mod => mod.AcceptInvitationModule), canActivate: [UserAuthenticatedGuard] },

    // Workspaces routes
    { path: ROUTES_NAME.checkWorkspaceStatus, loadChildren: () => import('@pages/workspaces/check-workspace-status/check-workspace-status.module').then( mod => mod.CheckWorkspaceStatusModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.welcome, loadChildren: () => import('@pages/workspaces/welcome/welcome.module').then( mod => mod.WelcomeModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.createWorkspace, loadChildren: () => import('@pages/workspaces/create-workspace/create-workspace.module').then(mod => mod.CreateWorkspaceModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.uploadWorkspaceAvatar, loadChildren: () => import('@pages/workspaces/upload-workspace-avatar/upload-workspace-avatar.module').then(mod => mod.UploadWorkspaceAvatarModule), canActivate: [UserAuthenticatedGuard] },
    { path: ROUTES_NAME.activateWorkspace, loadChildren: () => import('@pages/workspaces/activate-workspace/activate-workspace.module').then(mod => mod.ActivateWorkspaceModule), canActivate: [UserAuthenticatedGuard] },

    { path: '**', redirectTo: ROUTES_NAME.notFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
