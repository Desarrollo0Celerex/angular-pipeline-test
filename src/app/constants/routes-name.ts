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
    listClients: 'home/clients/list-clients'
}

const HOME_CONTACTS_ROUTES = {
    createContact: (contactTypeId: string) => `home/contacts/create-contact/${contactTypeId}`,
    changeContact: (contactId: string, policyId: string, contactTypeId: string, actionType: string) => `home/contacts/change-contact/${contactId}/${policyId}/${contactTypeId}/${actionType}`,
    contactSearchResults: () => `home/contacts/contact-search-results`,
    listContactCoincidences: `home/contacts/list-contact-coincidences`
}

const HOME_CONTACT_PROFILE_ROUTES = {
    contactResume: (contactId: string) => `home/contact-profile/${contactId}/resume`,
    listContactQuotations: (contactId: string) => `home/contact-profile/${contactId}/list-quotations`,
    listContactPolicies: (contactId: string) => `home/contact-profile/${contactId}/list-policies`,
    listContactSinisters: (contactId: string) => `home/contact-profile/${contactId}/list-sinisters`,
}

const HOME_DATA_ROUTES = {
    dashboard: 'home/data/dashboard'
}

const HOME_ERRORS_ROUTES = {
    accessDenied: 'home/errors/access-denied'
}

const HOME_INVITATIONS_ROUTES = {
    listInvitations: 'home/invitations/list-invitations'
}

const HOME_LEADS_ROUTES = {
    listLeads: 'home/leads/list-leads'
}

const HOME_PAYMENTS_ROUTES = {
    listPayments: `home/payments/list-payments`,
    paymentHistory: (contactId: string, policyId: string, paymentId: string) => `home/payments/payment-history/${contactId}/${policyId}/${paymentId}`
}

const HOME_POLICIES_ROUTES = {
    createPolicy: (contactId: string) => `home/policies/create-policy/${contactId}`,
    uploadPolicy: (contactId: string, policyId: string) => `home/policies/upload-policy/${contactId}/${policyId}`,
    completePolicy: (contactId: string, policyId: string) => `home/policies/complete-policy/${contactId}/${policyId}`,
    updatePolicy: (contactId: string, policyId: string) => `home/policies/update-policy/${contactId}/${policyId}`,
    endorsePolicy: (contactId: string, policyId: string) => `home/policies/endorse-policy/${contactId}/${policyId}`,
    cancelPolicy: (contactId: string, policyId: string) => `home/policies/cancel-policy/${contactId}/${policyId}`,
    showHistoryPolicy: (contactId: string, policyId: string) => `home/policies/history-policy/${contactId}/${policyId}`,
}

const HOME_QUOTATIONS_ROUTES = {
    createQuotation: (contactId: string) => `home/quotations/create-quotation/${contactId}`,
}

const INVITATIONS_ROUTES = {
    acceptInvitation: (invitationToken: string) => `invitations/accept-invitation/${invitationToken}`
}

const SEARCHES_ROUTES = {
    listSearchResults: 'home/searches/search-results'
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
    ...INVITATIONS_ROUTES,
    ...SEARCHES_ROUTES,
    ...WORKSPACES_ROUTES
}
