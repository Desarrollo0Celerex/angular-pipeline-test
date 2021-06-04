import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROLES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { UserAuthorizedGuard } from '@guards/user-authorized.guard';
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

            // Contacts routes
            { path: ROUTES_NAME.createContact(':contactTypeId'), loadChildren: () => import('@pages/home/contacts/create-contact/create-contact.module').then( mod => mod.CreateContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.changeContact(':contactId', ':policyId', ':contactTypeId', ':actionType'), loadChildren: () => import('@pages/home/contacts/change-contact/change-contact.module').then( mod => mod.ChangeContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactCoincidences, loadChildren: () => import('@pages/home/contacts/list-contact-coincidences/list-contact-coincidences.module').then( mod => mod.ListContactCoincidencesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/contact-profile/contact-profile.module').then(mod => mod.ContactProfileModule) },

            // Error routes
            { path: ROUTES_NAME.accessDenied, loadChildren: () => import('@pages/home/errors/access-denied/access-denied.module').then(mod => mod.AccessDeniedModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Files routes
            { path: ROUTES_NAME.uploadContactFile(':contactId'), loadChildren: () => import('@pages/home/contact-files/upload-contact-file/upload-contact-file.module').then(mod => mod.UploadContactFileModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updateContactFile(':contactId', ':contactFileId'), loadChildren: () => import('@pages/home/contact-files/update-contact-file/update-contact-file.module').then(mod => mod.UpdateContactFileModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Invitations routes
            { path: ROUTES_NAME.listInvitations, loadChildren: () => import('@pages/home/invitations/list-invitations/list-invitations.module').then(mod => mod.ListInvitationsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard, UserAuthorizedGuard], data: { roles: [ROLES.GLOBAL_ADMIN, ROLES.WALLET_MANAGER] } },

            // Leads routes
            { path: ROUTES_NAME.listLeads, loadChildren: () => import('@pages/home/leads/list-leads/list-leads.module').then(mod => mod.ListLeadsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Payments routes
            { path: ROUTES_NAME.listPayments, loadChildren: () => import('@pages/home/payments/list-payments/list-payments.module').then(mod => mod.ListPaymentsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.paymentHistory(':contactId', ':policyId', ':paymentId'), loadChildren: () => import('@pages/home/payments/payment-history/payment-history.module').then(mod => mod.PaymentHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Policies routes
            { path: ROUTES_NAME.createPolicy(':contactId'), loadChildren: () => import('@pages/home/policies/create-policy/create-policy.module').then(mod => mod.CreatePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.uploadPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/upload-policy/upload-policy.module').then(mod => mod.UploadPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.completePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/complete-policy/complete-policy.module').then(mod => mod.CompletePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updatePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/update-policy/update-policy.module').then(mod => mod.UpdatePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.endorsePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/endorse-policy/endorse-policy.module').then(mod => mod.EndorsePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.cancelPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/cancel-policy/cancel-policy.module').then(mod => mod.CancelPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showHistoryPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/show-history-policy/show-history-policy.module').then(mod => mod.ShowHistoryPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showPolicySinisters(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/show-policy-sinisters/show-policy-sinisters.module').then(mod => mod.ShowPolicySinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Quotations routes
            { path: ROUTES_NAME.createQuotation(':contactId'), loadChildren: () => import('@pages/home/quotations/create-quotation/create-quotation.module').then(mod => mod.CreateQuotationModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Sinisters routes
            { path: ROUTES_NAME.listSinisters, loadChildren: () => import('@pages/home/sinisters/list-sinisters/list-sinisters.module').then(mod => mod.ListSinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showSinisterHistory(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/show-sinister-history/show-sinister-history.module').then(mod => mod.ShowSinisterHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.finalizeSinister(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/finalize-sinister/finalize-sinister.module').then(mod => mod.FinalizeSinisterModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.reactivateSinister(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/reactivate-sinister/reactivate-sinister.module').then(mod => mod.ReactivateSinisterModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Searches routes
            { path: ROUTES_NAME.listSearchResults, loadChildren: () => import('@pages/home/searches/list-search-results/list-search-results.module').then(mod => mod.ListSearchResultsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
