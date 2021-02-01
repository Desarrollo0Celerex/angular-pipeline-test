import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes: any = {
    roles:  environment.apiUrl + '/roles'
}

@Injectable()
export class RoleService {

    constructor(private _httpClient: HttpClient) { }

    /**
     * Get the roles from API
     * @param  fields Fields
     * @return        Roles
     */
    getRoles(fields: string = ''): Observable<HttpResponse> {
        const route: string = routes.roles;
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params});
    }
}
