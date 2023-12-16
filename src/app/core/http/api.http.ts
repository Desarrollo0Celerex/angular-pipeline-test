import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpEvent,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FullHttpResponse } from '@core/interfaces/full-http-response.interface';

@Injectable({
    providedIn: 'root',
})
export class ApiHttp {
    private _headers: HttpHeaders = new HttpHeaders();
    private _params: HttpParams = new HttpParams();
    private _responseType: string = 'json';

    constructor(private _httpClient: HttpClient) {}

    delete(endpoint: string): Observable<any> {
        return this._httpClient.delete(endpoint, this._createOptions());
    }

    get(endpoint: string): Observable<any> {
        return this._httpClient
            .get<FullHttpResponse>(endpoint, this._createOptions())
            .pipe(
                map((response: FullHttpResponse) => this._extractData(response))
            );
    }

    patch(endpoint: string, body?: object): Observable<any> {
        return this._httpClient.patch(endpoint, body);
    }

    param(key: string, value: string): ApiHttp {
        if (value != null) {
            this._params = this._params.append(key, value);
        }
        return this;
    }

    post(endpoint: string, body: object): Observable<any> {
        return this._httpClient
            .post<FullHttpResponse>(endpoint, body, this._createOptions())
            .pipe(
                map((response: FullHttpResponse) => this._extractData(response))
            );
    }

    put(endpoint: string, body?: object): Observable<any> {
        return this._httpClient.put(endpoint, body);
    }

    private _createOptions(): Object {
        const options: Object = {
            headers: this._headers,
            params: this._params,
            responseType: this._responseType,
            observe: 'response',
        };
        this._resetOptions();
        return options;
    }

    private _extractData(response: FullHttpResponse): any {
        //return response.body.data;
        return response.body.data
            ? response.body.data
            : response.body.notificationResults;
    }

    private _resetOptions(): void {
        this._headers = new HttpHeaders();
        this._params = new HttpParams();
        this._responseType = 'json';
    }
}
