import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PhoneCode } from '@interfaces/phone-code.interface';
import { PhoneCodeService } from '@services/phone-code.service';

@Injectable()
export class DropdownSelectPhoneCodeService {
    phoneCodes: PhoneCode[];

    constructor(private _phoneCodeService: PhoneCodeService) {
        this.phoneCodes = [];
    }

    /**
     * Load the phone codes
     * @return Phone codes
     */
    loadPhoneCodes(): Observable<HttpResponse> {
        return this._phoneCodeService.getPhoneCodes().pipe(
            tap( (res:HttpResponse) => {
                this.phoneCodes = res.data;
            })
        );
    }

    /**
     * Get the selected phone code position
     * @param  phoneCodeId Phone code id
     * @return             Phone code position
     */
    getSelectedPhoneCodePosition(phoneCodeId: number): number {
        const position: number = this.phoneCodes.findIndex( (element: PhoneCode) => element.phoneCodeId === phoneCodeId);
        return (position !== -1) ? position : 0;
    }
}
