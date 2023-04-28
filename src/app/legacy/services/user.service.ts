import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';

const ROUTES = {
    users: (userId: string) => `${environment.apiUrl}/users/${userId}`,
};

@Injectable()
export class UserService {
    constructor(private _httpClient: HttpClient) {}

    /**
     * Get user from API
     * @param  userId User Id
     * @param  fields Fields
     * @return        User
     */
    getUser(userId: string, fields: string = ''): Observable<HttpResponse> {
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        const route: string = ROUTES.users(userId);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
