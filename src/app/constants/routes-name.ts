const AUTH_ROUTES = {
    login: 'auth/login',
    identify_user: (authToken: string) => `auth/identify-user/${authToken}`
}

const CHANGELOG_ROUTES = {
    changelog: 'changelog'
}

const ERRORS_ROUTES = {
    notFound: 'errors/not-found',
    notAuthenticated: 'errors/not-authenticated',
    workspaceNotActivated: 'errors/workspace-not-activated',
    invalidExpressToken: 'errors/invalid-express-token',
    contactNotFound: 'error/contact-not-found'
}

const EXPRESS_ROUTES = {
    expressContact: (expressToken: string) => `express/express-contact/${expressToken}`
}

const HOME_APP_CREATOR_ROUTES = {
    appCreator: 'app-creator',
    appCreatorResume: 'app-creator/resume',
    appCreatorIdentity: 'app-creator/identity',
    appCreatorIcon: 'app-creator/icon',
    appCreatorTheme: 'app-creator/theme'
}

const HOME_CLIENTS_ROUTES = {
    listClients: 'workspace/clients/list-clients',
    workspaceClientsConvertedByRange: 'workspace-clients-converted-by-range',
}

const HOME_CONTACTS_ROUTES = {
    createContact: (contactTypeId: string) => `workspace/contacts/create-contact/${contactTypeId}`,
    changeContact: (contactId: string, policyId: string, contactTypeId: string, actionType: string) => `workspace/contacts/change-contact/${contactId}/${policyId}/${contactTypeId}/${actionType}`,
    contactSearchResults: () => `workspace/contacts/contact-search-results`,
    listContactCoincidences: `workspace/contacts/list-contact-coincidences`,
    listContacts: `workspace/contacts/list-contacts`
}

const HOME_CONTACT_CENTER_ROUTES = {
    contactCenter: 'contact-center',
    contactCenterResume: 'contact-center/resume',
    contactCenterAdvisory: 'contact-center/advisory',
    contactCenterPayments: 'contact-center/payments',
    contactCenterSinisters: 'contact-center/sinisters',
    contactCenterSupport: 'contact-center/support',
}

const HOME_CONTACT_FILES_ROUTES = {
    uploadContactFile: (contactId: string) => `workspace/files/upload-contact-file/${contactId}`,
    updateContactFile: (contactId: string, contactFileId: string) => `workspace/files/upload-contact-file/${contactId}/${contactFileId}`,
}

const HOME_CONTACT_PROFILE_ROUTES = {
    contactResume: (contactId: string) => `workspace/contact-profile/${contactId}/resume`,
    listContactQuotations: (contactId: string) => `workspace/contact-profile/${contactId}/list-quotations`,
    listContactPolicies: (contactId: string) => `workspace/contact-profile/${contactId}/list-policies`,
    listContactSinisters: (contactId: string) => `workspace/contact-profile/${contactId}/list-sinisters`,
    showContactData: (contactId: string) => `workspace/contact-profile/${contactId}/show-contact-data`,
    listContactFiles: (contactId: string) => `workspace/contact-profile/${contactId}/list-files`
}

const HOME_DATA_ROUTES = {
    dashboard: 'workspace/data/dashboard',
}

const HOME_ERRORS_ROUTES = {
    accessDenied: 'workspace/errors/access-denied'
}

const HOME_EXTERNAL_POLICIES_ROUTES = {
    updateExternalPolicy: (contactId: string, externalPolicyId: string) => `workspace/external-policies/update-external-policy/${contactId}/${externalPolicyId}`,
    listExternalPolicies: `workspace/external-policies`
}

const HOME_GROUPS_ROUTES = {
    listGroups: 'workspace/groups/list-groups',
    groupCoincidences: 'workspace/groups/coincidences',
}

const HOME_GROUP_PROFILE_ROUTES = {
    groupResume: (groupId: string) => `workspace/group-profile/${groupId}/resume`,
    groupMembers: (groupId: string) => `workspace/group-profile/${groupId}/members`,
    groupPolicies: (groupId: string) => `workspace/group-profile/${groupId}/policies`,
    groupSinisters: (groupId: string) => `workspace/group-profile/${groupId}/sinisters`,
}

const HOME_INVITATIONS_ROUTES = {
    listInvitations: 'workspace/invitations/list-invitations'
}

const HOME_LEADS_ROUTES = {
    listLeads: 'workspace/leads/list-leads',
    channels: 'workspace/leads/channels',
    workspaceLeadsConvertedByRange: 'workspace-leads-converted-by-range',
}

const HOME_PARTNER_ROUTES = {
    listPartners: `workspace/partners/list-partners`,
    partnerCoincidences: `workspace/partners/coincidences`,
}

const HOME_PARTNER_PROFILE_ROUTES = {
    partnerResume: (partnerId: string) => `workspace/partner-profile/${partnerId}/resume`,
    partnerClients: (partnerId: string) => `workspace/partner-profile/${partnerId}/clients`,
    partnerPolicies: (partnerId: string) => `workspace/partner-profile/${partnerId}/policies`,
    partnerSinisters: (partnerId: string) => `workspace/partner-profile/${partnerId}/sinisters`,
}

