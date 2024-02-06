import { environment } from '@env/environment';

export const POLICY_ENDPOINTS = {
    activePolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/active`,
    contactPolicies: (workspaceId: string, contactId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies`,
    contactPolicy: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}`,
    incompletePolicy: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/incomplete`,
    policyContact: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/titular-contact`,
    policyNotification: `${environment.agenthosNotifications.apiUrl}/policies`,
    reissues: (workspaceId: string, contactId: string, policyId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/reissue`,
    uploadContactPolicy: (
        workspaceId: string,
        contactId: string,
        policyId: string
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}/policies/${policyId}/upload-file`,
};

const ENDPOINTS = {};
