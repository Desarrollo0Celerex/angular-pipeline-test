import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            // Data routes
            { path: ROUTES_NAME.dashboard, loadChildren: () => import('@pages/home/data/dashboard/dashboard.module').then( mod => mod.DashboardModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Clients routes
            { path: ROUTES_NAME.listClients, loadChildren: () => import('@pages/home/clients/list-clients/list-clients.module').then( mod => mod.ListClientsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.clientSearchResults, loadChildren: () => import('@pages/home/clients/client-search-results/client-search-results.module').then( mod => mod.ClientSearchResultsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Contacts routes
            { path: ROUTES_NAME.createContact(':contactTypeId'), loadChildren: () => import('@pages/home/contacts/create-contact/create-contact.module').then( mod => mod.CreateContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/contact-profile/contact-profile.module').then(mod => mod.ContactProfileModule) },

            // Insurances routes
            { path: ROUTES_NAME.listInsurances(':contactId'), loadChildren: () => import('@pages/home/insurances/list-insurances/list-insurances.module').then(mod => mod.ListInsurancesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Invitations routes
            { path: ROUTES_NAME.listInvitations, loadChildren: () => import('@pages/home/invitations/list-invitations/list-invitations.module').then(mod => mod.ListInvitationsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Leads routes
            { path: ROUTES_NAME.listLeads, loadChildren: () => import('@pages/home/leads/list-leads/list-leads.module').then(mod => mod.ListLeadsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.leadSearchResults, loadChildren: () => import('@pages/home/leads/lead-search-results/lead-search-results.module').then(mod => mod.LeadSearchResultsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Policies routes
            { path: ROUTES_NAME.uploadPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/upload-policy/upload-policy.module').then(mod => mod.UploadPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.completePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/complete-policy/complete-policy.module').then(mod => mod.CompletePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updatePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/update-policy/update-policy.module').then(mod => mod.UpdatePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
