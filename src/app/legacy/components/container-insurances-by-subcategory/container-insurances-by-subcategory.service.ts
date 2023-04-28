import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceSubcategory } from '@interfaces/insurance-subcategory.interface';
import { InsurancesBySubcategory } from '@interfaces/insurances-by-subcategory.interface';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceSubcategoryService } from '@services/insurance-subcategory.service';

@Injectable()
export class ContainerInsurancesBySubcategoryService {
    insurancesBySubcategories: InsurancesBySubcategory[] = [];

    constructor(
        private _insuranceService: InsuranceService,
        private _insuranceSubcategoryService: InsuranceSubcategoryService
    ) {}

    getSubcategories(): Observable<HttpResponse> {
        const fields: string = 'insuranceSubcategoryId,name';
        return this._insuranceSubcategoryService.getInsuranceSubcategories(
            fields
        );
    }

    loadInsurances(insuranceSubcategories: InsuranceSubcategory[]): void {
        this.insurancesBySubcategories = [];
        this._getRequestToGetSubcategoryInsurances(
            insuranceSubcategories
        ).subscribe((res: HttpResponse[]) => {
            for (let index in insuranceSubcategories) {
                const insuranceSubcategory: InsuranceSubcategory =
                    insuranceSubcategories[index];
                const subcategoryInsurances: Insurance[] = res[index].data;
                this.insurancesBySubcategories.push({
                    ...insuranceSubcategory,
                    insurances: subcategoryInsurances,
                });
            }
        });
    }

    private _getRequestToGetSubcategoryInsurances(
        insuranceSubcategorys: InsuranceSubcategory[]
    ): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        const fields: string =
            'insuranceId,name,title,description,background,icon';
        const sortBy: string = 'subsorting';
        for (let insuranceSubcategory of insuranceSubcategorys) {
            let request: Observable<HttpResponse> =
                this._insuranceService.getSubcategoryInsurances(
                    insuranceSubcategory.insuranceSubcategoryId,
                    fields,
                    sortBy
                );
            requests.push(request);
        }
        return forkJoin(requests);
    }
}
