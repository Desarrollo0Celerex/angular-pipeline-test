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

const HOME_CONTACT_PROFILE_ROUTES = {
    contactResume: (contactId: string) => `workspace/contact-profile/${contactId}/resume`,
    listContactQuotations: (contactId: string) => `workspace/contact-profile/${contactId}/list-quotations`,
    listContactPolicies: (contactId: string) => `workspace/contact-profile/${contactId}/list-policies`,
    listContactSinisters: (contactId: string) => `workspace/contact-profile/${contactId}/list-sinisters`,
    showContactData: (contactId: string) => `workspace/contact-profile/${contactId}/show-contact-data`,
    showRecord: (contactId: string) => `workspace/contact-profile/${contactId}/show-record`,
}

const HOME_DATA_ROUTES = {
    dashboard: 'workspace/data/dashboard'
}

const HOME_ERRORS_ROUTES = {
    accessDenied: 'workspace/errors/access-denied'
}

const HOME_INVITATIONS_ROUTES = {
    listInvitations: 'workspace/invitations/list-invitations'
}

const HOME_LEADS_ROUTES = {
    listLeads: 'workspace/leads/list-leads'
}

const HOME_PAYMENTS_ROUTES = {
    listPayments: `workspace/payments/list-payments`,
    paymentHistory: (contactId: string, policyId: string, paymentId: string) => `workspace/payments/payment-history/${contactId}/${policyId}/${paymentId}`
}

const HOME_POLICIES_ROUTES = {
    createPolicy: (contactId: string) => `workspace/policies/create-policy/${contactId}`,
    uploadPolicy: (contactId: string, policyId: string) => `workspace/policies/upload-policy/${contactId}/${policyId}`,
    completePolicy: (contactId: string, policyId: string) => `workspace/policies/complete-policy/${contactId}/${policyId}`,
    updatePolicy: (contactId: string, policyId: string) => `workspace/policies/update-policy/${contactId}/${policyId}`,
    endorsePolicy: (contactId: string, policyId: string) => `workspace/policies/endorse-policy/${contactId}/${policyId}`,
    cancelPolicy: (contactId: string, policyId: string) => `workspace/policies/cancel-policy/${contactId}/${policyId}`,
    showHistoryPolicy: (contactId: string, policyId: string) => `workspace/policies/history-policy/${contactId}/${policyId}`,
}

const HOME_QUOTATIONS_ROUTES = {
    createQuotation: (contactId: string) => `workspace/quotations/create-quotation/${contactId}`,
}

const HOME_SINISTERS_ROUTES = {
    listSinisters: `workspace/sinisters/list-sinisters`,
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
    ...HOME_INVITATIONS_ROUTES,
    ...HOME_LEADS_ROUTES,
    ...HOME_PAYMENTS_ROUTES,
    ...HOME_POLICIES_ROUTES,
    ...HOME_QUOTATIONS_ROUTES,
    ...HOME_SINISTERS_ROUTES,
    ...INVITATIONS_ROUTES,
    ...SEARCHES_ROUTES,
    ...WORKSPACES_ROUTES
}
