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

const HOME_CONTACT_ROUTES = {
    createContact: (contactTypeId: string) => `home/contact/create-contact/${contactTypeId}`
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

const HOME_INSURANCES_ROUTES = {
    listInsurances: (contactId: string) => `home/insurances/list-insurances/${contactId}`
}

const HOME_INVITATIONS_ROUTES = {
    listInvitations: 'home/invitations/list-invitations'
}

const HOME_LEADS_ROUTES = {
    listLeads: 'home/leads/list-leads'
}

const INVITATIONS_ROUTES = {
    acceptInvitation: (invitationToken: string) => `invitations/accept-invitation/${invitationToken}`
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
    ...HOME_CONTACT_ROUTES,
    ...HOME_CONTACT_PROFILE_ROUTES,
    ...HOME_DATA_ROUTES,
    ...HOME_INSURANCES_ROUTES,
    ...HOME_INVITATIONS_ROUTES,
    ...HOME_LEADS_ROUTES,
    ...INVITATIONS_ROUTES,
    ...WORKSPACES_ROUTES
}