const HOME_PAYMENTS_ROUTES = {
    listPayments: `workspace/payments/list-payments`,
    paymentHistory: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/payment-history/${contactId}/${policyId}/${paymentId}`,
    pendingReceipts: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/pending-receipts/${contactId}/${policyId}/${paymentId}`,
    policyReceiptsPaid: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/policy-receipts-paid/${contactId}/${policyId}/${paymentId}`,
    paymentCalendar: `workspace/payments/calendar`,
    contactPendingPaymentsByRange: (contactId: string, rangeStart: string, rangeEnd: string) => `workspace/payments/contact-pending-payments-by-range/${contactId}/${rangeStart}/${rangeEnd}`,
    contactReceiptsAppliedByRange: (contactId: string, rangeStart: string, rangeEnd: string) => `workspace/payments/contact-receipts-applied-by-range/${contactId}/${rangeStart}/${rangeEnd}`,
    workspaceReceiptsPaidByRange: `workspace-receipts-paid-by-range`,
    workspaceReceiptsPendingByRange: `workspace-receipts-pending-by-range`,
}

const HOME_POLICIES_ROUTES = {
    createPolicy: (contactId: string) => `workspace/policies/create-policy/${contactId}`,
    uploadPolicy: (contactId: string, policyId: string) => `workspace/policies/upload-policy/${contactId}/${policyId}`,
    completePolicy: (contactId: string, policyId: string) => `workspace/policies/complete-policy/${contactId}/${policyId}`,
    endorsePolicy: (contactId: string, policyId: string) => `workspace/policies/endorse-policy/${contactId}/${policyId}`,
    cancelPolicy: (contactId: string, policyId: string) => `workspace/policies/cancel-policy/${contactId}/${policyId}`,
    showHistoryPolicy: (contactId: string, policyId: string) => `workspace/policies/history-policy/${contactId}/${policyId}`,
    showPolicySinisters: (contactId: string, policyId: string) => `workspace/policies/policy-sinisters/${contactId}/${policyId}`,
    updateCompletePolicy: (contactId: string, policyId: string) => `workspace/policies/update-policy/${contactId}/${policyId}`,
    policyTracker: (contactId: string, policyId: string) => `workspace/policies/policy-tracker/${contactId}/${policyId}`,
    listActivePoliciesByRange: `workspace/policies/list-active-policies-by-range`,
    listIncompletePolicies: `workspace/policies/list-incomplete-policies`,
    workspacePoliciesPending: `workspace/policies/workspace-policies-pending`,
    renewals: 'workspace/policies/renewals',
    renewalsWithRanges: (rangeStart: string, rangeEnd: string) => `workspace/policies/renewals/${rangeStart}/${rangeEnd}`,
    contactPendingRenewalsByRange: (contactId: string, rangeStart: string, rangeEnd: string) => `workspace/policies/contact-pending-renewals-by-range/${contactId}/${rangeStart}/${rangeEnd}`,
    contactAppliedRenewalsByRange: (contactId: string, rangeStart: string, rangeEnd: string) => `workspace/policies/contact-applied-renewals-by-range/${contactId}/${rangeStart}/${rangeEnd}`,
    listPolicyInsureds: (contactId: string, policyId: string) => `workspace/policy-insureds/list-policy-insureds/${contactId}/${policyId}`,
    updatePolicyInsured: (contactId: string, policyId: string, policyInsuredId: string) => `workspace/policy-insureds/update-policy-insured/${contactId}/${policyId}/${policyInsuredId}`,
    createPolicyInsured: (contactId: string, policyId: string) => `workspace/policy-insureds/create-policy-insured/${contactId}/${policyId}`,
    importPolicyInsureds: (contactId: string, policyId: string) => `workspace/policy-insureds/import-policy-insureds/${contactId}/${policyId}`,
    workspacePoliciesCanceledByRange: 'workspace-policies-canceled-by-range',
    workspacePoliciesIssuedByRange: 'workspace-policies-issued-by-range',
}

const HOME_POLICY_ENDORSEMENTS_ROUTES = {
    policyEndorsementsHistory: (contactId: string, policyId: string) => `workspace/policies/endorsements/history/${contactId}/${policyId}`,
}

const HOME_QUOTATIONS_ROUTES = {
    createQuotation: (contactId: string) => `workspace/quotations/create-quotation/${contactId}`,
    listQuotationsByRange: `workspace/quotations/list-quotations-by-range`,
    workspaceQuotationsClosedByRange: `workspace-quotations-closed-by-range`,
    workspaceQuotationsOpenedByRange: `workspace-quotations-opened-by-range`,
}

const HOME_RENEWALS_ROUTES = {
    policyRenewalHistory: (contactId: string, policyId: string) => `workspace/renewals/policy-renewal-history/${contactId}/${policyId}`,
    policyRenewalsApplied: (contactId: string, policyId: string) => `workspace/renewals/policy-renewals-applied/${contactId}/${policyId}`,
    workspaceRenewalsAppliedByRange: `workspace-renewals-applied-by-range`,
    workspaceRenewalsPendingByRange: `workspace-renewals-pending-by-range`,
}

const HOME_SINISTERS_ROUTES = {
    listSinisters: `workspace/sinisters/list-sinisters`,
    showSinisterHistory: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/sinister-history/${contactId}/${policyId}/${sinisterId}`,
    showPolicyOpenSinisters: (contactId: string, policyId: string) => `workspace/sinisters/policy-open-sinisters/${contactId}/${policyId}`,
    showPolicyClosedSinisters: (contactId: string, policyId: string) => `workspace/sinisters/policy-closed-sinisters/${contactId}/${policyId}`,
    finalizeSinister: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/finalize-sinister/${contactId}/${policyId}/${sinisterId}`,
    reactivateSinister: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/reactivate-sinister/${contactId}/${policyId}/${sinisterId}`,
    insuranceSinistersByRange: `workspace/sinisters/insurance-sinisters-by-range`,
    workspaceSinistersClosedByRange: `workspace-sinisters-closed-by-range`,
    workspaceSinistersOpenedByRange: `workspace-sinisters-opened-by-range`,
}

