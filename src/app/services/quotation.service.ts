import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreateQuotationDataSend } from '@interfaces/create-quotation-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    quotations: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/quotations',
}

@Injectable()
export class QuotationService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create a quotation in the API
     * @param  contactId   The contact ID
     * @param  requestBody The quotation data
     * @return             The quotation ID
     */
    createQuotation(contactId: string, requestBody: CreateQuotationDataSend): Observable<HttpResponse> {
        const route: string = routes.quotations(this._workspaceId, contactId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
