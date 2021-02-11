import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { ContactProfilePage } from './contact-profile.page';

const routes: Routes = [
    {
        path: '', component:
        ContactProfilePage,
        children: [
            { path: ROUTES_NAME.contactResume(':contactId'), loadChildren: () => import('@pages/home/contact-profile/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactQuotations(':contactId'), loadChildren: () => import('@pages/home/contact-profile/list-quotations/list-quotations.module').then(mod => mod.ListQuotationsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactProfileRoutingModule { }
