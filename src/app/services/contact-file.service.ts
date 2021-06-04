import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from '@services/auth.service';

const routes: any = {
    uploadContactFile: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/files'
}

@Injectable()
export class ContactFileService {
    private _workspaceId: string = this._authService.workspaceId;;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Upload the contact file in the API
     * @param  contactId   The contact ID
     * @param  requestBody The file data
     * @return             Notice of action done
     */
    uploadContactFile(contactId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.uploadContactFile(this._workspaceId, contactId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
