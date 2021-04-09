import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceCategory } from '@interfaces/insurance-category.interface';
import { InsurancesByCategory } from '@interfaces/insurances-by-category.interface';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceCategoryService } from '@services/insurance-category.service';

@Injectable()
export class ContainerListInsurancesService {
    insurancesByCategories: InsurancesByCategory[] = [];

    constructor(
        private _insuranceService: InsuranceService,
        private _insuranceCategoryService: InsuranceCategoryService
    ) { }

    /**
     * Get the insurance categories
     * @return The insurance catecories
     */
    getInsuranceCategories(): Observable<HttpResponse> {
        const fields: string = 'insuranceCategoryId,name';
        return this._insuranceCategoryService.getInsuranceCategories(fields);
    }

    /**
     * Load the category insurances
     * @param insuranceCategories The insurance categories
     */
    loadCategoryInsurances(insuranceCategories: InsuranceCategory[]): void {
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

    /**
     * Get the request to get the category insurances
     * @param  insuranceCategories The insurance categories
     * @return                     The requests
     */
    private _getRequestToGetCategoryInsurances(insuranceCategories: InsuranceCategory[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        const fields: string = 'insuranceId,name,description,background,icon';
        for(let insuranceCategory of insuranceCategories) {
            let request: Observable<HttpResponse> = this._insuranceService.getCategoryInsurances(insuranceCategory.insuranceCategoryId, fields);
            requests.push(request);
        }
        return forkJoin(requests);
    }
}
