import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const routes: any = {
    policies: environment.atomScann + '/policies'
}

@Injectable()
export class AtomScannService {

    constructor(private _httpClient: HttpClient) { }

    public scannPolicy(requestBody: FormData): Observable<HttpResponse> {
        const route: string = routes.policies;
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }
}
