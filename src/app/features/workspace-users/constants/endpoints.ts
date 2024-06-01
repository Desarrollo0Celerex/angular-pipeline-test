import { environment } from '@env/environment';

export const WORKSPACE_USER_ENDPOINTS: any = {
    totalUserWorkspaces: (workspaceId: string, userId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/users/${userId}/workspaces/total`,
    userWorkspaces: (workspaceId: string, userId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/users/${userId}/workspaces`,
    workspaceUsers: (workspaceId: string) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/users`,
};
