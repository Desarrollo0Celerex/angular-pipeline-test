import { environment } from '@env/environment';

export const PAYMENT_ENDPOINTS = {
    applyPayment: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        paymentId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/payments/${paymentId}/receipts-paid`,
    workspacePayment: (workspaceId: string, paymentId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/payments/${paymentId}`,
};
