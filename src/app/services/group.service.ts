import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CreateGroupDataSend } from '@interfaces/create-group-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    groups: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups',
    totalGroups: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/groups/count'
}

@Injectable()
export class GroupService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create the group in the API
     * @param  requestBody Group data to create
     * @return             Notification of action done
     */
    createGroup(requestBody: CreateGroupDataSend): Observable<void> {
        const route: string = routes.groups(this._workspaceId);
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
    getGroups(page: number = 1, fields: string = '', filters: string = '', query: string = ''): Observable<HttpResponse> {
        const route: string = routes.groups(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!filters) params = params.append('filter', filters);
        if(!!query) params = params.append('search', 'contactName:' + query);
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the total groups from the API
     * @param  groupStatusId The filter to apply
     * @return              The total clients
     */
    getTotalGroups(filters: string = '', rangeField: string = '', rangeStart: string = '', rangeEnd: string = ''): Observable<number> {
        const route: string = routes.totalGroups(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filters) params = params.append('filter', filters);
        if(!!rangeField) params = params.append('rangeField', rangeField);
        if(!!rangeStart) params = params.append('rangeStart', rangeStart);
        if(!!rangeEnd) params = params.append('rangeEnd', rangeEnd);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => res.data )
        );
    }
}
