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
        { path: ROUTES_NAME.partnerResume(':partnerId'), loadChildren: () => import('@pages/home/partner-profile/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerProfileRoutingModule { }
