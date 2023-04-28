import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CONTACT_TYPES } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Contact } from '@interfaces/contact.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceCategory } from '@interfaces/insurance-category.interface';
import { InsurancesByCategory } from '@interfaces/insurances-by-category.interface';
import { ContactService } from '@services/contact.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

@Injectable()
export class ContainerListInsurancesService {
    contact: Contact | null = null;
    insurancesByCategories: InsurancesByCategory[] = [];
    mostUsedInsurances: Insurance[] = [];

    constructor(
        private _contactService: ContactService,
        private _insuranceService: InsuranceService,
        private _insuranceCategoryService: InsuranceCategoryService
    ) { }

    getCategories(contactTypeId: number): Observable<HttpResponse> {
        const fields: string = 'insuranceCategoryId,name';
        const orderBy: string = (contactTypeId === CONTACT_TYPES.PERSON) ? 'personSorting' : 'companySorting';
        return this._insuranceCategoryService.getInsuranceCategories(fields, orderBy);
    }

    loadContact(contactId: string): Observable<HttpResponse> {
        const fields: string = 'contactTypeId,contactName';
        return this._contactService.getContact(contactId,fields).pipe(
            tap((res: HttpResponse) => {
                this.contact = res.data;
            })
        );
    }

    loadInsurances(insuranceCategories: InsuranceCategory[]): void {
        this.insurancesByCategories = [];
        this._getRequestToGetCategoryInsurances(insuranceCategories).subscribe( (res: HttpResponse[]) => {
            for(let index in insuranceCategories) {
                const insuranceCategory: InsuranceCategory = insuranceCategories[index];
                const categoryInsurances: Insurance[] = res[index].data;
                this.insurancesByCategories.push({
                    ...insuranceCategory,
                    insurances: categoryInsurances
                });
            }
        })
    }

    loadMostUsedInsurances(contactTypeId: number): void {
        const fields: string = 'insuranceId,name,title,description,background,icon';
        this._insuranceService.getMostUsedInsurances(contactTypeId, fields).subscribe((res: HttpResponse) => {
            this.mostUsedInsurances = res.data;
        });
    }

    /**
     * Get the request to get the category insurances
     * @param  insuranceCategories The insurance categories
     * @return                     The requests
     */
    private _getRequestToGetCategoryInsurances(insuranceCategories: InsuranceCategory[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        const fields: string = 'insuranceId,name,title,description,background,icon';
        const sortBy: string = 'sorting';
        for(let insuranceCategory of insuranceCategories) {
            let request: Observable<HttpResponse> = this._insuranceService.getCategoryInsurances(insuranceCategory.insuranceCategoryId, fields, sortBy);
            requests.push(request);
        }
        return forkJoin(requests);
    }
}
