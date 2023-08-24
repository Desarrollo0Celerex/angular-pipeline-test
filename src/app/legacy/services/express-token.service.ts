import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const routes: any = {
    expressTokens: (workspaceId: string, contactId: string) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/express-tokens',
    expresContact: (workspaceId: string, contactId: string) =>
        environment.agenthos.apiUrl +
        '/express/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId,
};

@Injectable()
export class ExpressTokenService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Get an express token from the API
     * @param  contactId The contact ID
     * @return           The express token
     */
    public getExpressToken(contactId: string): Observable<HttpResponse> {
        const route: string = routes.expressTokens(
            this._workspaceId,
            contactId
        );
        return this._httpClient.get<HttpResponse>(route);
    }

    /**
     * Get the express contact from the API
     * @param  workspaceId  The contact workspace ID
     * @param  contactId    The workspace ID
     * @param  expressToken The express token
     * @param  fields       The fields to get
     * @return              The express contact data
     */
    public getExpressContact(
        workspaceId: string,
        contactId: string,
        expressToken: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const headers = new HttpHeaders().set(
            'Express-Authorization',
            'Bearer ' + expressToken
        );
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        const route: string = routes.expresContact(workspaceId, contactId);
        return this._httpClient.get<HttpResponse>(route, { headers, params });
    }
}
