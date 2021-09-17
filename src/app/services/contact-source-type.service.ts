import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactSourceType } from '@interfaces/contact-source-type.interface';

const ROUTES = {
    contactSourceTypes: (contactSourceId: number) =>  `${environment.apiUrl}/contact-sources/${contactSourceId}/contact-source-types`,
}

@Injectable()
export class ContactSourceTypeService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    /**
     * Get the contact source types from the API
     * @param  fields Fields to get
     * @return        The contact source types
     */
    getContactSourceTypes(contactSourceId: number, fields: string = ''): Observable<ContactSourceType[]> {
        const route: string = ROUTES.contactSourceTypes(contactSourceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
            map((res: HttpResponse) => res.data )
        );
    }

}
