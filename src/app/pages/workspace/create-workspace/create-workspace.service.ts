import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { DEFAULT_PHONE_CODE_ID, DEFAULT_COUNTRY_ID, REAL_NAME_LENGTH, BRAND_NAME_LENGTH, WEB_LINK_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Country } from '@interfaces/country.interface';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { State } from '@interfaces/state.interface';
import { AuthService } from '@services/auth.service';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class CreateWorkspaceService {
    countries: Country[];
    countryStates: State[];
    workspaceForm: FormGroup;

    constructor(
        private _authService: AuthService,
        private _countryService: CountryService,
        private _formBuilder: FormBuilder,
        private _stateService: StateService,
        private _workspaceService: WorkspaceService
    ) {
        this.countries = [];
        this.countryStates = [];
        this.workspaceForm = this._buildWorkspaceForm();
    }

    get f() {
        return this.workspaceForm.controls;
    }

    /**
     * Create a workspace
     * @return New user token data
     */
    createWorkspace(): Observable<HttpResponse> {
        const requestBody: CreateWorkspaceDataSend = {
            ...this.workspaceForm.value,
            countryId: this.f.countryId.value // Remove if the field is not disabled
        }
        return this._workspaceService.createWorkspace(requestBody);
    }

    /**
     * Load the data from catalogs countries and country states
     * @return country states
     */
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

    /**
     * Load the country states
     * @param countryId Country id
     */
    loadCountryStates(countryId: number): void {
        this._stateService.getCountryStates(countryId).subscribe( (res: HttpResponse) => {
            this.countryStates = res.data;
        })
    }

    /**
     * Login to agenthos
     * @param userToken User token
     */
    startSessionInAgethos(userToken: string): void {
        this._authService.startSessionInAgethos(userToken);
    }

    /**
     * Build de workspace form
     * @return Workspace form
     */
    private _buildWorkspaceForm(): FormGroup {
        return this._formBuilder.group({
            realName: ['', [Validators.required, Validators.minLength(REAL_NAME_LENGTH.MIN), Validators.maxLength(REAL_NAME_LENGTH.MAX), ValidatorsHelper.realName]],
            brandName: ['', [Validators.required, Validators.minLength(BRAND_NAME_LENGTH.MIN), Validators.maxLength(BRAND_NAME_LENGTH.MAX), ValidatorsHelper.brandName]],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: ['', [Validators.required, ValidatorsHelper.phoneNumber]],
            webSite: ['', [Validators.required, Validators.minLength(WEB_LINK_LENGTH.MIN), Validators.maxLength(WEB_LINK_LENGTH.MAX), ValidatorsHelper.webLink]],
            countryId: [{value: DEFAULT_COUNTRY_ID, disabled: true}],
            stateId: ['', [Validators.required]]
        });
    }

}
