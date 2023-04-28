import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { InsuranceService } from '@services/insurance.service';

@Injectable()
export class ContainerInsurancesBySearchService {
    allInsurances: Insurance[] = [];
    insurancesFound: Insurance[] = [];
    isInsurancesLoaded: boolean = false;

    constructor(private _insuranceService: InsuranceService) {}

    loadInsurances(): Observable<void> {
        this.isInsurancesLoaded = false;
        const fields: string =
            'insuranceId,name,title,description,background,icon';
        return this._insuranceService.getInsurances(fields).pipe(
            tap((res: HttpResponse) => {
                this.allInsurances = res.data;
                this.isInsurancesLoaded = true;
            }),
            map(() => {})
        );
    }

    searchInsurance(query: string): void {
        query = query.toLocaleLowerCase().trim();
        this.insurancesFound = this.allInsurances.filter((insurance: any) =>
            Object.keys(insurance).some((property: string) => {
                if (property === 'name' || property === 'description') {
                    const value: string =
                        insurance[property].toLocaleLowerCase();
                    return value.includes(query) ? true : false;
                }
                return false;
            })
        );
    }
}
