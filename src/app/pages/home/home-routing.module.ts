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
            // Clients routes
            { path: ROUTES_NAME.listClients, loadChildren: () => import('@pages/home/clients/list-clients/list-clients.module').then( mod => mod.ListClientsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Contacts routes
            { path: ROUTES_NAME.createContact(':contactTypeId'), loadChildren: () => import('@pages/home/contacts/create-contact/create-contact.module').then( mod => mod.CreateContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.changeContact(':contactId', ':policyId', ':contactTypeId', ':actionType'), loadChildren: () => import('@pages/home/contacts/change-contact/change-contact.module').then( mod => mod.ChangeContactModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContactCoincidences, loadChildren: () => import('@pages/home/contacts/list-contact-coincidences/list-contact-coincidences.module').then( mod => mod.ListContactCoincidencesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listContacts, loadChildren: () => import('@pages/home/contacts/list-contacts/list-contacts.module').then( mod => mod.ListContactsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/contact-profile/contact-profile.module').then(mod => mod.ContactProfileModule) },

            // Data routes
            { path: ROUTES_NAME.dashboard, loadChildren: () => import('@pages/home/data/dashboard/dashboard.module').then( mod => mod.DashboardModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Error routes
            { path: ROUTES_NAME.accessDenied, loadChildren: () => import('@pages/home/errors/access-denied/access-denied.module').then(mod => mod.AccessDeniedModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // External policies routes
            { path: ROUTES_NAME.updateExternalPolicy(':contactId', ':externalPolicyId'), loadChildren: () => import('@pages/home/external-policies/update-external-policy/update-external-policy.module').then(mod => mod.UpdateExternalPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listExternalPolicies, loadChildren: () => import('@pages/home/external-policies/list-external-policies/list-external-policies.module').then(mod => mod.ListExternalPoliciesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Groups routes
            { path: ROUTES_NAME.listGroups, loadChildren: () => import('@pages/home/groups/list-groups/list-groups.module').then(mod => mod.ListGroupsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.groupCoincidences, loadChildren: () => import('@pages/home/groups/group-coincidences/group-coincidences.module').then(mod => mod.GroupCoincidencesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/group-profile/group-profile.module').then(mod => mod.GroupProfileModule) },

            // Files routes
            { path: ROUTES_NAME.uploadContactFile(':contactId'), loadChildren: () => import('@pages/home/contact-files/upload-contact-file/upload-contact-file.module').then(mod => mod.UploadContactFileModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updateContactFile(':contactId', ':contactFileId'), loadChildren: () => import('@pages/home/contact-files/update-contact-file/update-contact-file.module').then(mod => mod.UpdateContactFileModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Invitations routes
            { path: ROUTES_NAME.listInvitations, loadChildren: () => import('@pages/home/invitations/list-invitations/list-invitations.module').then(mod => mod.ListInvitationsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard, UserAuthorizedGuard], data: { roles: [ROLES.GLOBAL_ADMIN, ROLES.WALLET_MANAGER] } },

            // Leads routes
            { path: ROUTES_NAME.listLeads, loadChildren: () => import('@pages/home/leads/list-leads/list-leads.module').then(mod => mod.ListLeadsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceLeadsConvertedByRange, loadChildren: () => import('@pages/home/leads/workspace-leads-converted-by-range/workspace-leads-converted-by-range.module').then(mod => mod.WorkspaceLeadsConvertedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/leads/leads.module').then(mod => mod.LeadsModule) },

            // Partners routes
            { path: ROUTES_NAME.listPartners, loadChildren: () => import('@pages/home/partners/list-partners/list-partners.module').then(mod => mod.ListPartnersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.partnerCoincidences, loadChildren: () => import('@pages/home/partners/partner-coincidences/partner-coincidences.module').then(mod => mod.PartnerCoincidencesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/partner-profile/partner-profile.module').then(mod => mod.PartnerProfileModule) },

            // Payments routes
            { path: ROUTES_NAME.listPayments, loadChildren: () => import('@pages/home/payments/list-payments/list-payments.module').then(mod => mod.ListPaymentsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.paymentHistory(':contactId', ':policyId', ':paymentId'), loadChildren: () => import('@pages/home/payments/payment-history/payment-history.module').then(mod => mod.PaymentHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.pendingReceipts(':contactId', ':policyId', ':paymentId'), loadChildren: () => import('@pages/home/payments/pending-receipts/pending-receipts.module').then(mod => mod.PendingReceiptsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.policyReceiptsPaid(':contactId', ':policyId', ':paymentId'), loadChildren: () => import('@pages/home/payments/policy-receipts-paid/policy-receipts-paid.module').then(mod => mod.PolicyReceiptsPaidModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.paymentCalendar, loadChildren: () => import('@pages/home/payments/calendar/calendar.module').then(mod => mod.CalendarModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.contactPendingPaymentsByRange(':contactId', ':rangeStart', ':rangeEnd'), loadChildren: () => import('@pages/home/payments/contact-pending-payments-by-range/contact-pending-payments-by-range.module').then(mod => mod.ContactPendingPaymentsByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.contactReceiptsAppliedByRange(':contactId', ':rangeStart', ':rangeEnd'), loadChildren: () => import('@pages/home/payments/contact-receipts-applied-by-range/contact-receipts-applied-by-range.module').then(mod => mod.ContactReceiptsAppliedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceReceiptsPaidByRange, loadChildren: () => import('@pages/home/payments/workspace-receipts-paid-by-range/workspace-receipts-paid-by-range.module').then(mod => mod.WorkspaceReceiptsPaidByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceReceiptsPendingByRange, loadChildren: () => import('@pages/home/payments/workspace-receipts-pending-by-range/workspace-receipts-pending-by-range.module').then(mod => mod.WorkspaceReceiptsPendingByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Policies routes
            { path: ROUTES_NAME.createPolicy(':contactId'), loadChildren: () => import('@pages/home/policies/create-policy/create-policy.module').then(mod => mod.CreatePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.uploadPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/upload-policy/upload-policy.module').then(mod => mod.UploadPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.completePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/complete-policy/complete-policy.module').then(mod => mod.CompletePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.endorsePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/endorse-policy/endorse-policy.module').then(mod => mod.EndorsePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.cancelPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/cancel-policy/cancel-policy.module').then(mod => mod.CancelPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showHistoryPolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/show-history-policy/show-history-policy.module').then(mod => mod.ShowHistoryPolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showPolicySinisters(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/show-policy-sinisters/show-policy-sinisters.module').then(mod => mod.ShowPolicySinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updateCompletePolicy(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policies/update-complete-policy/update-complete-policy.module').then(mod => mod.UpdateCompletePolicyModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.contactPendingRenewalsByRange(':contactId', ':rangeStart', ':rangeEnd'), loadChildren: () => import('@pages/home/policies/contact-pending-renewals-by-range/contact-pending-renewals-by-range.module').then( mod => mod.ContactPendingRenewalsByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.contactAppliedRenewalsByRange(':contactId', ':rangeStart', ':rangeEnd'), loadChildren: () => import('@pages/home/policies/contact-applied-renewals-by-range/contact-applied-renewals-by-range.module').then( mod => mod.ContactAppliedRenewalsByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listActivePoliciesByRange, loadChildren: () => import('@pages/home/policies/list-active-policies-by-range/list-active-policies-by-range.module').then( mod => mod.ListActivePoliciesByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listIncompletePolicies, loadChildren: () => import('@pages/home/policies/list-incomplete-policies/list-incomplete-policies.module').then( mod => mod.ListIncompletePoliciesModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listPolicyInsureds(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policy-insureds/list-policy-insureds/list-policy-insureds.module').then( mod => mod.ListPolicyInsuredsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.updatePolicyInsured(':contactId', ':policyId', ':policyInsuredId'), loadChildren: () => import('@pages/home/policy-insureds/update-policy-insured/update-policy-insured.module').then( mod => mod.UpdatePolicyInsuredModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.createPolicyInsured(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policy-insureds/create-policy-insured/create-policy-insured.module').then( mod => mod.CreatePolicyInsuredModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.importPolicyInsureds(':contactId', ':policyId'), loadChildren: () => import('@pages/home/policy-insureds/import-policy-insureds/import-policy-insureds.module').then( mod => mod.ImportPolicyInsuredsModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspacePoliciesPending, loadChildren: () => import('@pages/home/policies/workspace-policies-pending/workspace-policies-pending.module').then( mod => mod.WorkspacePoliciesPendingModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspacePoliciesCanceledByRange, loadChildren: () => import('@pages/home/policies/workspace-policies-canceled-by-range/workspace-policies-canceled-by-range.module').then( mod => mod.WorkspacePoliciesCanceledByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspacePoliciesIssuedByRange, loadChildren: () => import('@pages/home/policies/workspace-policies-issued-by-range/workspace-policies-issued-by-range.module').then( mod => mod.WorkspacePoliciesIssuedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Policy endorsements routes
            { path: ROUTES_NAME.policyEndorsementsHistory(':contactId', ':policyId'), loadChildren: () => import('@pages/home/endorsements/policy-endorsements-history/policy-endorsements-history.module').then(mod => mod.PolicyEndorsementsHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Quotations routes
            { path: ROUTES_NAME.createQuotation(':contactId'), loadChildren: () => import('@pages/home/quotations/create-quotation/create-quotation.module').then(mod => mod.CreateQuotationModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.listQuotationsByRange, loadChildren: () => import('@pages/home/quotations/list-quotations-by-range/list-quotations-by-range.module').then(mod => mod.ListQuotationsByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceQuotationsClosedByRange, loadChildren: () => import('@pages/home/quotations/workspace-quotations-closed-by-range/workspace-quotations-closed-by-range.module').then(mod => mod.WorkspaceQuotationsClosedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceQuotationsOpenedByRange, loadChildren: () => import('@pages/home/quotations/workspace-quotations-opened-by-range/workspace-quotations-opened-by-range.module').then(mod => mod.WorkspaceQuotationsOpenedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            
            // Renewals routes
            { path: ROUTES_NAME.policyRenewalHistory(':contactId', ':policyId'), loadChildren: () => import('@pages/home/renewals/policy-renewal-history/policy-renewal-history.module').then(mod => mod.PolicyRenewalHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.policyRenewalsApplied(':contactId', ':policyId'), loadChildren: () => import('@pages/home/renewals/policy-renewals-applied/policy-renewals-applied.module').then(mod => mod.PolicyRenewalsAppliedModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceRenewalsAppliedByRange, loadChildren: () => import('@pages/home/renewals/workspace-renewals-applied-by-range/workspace-renewals-applied-by-range.module').then(mod => mod.WorkspaceRenewalsAppliedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceRenewalsPendingByRange, loadChildren: () => import('@pages/home/renewals/workspace-renewals-pending-by-range/workspace-renewals-pending-by-range.module').then(mod => mod.WorkspaceRenewalsPendingByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            
            // Sinisters routes
            { path: ROUTES_NAME.listSinisters, loadChildren: () => import('@pages/home/sinisters/list-sinisters/list-sinisters.module').then(mod => mod.ListSinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showSinisterHistory(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/show-sinister-history/show-sinister-history.module').then(mod => mod.ShowSinisterHistoryModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showPolicyOpenSinisters(':contactId', ':policyId'), loadChildren: () => import('@pages/home/sinisters/show-policy-open-sinisters/show-policy-open-sinisters.module').then(mod => mod.ShowPolicyOpenSinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.showPolicyClosedSinisters(':contactId', ':policyId'), loadChildren: () => import('@pages/home/sinisters/show-policy-closed-sinisters/show-policy-closed-sinisters.module').then(mod => mod.ShowPolicyClosedSinistersModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.finalizeSinister(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/finalize-sinister/finalize-sinister.module').then(mod => mod.FinalizeSinisterModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.reactivateSinister(':contactId', ':policyId', ':sinisterId'), loadChildren: () => import('@pages/home/sinisters/reactivate-sinister/reactivate-sinister.module').then(mod => mod.ReactivateSinisterModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.insuranceSinistersByRange, loadChildren: () => import('@pages/home/sinisters/insurance-sinisters-by-range/insurance-sinisters-by-range.module').then(mod => mod.InsuranceSinistersByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceSinistersClosedByRange, loadChildren: () => import('@pages/home/sinisters/workspace-sinisters-closed-by-range/workspace-sinisters-closed-by-range.module').then(mod => mod.WorkspaceSinistersClosedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.workspaceSinistersOpenedByRange, loadChildren: () => import('@pages/home/sinisters/workspace-sinisters-opened-by-range/workspace-sinisters-opened-by-range.module').then(mod => mod.WorkspaceSinistersOpenedByRangeModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },

            // Stats routes
            { path: '', loadChildren: () => import('@pages/home/stats/stats.module').then(mod => mod.StatsModule) },

            // Wallet routes
            { path: ROUTES_NAME.createWallet, loadChildren: () => import('@pages/home/wallet/create-wallet/create-wallet.module').then(mod => mod.CreateWalletModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: ROUTES_NAME.launchApp(':walletId'), loadChildren: () => import('@pages/home/wallet/launch-app/launch-app.module').then(mod => mod.LaunchAppModule), canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard] },
            { path: '', loadChildren: () => import('@pages/home/wallet/wallet.module').then(mod => mod.WalletModule) },

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
