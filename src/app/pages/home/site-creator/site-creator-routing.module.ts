import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { SiteCreatorLayout } from './site-creator.layout';

const routes: Routes = [{
    path: '',
    component: SiteCreatorLayout,
    children: [
        { path: ROUTES_NAME.siteCreator, redirectTo: ROUTES_NAME.siteCreatorResume, pathMatch: 'full'  },
        { path: ROUTES_NAME.siteCreatorResume, loadChildren: () => import('@pages/home/site-creator/resume/resume.module').then( mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.siteCreatorIdentity, loadChildren: () => import('@pages/home/site-creator/identity/identity.module').then( mod => mod.IdentityModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.siteCreatorIcon, loadChildren: () => import('@pages/home/site-creator/icon/icon.module').then( mod => mod.IconModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.siteCreatorTheme, loadChildren: () => import('@pages/home/site-creator/theme/theme.module').then( mod => mod.ThemeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteCreatorRoutingModule { }
