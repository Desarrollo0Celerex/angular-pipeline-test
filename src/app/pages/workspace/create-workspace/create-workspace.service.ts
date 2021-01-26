import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { DEFAULT_PHONE_CODE_ID, DEFAULT_COUNTRY_ID, REAL_NAME_LENGTH, BRAND_NAME_LENGTH, WEB_LINK_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Country } from '@interfaces/country.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { State } from '@interfaces/state.interface';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';

@Injectable()
export class CreateWorkspaceService {
    countries: Country[];
    countryStates: State[];
    workspaceForm: FormGroup;

    constructor(
        private _countryService: CountryService,
        private _formBuilder: FormBuilder,
        private _stateService: StateService
    ) {
        this.countries = [];
        this.countryStates = [];
        this.workspaceForm = this._buildWorkspaceForm();
    }

    get f() {
        return this.workspaceForm.controls;
    }

    loadCatalogs(): Observable<HttpResponse> {
        return this._countryService.getCountries().pipe(
            mergeMap( (resCountries: HttpResponse) => {
                this.countries = resCountries.data;
                return this._stateService.getCountryStates(this.f.countryId.value).pipe(
                    tap( (resCountryStates: HttpResponse) => {
                        this.countryStates = resCountryStates.data;
                    })
                );
            })
        )
    }

    loadCountryStates(countryId: number): void {
        this._stateService.getCountryStates(countryId).subscribe( (res: HttpResponse) => {
            this.countryStates = res.data;
        })
    }

    private _buildWorkspaceForm(): FormGroup {
        return this._formBuilder.group({
            realName: ['', [Validators.required, Validators.minLength(REAL_NAME_LENGTH.MIN), Validators.maxLength(REAL_NAME_LENGTH.MAX), ValidatorsHelper.realName]],
            brandName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [Validators.required, ValidatorsHelper.phoneNumber]],
            webSite: ['', [Validators.required, Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
            countryId: [DEFAULT_COUNTRY_ID, [Validators.required]],
            stateId: ['', [Validators.required]]
        });
    }

}
