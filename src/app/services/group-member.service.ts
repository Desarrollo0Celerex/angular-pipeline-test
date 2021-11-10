import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AddGroupMemberDataSend } from '@interfaces/add-group-member-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    groupMembers: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/members',
}

@Injectable()
export class GroupMemberService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Add the group member in the API
     * @param  requestBody Group data to add
     * @return             Notification of action done
     */
    addGroupMember(groupId: string, requestBody: AddGroupMemberDataSend): Observable<void> {
        const route: string = routes.groupMembers(this._workspaceId, groupId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
