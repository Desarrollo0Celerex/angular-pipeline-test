import { environment } from '@env/environment';

export const PAYMENT_ENDPOINTS = {
    workspacePayment: (workspaceId: string, paymentId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/payments/${paymentId}`,
};
