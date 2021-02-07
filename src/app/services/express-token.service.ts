import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    expressTokens: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/express-tokens',
    expresContact: (workspaceId: string, contactId: string) => environment.apiUrl + '/express/workspaces/' + workspaceId + '/contacts/' + contactId
}

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
        const route: string = routes.expressTokens(this._workspaceId, contactId);
        return this._httpClient.get<HttpResponse>(route);
    }
}
