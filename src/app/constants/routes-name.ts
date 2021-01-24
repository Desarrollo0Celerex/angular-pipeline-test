const AUTH_ROUTES = {
    LOGIN: 'auth/login',
    IDENTIFY_USER: (authToken: string) => `auth/identify-user/${authToken}`
}

const DATA_ROUTES = {
    DASHBOARD: 'data/dashboard'
}

const ERROR_ROUTES = {
    NOT_AUTHENTICATED: 'error/not-authenticated'
}

const WORKSPACE_ROUTES = {
    CHECK_WORKSPACE_STATUS: 'workspace/check-status',
    WELCOME: 'workspace/welcome',
    CREATE_WORKSPACE: 'workspace/create-workspace'
}

export const ROUTES_NAME = {
    ...AUTH_ROUTES,
    ...DATA_ROUTES,
    ...ERROR_ROUTES,
    ...WORKSPACE_ROUTES
}
