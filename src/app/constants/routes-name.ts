export const ROUTES_NAME = {
    LOGIN: 'auth/login',
    IDENTIFIER: (authToken: string) => `auth/identifier/${authToken}`,
    DASHBOARD: 'data/dashboard',
    NOT_AUTHENTICATED: 'error/not-authenticated'
}
