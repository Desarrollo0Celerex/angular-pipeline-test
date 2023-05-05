export const AUTH_ROUTES: any = {
    MODULE: 'auth',
    LOGIN: 'login',
    IDENTIFY_USER: (authToken: string) => `identify-user/${authToken}`,
};

export const HOME_ROUTES: any = {
    MODULE: 'home',
};

export const PAY_TRACKER_ROUTES: any = {
    MODULE: 'pay-tracker',
    PAYMENTS: 'payments',
    SEARCH_RESULTS: 'search-results',
};
