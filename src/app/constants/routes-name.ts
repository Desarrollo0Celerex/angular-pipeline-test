export const ROUTES_NAME = {
    LOGIN: 'auth/login',
    IDENTIFIER: (authToken: string) => `auth/identifier/${authToken}`,
    DASHBOARD: 'data/dashboard',
    CHECK_WORKSPACE_STATUS: 'workspace/check-status',
    NOT_AUTHENTICATED: 'error/not-authenticated'
}
