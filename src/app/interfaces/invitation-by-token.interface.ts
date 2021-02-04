export interface InvitationByToken {
    invitationId: number,
    invitationStatusId: number,
    roleId: number,
    workspaceId: string,
    workspaceBrandName: string,
    workspaceAvatarUrl: string,
    isActiveWorkspace: boolean
}
