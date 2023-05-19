import { User } from '@core/interfaces/user.interface';

export interface WorkspaceUser extends User {
    roleName: string;
}
