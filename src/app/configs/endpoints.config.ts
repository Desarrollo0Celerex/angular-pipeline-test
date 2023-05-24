import { environment } from '@env/environment';

export const AGENTHOS_NOTIFIER_ENDPOINTS: any = {
    paymentReminders: `${environment.agenthosNotifierApiUrl}/payments/payment-reminders`,
};

export const AUTH_ENDPOINTS: any = {
    firebaseToken: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/firebase-token`,
    users: `${environment.apiUrl}/users`,
    userToken: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/token`,
};

export const CONTACT_ENDPOINTS: any = {
    contact: (workspaceId: string, contactId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}`,
    contactSource: (workspaceId: string, contactId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/contact-source`,
    contacts: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts`,
    contactAnnualWallet: (
        workspaceId: string,
        contactId: string,
        year: number
    ) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/annual-wallet/${year}`,
};

export const PAYMENT_ENDPOINTS: any = {
    contactPaymentStats: (workspaceId: string, contactId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/payments/stats`,
    partnerPaymentStats: (workspaceId: string, partnerId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/partners/${partnerId}/payments/stats`,
    partnerPayments: (workspaceId: string, partnerId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/partners/${partnerId}/payments`,
    paymentReminders: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/payments/${paymentId}/reminders`,
    totalWorkspacePayments: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/payments/count`,
    totalWorkspacePaymentsAmount: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/payments/total-amount`,
    workspacePayment: (workspaceId: string, paymentId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/payments/${paymentId}`,
    workspacePayments: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/payments`,
};

export const PAYMENT_REMINDER_ENDPOINTS: any = {
    paymentReminders: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/payments/${paymentId}/reminders`,
};

export const POLICY_ENDPOINTS: any = {
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}`,
    policyTitularContact: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/titular-contact`,
    workspacePolicies: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/policies`,
};

export const TASK_ENDPOINTS: any = {
    workspaceTasks: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tasks`,
};

export const WORKSPACE_ENDPOINTS: any = {
    workspaces: `${environment.apiUrl}/workspaces`,
    workspace: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}`,
    workspaceAvailablePlaces: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/available-places`,
    workspaceAvatar: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/avatar`,
    workspaceActivation: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/activate`,
    workspaceCardiumUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/cardium-url`,
    workspaceFacebookUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/facebook-url`,
    workspaceInstagramUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/instagram-url`,
    workspaceTwitterUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/twitter-url`,
    workspaceLinkedinUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/linkedin-url`,
    workspaceTiktokUrl: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tiktok-url`,
    workspaceRetentionRate: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tiktok-url/stats/retention-rate`,
    workspaceHigherRetentionRate: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tiktok-url/stats/retention-rate/higher`,
    workspaceLowerRetentionRate: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/tiktok-url/stats/retention-rate/lower`,
};

export const WORKSPACE_USER_ENDPOINTS: any = {
    workspaceUser: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}`,
    workspaceUsers: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users`,
    workspaceUserRole: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/role`,
};
