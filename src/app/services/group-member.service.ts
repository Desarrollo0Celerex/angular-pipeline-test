import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AddGroupMemberDataSend } from '@interfaces/add-group-member-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    groupMembers: (workspaceId: string, groupId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/members',
    groupMember: (workspaceId: string, groupId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/' + groupId + '/members/' + contactId,
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

    /**
      * Get the groups from the API
      * @param  page            The page number
      * @param  fields          The fields to get
      * @param  groupStatusId    The filter to apply
      * @param  query           The search to do
      * @return                 The groups
      */
    getGroupMembers(groupId: string, fields: string = '', page: number = 1, query: string = '', perPage: number = 12): Observable<HttpResponse> {
        const route: string = routes.groupMembers(this._workspaceId, groupId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('perPage', perPage.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!query) params = params.append('search', 'contactName:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Delete the group member in the API
     * @return  Notification of action done
     */
    deleteGroupMember(groupId: string, contactId: string): Observable<void> {
        const route: string = routes.groupMember(this._workspaceId, groupId, contactId);
        return this._httpClient.delete<void>(route);
    }
}
