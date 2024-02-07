import { environment } from '@env/environment';

export const CONTACT_ENDPOINTS: any = {
    contacts: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts`,
    contact: (workspaceId: string, contactId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/contacts/${contactId}`,
};
