const AUTH_ROUTES = {
    login: 'auth/login',
    identify_user: (authToken: string) => `auth/identify-user/${authToken}`
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

const HOME_CLIENTS_ROUTES = {
    listClients: 'workspace/clients/list-clients'
}

const HOME_CONTACTS_ROUTES = {
    createContact: (contactTypeId: string) => `workspace/contacts/create-contact/${contactTypeId}`,
    changeContact: (contactId: string, policyId: string, contactTypeId: string, actionType: string) => `workspace/contacts/change-contact/${contactId}/${policyId}/${contactTypeId}/${actionType}`,
    contactSearchResults: () => `workspace/contacts/contact-search-results`,
    listContactCoincidences: `workspace/contacts/list-contact-coincidences`
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
    dashboard: 'workspace/data/dashboard'
}

const HOME_ERRORS_ROUTES = {
    accessDenied: 'workspace/errors/access-denied'
}

const HOME_EXTERNAL_POLICIES_ROUTES = {
    updateExternalPolicy: (contactId: string, externalPolicyId: string) => `workspace/external-policies/update-external-policy/${contactId}/${externalPolicyId}`
}

const HOME_GROUPS_ROUTES = {
    listGroups: 'workspace/groups/list-groups',
    groupCoincidences: 'workspace/groups/coincidences',
}

const HOME_GROUP_PROFILE_ROUTES = {
    groupResume: (groupId: string) => `workspace/group-profile/${groupId}/resume`,
    groupPolicies: (groupId: string) => `workspace/group-profile/${groupId}/policies`,
    groupSinisters: (groupId: string) => `workspace/group-profile/${groupId}/sinisters`,
}

const HOME_INVITATIONS_ROUTES = {
    listInvitations: 'workspace/invitations/list-invitations'
}

const HOME_LEADS_ROUTES = {
    listLeads: 'workspace/leads/list-leads',
    channels: 'workspace/leads/channels',
}

const HOME_PARTNER_ROUTES = {
    listPartners: `workspace/partners/list-partners`,
    partnerCoincidences: `workspace/partners/coincidences`,
}

const HOME_PAYMENTS_ROUTES = {
    listPayments: `workspace/payments/list-payments`,
    paymentHistory: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/payment-history/${contactId}/${policyId}/${paymentId}`,
    pendingReceipts: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/pending-receipts/${contactId}/${policyId}/${paymentId}`
}

const HOME_POLICIES_ROUTES = {
    createPolicy: (contactId: string) => `workspace/policies/create-policy/${contactId}`,
    uploadPolicy: (contactId: string, policyId: string) => `workspace/policies/upload-policy/${contactId}/${policyId}`,
    completePolicy: (contactId: string, policyId: string) => `workspace/policies/complete-policy/${contactId}/${policyId}`,
    updatePolicy: (contactId: string, policyId: string) => `workspace/policies/update-policy/${contactId}/${policyId}`,
    endorsePolicy: (contactId: string, policyId: string) => `workspace/policies/endorse-policy/${contactId}/${policyId}`,
    cancelPolicy: (contactId: string, policyId: string) => `workspace/policies/cancel-policy/${contactId}/${policyId}`,
    showHistoryPolicy: (contactId: string, policyId: string) => `workspace/policies/history-policy/${contactId}/${policyId}`,
    showPolicySinisters: (contactId: string, policyId: string) => `workspace/policies/policy-sinisters/${contactId}/${policyId}`,
    updateCompletePolicy: (contactId: string, policyId: string) => `workspace/policies/update-complete-policy/${contactId}/${policyId}`,
    policyTracker: (contactId: string, policyId: string) => `workspace/policies/policy-tracker/${contactId}/${policyId}`,
}

const HOME_POLICY_ENDORSEMENTS_ROUTES = {
    policyEndorsementsHistory: (contactId: string, policyId: string) => `workspace/policies/endorsements/history/${contactId}/${policyId}`,
}

const HOME_QUOTATIONS_ROUTES = {
    createQuotation: (contactId: string) => `workspace/quotations/create-quotation/${contactId}`,
}

const HOME_SINISTERS_ROUTES = {
    listSinisters: `workspace/sinisters/list-sinisters`,
    showSinisterHistory: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/sinister-history/${contactId}/${policyId}/${sinisterId}`,
    finalizeSinister: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/finalize-sinister/${contactId}/${policyId}/${sinisterId}`,
    reactivateSinister: (contactId: string, policyId: string, sinisterId: string) => `workspace/sinisters/reactivate-sinister/${contactId}/${policyId}/${sinisterId}`
}

const HOME_STATS_ROUTES = {
    statsSnapshot: `workspace/stats/snapshot`,
    statsLeads: `workspace/stats/leads`,
    statsClients: `workspace/stats/client`,
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

const SEARCHES_ROUTES = {
    listSearchResults: 'workspace/searches/search-results'
}

const WORKSPACES_ROUTES = {
    checkWorkspaceStatus: 'workspaces/check-workspace-status',
    welcome: 'workspaces/welcome',
    createWorkspace: 'workspaces/create-workspace',
    uploadWorkspaceAvatar: 'workspaces/upload-workspace-avatar',
    activateWorkspace: 'workspaces/activate-workspace'
}

export const ROUTES_NAME = {
    ...AUTH_ROUTES,
    ...ERRORS_ROUTES,
    ...EXPRESS_ROUTES,
    ...HOME_CLIENTS_ROUTES,
    ...HOME_CONTACTS_ROUTES,
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
    ...HOME_PAYMENTS_ROUTES,
    ...HOME_POLICIES_ROUTES,
    ...HOME_POLICY_ENDORSEMENTS_ROUTES,
    ...HOME_QUOTATIONS_ROUTES,
    ...HOME_SINISTERS_ROUTES,
    ...HOME_STATS_ROUTES,
    ...HOME_WALLET_ROUTES,
    ...INVITATIONS_ROUTES,
    ...SEARCHES_ROUTES,
    ...WORKSPACES_ROUTES
}
