import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    contactStudies: `${environment.apiUrl}/contact-studies`,
    contactJobs: `${environment.apiUrl}/contact-jobs`,
    contactCars: `${environment.apiUrl}/contact-cars`,
    contactHomes: `${environment.apiUrl}/contact-homes`,
    contactSmartphones: `${environment.apiUrl}/contact-smartphones`,
    mainContactTypes: `${environment.apiUrl}/main-contact-types`,
}

@Injectable()
export class ContactCatalogService {
    constructor(private _httpClient: HttpClient) { }

    getContactStudies(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactStudies;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactJobs(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactJobs;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactCars(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactCars;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactHomes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactHomes;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getContactSmartphones(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.contactSmartphones;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }

    getMainContactTypes(fields: string = ''): Observable<HttpResponse> {
        const route: string = ROUTES.mainContactTypes;
        let params: HttpParams = new HttpParams;
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params });
    }
}
