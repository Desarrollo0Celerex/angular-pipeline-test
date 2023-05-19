import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { AppCreatorLayout } from './app-creator.layout';

const routes: Routes = [{
    path: '',
    component: AppCreatorLayout,
    children: [
      { path: ROUTES_NAME.appCreator, redirectTo: ROUTES_NAME.appCreatorResume, pathMatch: 'full' },
      { path: ROUTES_NAME.appCreatorResume, loadChildren: () => import('@pages/home/app-creator/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.appCreatorIdentity, loadChildren: () => import('@pages/home/app-creator/identity/identity.module').then(mod => mod.IdentityModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.appCreatorIcon, loadChildren: () => import('@pages/home/app-creator/icon/icon.module').then(mod => mod.IconModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.appCreatorTheme, loadChildren: () => import('@pages/home/app-creator/theme/theme.module').then(mod => mod.ThemeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.appCreatorLaunch, loadChildren: () => import('@pages/home/app-creator/launch/launch.module').then(mod => mod.LaunchModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCreatorRoutingModule { }
