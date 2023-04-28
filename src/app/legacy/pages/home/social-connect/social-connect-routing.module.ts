import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { SocialConnectLayout } from './social-connect.layout';

const routes: Routes = [{
    path: '',
    component: SocialConnectLayout,
    children: [
        { path: ROUTES_NAME.socialConnect, redirectTo: ROUTES_NAME.socialConnectResume, pathMatch: 'full'  },
        { path: ROUTES_NAME.socialConnectCardium, loadChildren: () => import('@pages/home/social-connect/cardium/cardium.module').then( mod => mod.CardiumModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectFacebook, loadChildren: () => import('@pages/home/social-connect/facebook/facebook.module').then( mod => mod.FacebookModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectInstagram, loadChildren: () => import('@pages/home/social-connect/instagram/instagram.module').then( mod => mod.InstagramModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectLinkedin, loadChildren: () => import('@pages/home/social-connect/linkedin/linkedin.module').then( mod => mod.LinkedinModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectResume, loadChildren: () => import('@pages/home/social-connect/resume/resume.module').then( mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectTiktok, loadChildren: () => import('@pages/home/social-connect/tiktok/tiktok.module').then( mod => mod.TiktokModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.socialConnectTwitter, loadChildren: () => import('@pages/home/social-connect/twitter/twitter.module').then( mod => mod.TwitterModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialConnectRoutingModule { }
