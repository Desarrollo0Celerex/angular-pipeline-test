import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Contact } from '@core/interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { InsuranceService } from '@services/insurance.service';

@Injectable()
export class ContainerInsurancesMostUsedService {
    contact: Contact | null = null;
    insurances: Insurance[] = [];

    constructor(
        private _contactService: ContactService,
        private _insuranceService: InsuranceService
    ) {}

    loadContact(contactId: string): Observable<number> {
        const fields: string = 'contactName,contactTypeId';
        return this._contactService.getContact(contactId, fields).pipe(
            tap((res: Contact) => {
                this.contact = res;
            }),
            map((res: Contact) => res.contactTypeId)
        );
    }

    loadInsurancesMostUsed(contactTypeId: number): void {
        const fields: string =
            'insuranceId,name,title,description,background,icon';
        this._insuranceService
            .getMostUsedInsurances(contactTypeId, fields)
            .subscribe((res: HttpResponse) => {
                this.insurances = res.data;
            });
    }
}
