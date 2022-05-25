import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { PartnerProfileLayout } from './partner-profile.layout';

const routes: Routes = [{
    path: '',
    component: PartnerProfileLayout,
    children: [
        { path: ROUTES_NAME.partnerResume(':partnerId'), loadChildren: () => import('@pages/home/partner-profile/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.partnerClients(':partnerId'), loadChildren: () => import('@pages/home/partner-profile/clients/clients.module').then(mod => mod.ClientsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.partnerPolicies(':partnerId'), loadChildren: () => import('@pages/home/partner-profile/policies/policies.module').then(mod => mod.PoliciesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        { path: ROUTES_NAME.partnerSinisters(':partnerId'), loadChildren: () => import('@pages/home/partner-profile/sinisters/sinisters.module').then(mod => mod.SinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerProfileRoutingModule { }
