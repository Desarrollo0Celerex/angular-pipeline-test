import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contacts: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts'
}

@Injectable()
export class ContactService {
private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create a contact in the API
     * @param  requestBody Contact data to create
     * @return             The contact ID
     */
    public createContact(requestBody: CreateContactDataSend): Observable<HttpResponse> {
        const route: string = routes.contacts(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
