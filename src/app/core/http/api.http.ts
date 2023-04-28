import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';

@Injectable()
export class ApiHttp {
    constructor(private _httpClient: HttpClient) {}

    delete(endpoint: string): Observable<any> {
        return this._httpClient.delete(endpoint);
    }

    get(endpoint: string): Observable<any> {
        return this._httpClient
            .get<HttpResponse>(endpoint)
            .pipe(map((response: HttpResponse) => this._extractData(response)));
    }

    patch(endpoint: string, body?: object): Observable<any> {
        return this._httpClient.patch(endpoint, body);
    }

    post(endpoint: string, body: object): Observable<any> {
        return this._httpClient
            .post<HttpResponse>(endpoint, body)
            .pipe(map((response: HttpResponse) => this._extractData(response)));
    }

    put(endpoint: string, body?: object): Observable<any> {
        return this._httpClient.put(endpoint, body);
    }

    private _extractData(response: HttpResponse): any {
        return response.data;
    }
}
