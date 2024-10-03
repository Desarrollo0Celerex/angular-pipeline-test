import { environment } from '@env/environment';

export const USER_WORKSPACES_ENDPOINTS = {
    totalUserWorkspaces: (userId: string) =>
        `${environment.agenthos.apiUrl}/users/${userId}/workspaces/total`,
    userWorkspaces: (userId: string) =>
        `${environment.agenthos.apiUrl}/users/${userId}/workspaces`,
};
