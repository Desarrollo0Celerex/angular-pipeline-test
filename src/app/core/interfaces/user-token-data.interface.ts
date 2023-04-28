export interface UserTokenData {
    exp: number,
    iat: number,
    userId: string,
    workspaceId: string,
    roleId: number,
    isActiveWorkspace: boolean
}
