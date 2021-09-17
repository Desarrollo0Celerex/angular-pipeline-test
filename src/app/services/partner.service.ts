import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CreatePartnerDataSend } from '@interfaces/create-partner-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    partners: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/partners',
}

@Injectable()
export class PartnerService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Create the partner in the API
     * @param  requestBody Partner data to create
     * @return             Notification of action done
     */
    createPartner(requestBody: CreatePartnerDataSend): Observable<void> {
        const route: string = routes.partners(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
