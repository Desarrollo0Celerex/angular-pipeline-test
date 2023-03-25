import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';

export interface SaveWorkspaceDirectoriesDataSend {
    workspaceDirectoryTypeId: number,
    workspaceDirectories: WorkspaceDirectory[] 
}
