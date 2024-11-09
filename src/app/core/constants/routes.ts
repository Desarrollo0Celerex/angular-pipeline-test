export const AUTH_ROUTES: any = {
    MODULE: 'auth',
    LOGIN: 'login',
    IDENTIFY_USER: (authToken: string) => `identify-user/${authToken}`,
    AUTHENTICATE_USER: (userToken: string) => `authenticate-user/${userToken}`,
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
    CALENDAR: 'calendar',
    TASK_RESULTS: 'results',
    TASK_FINISHED_BY_RANGE: 'tasks/finished/by-range',
    TASK_IN_PROGRESS_BY_RANGE: 'tasks/in-progress/by-range',
    TASK_PENDING_BY_RANGE: 'tasks/pending/by-range',
    TASK_RECORD: (taskId: string) => `record/${taskId}`,
};
