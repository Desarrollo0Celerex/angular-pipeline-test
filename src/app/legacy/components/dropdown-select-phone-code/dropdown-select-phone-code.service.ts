import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PhoneCode } from '@interfaces/phone-code.interface';
import { CountryService } from '@services/country.service';

@Injectable()
export class DropdownSelectPhoneCodeService {
    phoneCodes: PhoneCode[];

    constructor(private _countryService: CountryService) {
        this.phoneCodes = [];
    }

    /**
     * Load the phone codes
     * @return Phone codes
     */
    loadDropdownPhoneCodes(): Observable<HttpResponse> {
        const fields: string = 'countryId,name,abbreviation,flag,code';
        return this._countryService.getCountries(fields).pipe(
            tap((res: HttpResponse) => {
                this.phoneCodes = res.data;
            })
        );
    }

    /**
     * Get the selected phone code position
     * @param  countryId   Phone code id
     * @return             Phone code position
     */
    getSelectedPhoneCodePosition(countryId: number): number {
        const position: number = this.phoneCodes.findIndex(
            (element: PhoneCode) => element.countryId === countryId
        );
        return position !== -1 ? position : 0;
    }
}
