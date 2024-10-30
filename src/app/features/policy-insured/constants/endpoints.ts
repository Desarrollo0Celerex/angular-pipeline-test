import { environment } from '@env/environment';

export const POLICY_INSURED_ENDPOINTS = {
    policyInsured: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        policyInsuredId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds/${policyInsuredId}`,
    policyInsureds: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/insureds`,
};
