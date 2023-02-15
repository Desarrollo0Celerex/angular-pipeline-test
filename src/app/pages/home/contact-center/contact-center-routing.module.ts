import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { ContactCenterLayout } from './contact-center.layout';

const routes: Routes = [{
    path: '',
    component: ContactCenterLayout,
    children: [
      { path: ROUTES_NAME.contactCenterResume, loadChildren: () => import('@pages/home/contact-center/resume/resume.module').then(mod => mod.ResumeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.contactCenterAdvisory, loadChildren: () => import('@pages/home/contact-center/advisory/advisory.module').then(mod => mod.AdvisoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
      { path: ROUTES_NAME.contactCenterPayments, loadChildren: () => import('@pages/home/contact-center/payments/payments.module').then(mod => mod.PaymentsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactCenterRoutingModule { }
