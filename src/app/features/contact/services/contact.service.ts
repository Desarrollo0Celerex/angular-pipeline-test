import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttp } from '@core/http/api.http';
import { CreateContactRequestBody } from '@contact/interfaces/create-contact-request-body.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { CONTACT_ENDPOINTS } from '@contact/constants/endpoints';

@Injectable()
export class ContactService {
    private _workspaceId: string;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {
        this._workspaceId = this._authService.workspaceId;
    }

    createContact(requestBody: CreateContactRequestBody): Observable<string> {
        return this._apiHttp.post(
            CONTACT_ENDPOINTS.contacts(this._workspaceId),
            requestBody
        );
    }
}
