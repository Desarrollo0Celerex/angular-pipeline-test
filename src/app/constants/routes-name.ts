export const ROUTES_NAME = {
    login: 'auth/login',
    identifier: (authToken: string) => `auth/identifier/${authToken}`,
    dashboard: 'data/dashboard'
}