const HOME_SITE_CREATOR_ROUTES = {
    siteCreator: 'site-creator',
    siteCreatorResume: 'site-creator/resume',
    siteCreatorIdentity: 'site-creator/identity',
    siteCreatorIcon: 'site-creator/icon',
    siteCreatorTheme: 'site-creator/theme'
}

const HOME_STATS_ROUTES = {
    statsSnapshot: `workspace/stats/snapshot`,
    statsLeads: `workspace/stats/leads`,
    statsClients: `workspace/stats/clients`,
    statsPolicies: `workspace/stats/policies`,
    statsCollection: `workspace/stats/collection`,
    statsSinisters: `workspace/stats/sinisters`,
}

const HOME_WALLET_ROUTES = {
    createWallet: `workspace/wallet/create`,
    walletResume: (walletId: string) => `workspace/wallet/resume/${walletId}`,
    walletIdentity: (walletId: string) => `workspace/wallet/identity/${walletId}`,
    walletContact: (walletId: string) => `workspace/wallet/contact/${walletId}`,
    walletColors: (walletId: string) => `workspace/wallet/colors/${walletId}`,
    launchApp: (walletId: string) => `workspace/wallet/lounch/${walletId}`,
}

const INVITATIONS_ROUTES = {
    acceptInvitation: (invitationToken: string) => `invitations/accept-invitation/${invitationToken}`
}

const POLICY_SEARCH_ENGINE_ROUTES = {
    policySearchEngine: 'policy-search-engine'
}

const SEARCHES_ROUTES = {
    listSearchResults: 'workspace/searches/search-results'
}

const WELCOME_ROUTES = {
    workspaceWelcome: 'welcome'
}

const WORKSPACES_ROUTES = {
    checkWorkspaceStatus: 'workspaces/check-workspace-status',
    welcome: 'workspaces/welcome',
    createWorkspace: 'workspaces/create-workspace',
    uploadWorkspaceAvatar: 'workspaces/upload-workspace-avatar',
    activateWorkspace: 'workspaces/activate-workspace',
    activatedLicense: 'workspaces/activated-license',
}

export const ROUTES_NAME = {
    ...AUTH_ROUTES,
    ...CHANGELOG_ROUTES,
    ...ERRORS_ROUTES,
    ...EXPRESS_ROUTES,
    ...HOME_APP_CREATOR_ROUTES,
    ...HOME_CLIENTS_ROUTES,
    ...HOME_CONTACTS_ROUTES,
    ...HOME_CONTACT_CENTER_ROUTES,
    ...HOME_CONTACT_PROFILE_ROUTES,
    ...HOME_DATA_ROUTES,
    ...HOME_ERRORS_ROUTES,
    ...HOME_CONTACT_FILES_ROUTES,
    ...HOME_EXTERNAL_POLICIES_ROUTES,
    ...HOME_GROUPS_ROUTES,
    ...HOME_GROUP_PROFILE_ROUTES,
    ...HOME_INVITATIONS_ROUTES,
    ...HOME_LEADS_ROUTES,
    ...HOME_PARTNER_ROUTES,
    ...HOME_PARTNER_PROFILE_ROUTES,
    ...HOME_PAYMENTS_ROUTES,
    ...HOME_POLICIES_ROUTES,
    ...HOME_POLICY_ENDORSEMENTS_ROUTES,
    ...HOME_QUOTATIONS_ROUTES,
    ...HOME_SINISTERS_ROUTES,
    ...HOME_RENEWALS_ROUTES,
    ...HOME_SITE_CREATOR_ROUTES,
    ...HOME_STATS_ROUTES,
    ...HOME_WALLET_ROUTES,
    ...INVITATIONS_ROUTES,
    ...POLICY_SEARCH_ENGINE_ROUTES,
    ...SEARCHES_ROUTES,
    ...WELCOME_ROUTES,
    ...WORKSPACES_ROUTES
}
