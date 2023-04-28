export const AUTH_ROUTES: any = {
    MODULE: 'auth',
    LOGIN: 'login',
    IDENTIFY_USER: (authToken: string) => `identify-user/${authToken}`,
};
