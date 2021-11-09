import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { GroupProfileLayout } from './group-profile.layout';

const routes: Routes = [{
    path: '',
    component: GroupProfileLayout,
    children: [
        { path: ROUTES_NAME.groupResume(':groupId'), loadChildren: () => import('@pages/home/group-profile/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupProfileRoutingModule { }
