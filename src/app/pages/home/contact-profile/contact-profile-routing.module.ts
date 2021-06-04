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
            { path: ROUTES_NAME.listContactQuotations(':contactId'), loadChildren: () => import('@pages/home/contact-profile/list-quotations/list-quotations.module').then(mod => mod.ListQuotationsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactPolicies(':contactId'), loadChildren: () => import('@pages/home/contact-profile/list-policies/list-policies.module').then(mod => mod.ListPoliciesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactFiles(':contactId'), loadChildren: () => import('@pages/home/contact-profile/list-files/list-files.module').then(mod => mod.ListFilesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactSinisters(':contactId'), loadChildren: () => import('@pages/home/contact-profile/list-sinisters/list-sinisters.module').then(mod => mod.ListSinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showContactData(':contactId'), loadChildren: () => import('@pages/home/contact-profile/show-contact-data/show-contact-data.module').then(mod => mod.ShowContactDataModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactProfileRoutingModule { }
