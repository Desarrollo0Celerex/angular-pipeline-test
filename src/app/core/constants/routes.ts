export const AUTH_ROUTES: any = {
    MODULE: 'auth',
    LOGIN: 'login',
    IDENTIFY_USER: (authToken: string) => `identify-user/${authToken}`,
};

export const HOME_ROUTES: any = {
    MODULE: 'home',
};

export const PARTNERS_ROUTES: any = {
    MODULE: 'smart-wallet/partners',
    PAYMENTS_APPLIED_BY_RANGE: (
        partnerId: string,
        rangeStart: string,
        rangeEnd: string
    ) => `payments-applied-by-range/${partnerId}/${rangeStart}/${rangeEnd}`,
    PAYMENTS_PENDING_BY_RANGE: (
        partnerId: string,
        rangeStart: string,
        rangeEnd: string
    ) => `payments-pending-by-range/${partnerId}/${rangeStart}/${rangeEnd}`,
};

export const PAY_TRACKER_ROUTES: any = {
    MODULE: 'pay-tracker',
    PAYMENTS: 'payments',
    CALENDAR: 'calendar',
    SEARCH_RESULTS: 'search-results',
};

export const TASKS_ROUTES: any = {
    MODULE: 'task-planner',
    TASKS: 'tasks',
};

export const TASK_PLANNER_ROUTES: any = {
    MODULE: 'task-planner',
    TASKS: 'tasks',
};
