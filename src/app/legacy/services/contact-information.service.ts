import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { AuthService } from '@features/auth/services/auth.service';

const ROUTES = {
    contactInformations: (workspaceId: string, contactId: string) =>
        environment.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/contact-informations',
};

@Injectable()
export class ContactInformationService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    getContactInformations(
        contactId: string,
        fields: string = ''
    ): Observable<HttpResponse> {
        const route: string = ROUTES.contactInformations(
            this._workspaceId,
            contactId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
