const AUTH_ROUTES = {
    login: 'auth/login',
    identify_user: (authToken: string) => `auth/identify-user/${authToken}`
}

const DATA_ROUTES = {
    dashboard: 'data/dashboard'
}

const ERROR_ROUTES = {
    notAuthenticated: 'error/not-authenticated'
}

const WORKSPACE_ROUTES = {
    checkWorkspaceStatus: 'workspace/check-status',
    welcome: 'workspace/welcome',
    createWorkspace: 'workspace/create-workspace',
    uploadWorkspaceAvatar: 'workspace/upload-workspace-avatar',
    activateWorkspace: 'workspace/activate-workspace'
}

export const ROUTES_NAME = {
    ...AUTH_ROUTES,
    ...DATA_ROUTES,
    ...ERROR_ROUTES,
    ...WORKSPACE_ROUTES
}
