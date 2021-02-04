const AUTH_ROUTES = {
    login: 'auth/login',
    identify_user: (authToken: string) => `auth/identify-user/${authToken}`
}

const ERROR_ROUTES = {
    notFound: 'errors/not-found',
    notAuthenticated: 'errors/not-authenticated',
    workspaceNotActivated: 'errors/workspace-not-activated'
}

const HOME_DATA_ROUTES = {
    dashboard: 'home/data/dashboard'
}

const HOME_INVITATION_ROUTES = {
    sendInvitations: 'home/invitations/send-invitations'
}

const INVITATION_ROUTES = {
    acceptInvitation: (invitationToken: string) => `invitations/accept-invitation/${invitationToken}`
}

const WORKSPACE_ROUTES = {
    checkWorkspaceStatus: 'workspaces/check-workspace-status',
    welcome: 'workspaces/welcome',
    createWorkspace: 'workspaces/create-workspace',
    uploadWorkspaceAvatar: 'workspaces/upload-workspace-avatar',
    activateWorkspace: 'workspaces/activate-workspace'
}

export const ROUTES_NAME = {
    ...AUTH_ROUTES,
    ...HOME_DATA_ROUTES,
    ...ERROR_ROUTES,
    ...HOME_INVITATION_ROUTES,
    ...INVITATION_ROUTES,
    ...WORKSPACE_ROUTES
}
