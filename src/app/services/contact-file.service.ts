import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    contactFiles: (workspaceId: string, contactId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/files',
    contactFile: (workspaceId: string, contactId: string, contactFileId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/contacts/' + contactId + '/files/' + contactFileId
}

@Injectable()
export class ContactFileService {
    private _workspaceId: string = this._authService.workspaceId;;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Delete the contact file from the API
     * @param  contactFileData  The contact field data
     * @return                  The contact file
     */
    deleteContactFile(contactFileData: ContactFileDataSend): Observable<void> {
        const route: string = routes.contactFile(this._workspaceId, contactFileData.contactId, contactFileData.contactFileId);
        return this._httpClient.delete<void>(route);
    }

    /**
     * Get the contact file from the API
     * @param  contactFileData  The contact field data
     * @param  fields           The fields to get
     * @return                  The contact file
     */
    getContactFile(contactFileData: ContactFileDataSend, fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactFile(this._workspaceId, contactFileData.contactId, contactFileData.contactFileId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Get the contact files from the API
     * @param  contactId The contact ID
     * @param  page      The page number
     * @param  fields    The fields to get
     * @param  query     The query to do
     * @return           The contact files
     */
    getContactFiles(contactId: string, page: number = 1, fields: string = '', query: string = ''): Observable<HttpResponse> {
        const route: string = routes.contactFiles(this._workspaceId, contactId);
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        if(!!fields) params = params.append('fields', fields);
        if(!!query) {
            query = query.replace(/ /g, '_');
            params = params.append('search', 'fileName:' + query);
        }
        params = params.append('sortBy', '-createdAt');
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    /**
     * Update the contact file in the API
     * @param  contactFileData  The contact file data
     * @param  requestBody      The file data
     * @return                  Notice of action done
     */
    updateContactFile(contactFileData: ContactFileDataSend, requestBody: FormData): Observable<void> {
        const route: string = routes.contactFile(this._workspaceId, contactFileData.contactId, contactFileData.contactFileId);
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Upload the contact file in the API
     * @param  contactId   The contact ID
     * @param  requestBody The file data
     * @return             Notice of action done
     */
    uploadContactFile(contactId: string, requestBody: FormData): Observable<void> {
        const route: string = routes.contactFiles(this._workspaceId, contactId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
