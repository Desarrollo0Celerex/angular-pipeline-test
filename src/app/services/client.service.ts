import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    clients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients',
    totalClients: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/clients/count'
}

@Injectable()
export class ClientService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get the total clients from the API
     * @param  filter The filter to apply
     * @return        The total clients
     */
    getTotalClients(filter: number = 0): Observable<HttpResponse> {
        const route: string = routes.totalClients(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!filter)params = params.append('filter', 'clientStatusId[=]' + filter);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
