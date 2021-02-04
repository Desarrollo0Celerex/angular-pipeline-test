const AUTH_ROUTES = {
    login: 'auth/login',
    identify_user: (authToken: string) => `auth/identify-user/${authToken}`
}

const ERRORS_ROUTES = {
    notFound: 'errors/not-found',
    notAuthenticated: 'errors/not-authenticated',
    workspaceNotActivated: 'errors/workspace-not-activated'
}

const HOME_DATA_ROUTES = {
    dashboard: 'home/data/dashboard'
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
    ...HOME_DATA_ROUTES,
    ...ERRORS_ROUTES,
    ...HOME_INVITATIONS_ROUTES,
    ...HOME_LEADS_ROUTES,
    ...INVITATIONS_ROUTES,
    ...WORKSPACES_ROUTES
}
