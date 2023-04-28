import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import {
    DEFAULT_PHONE_CODE_ID,
    DEFAULT_COUNTRY_ID,
    REAL_NAME_LENGTH,
    BRAND_NAME_LENGTH,
    EMAIL_LENGTH,
} from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Country } from '@interfaces/country.interface';
import { CreateWorkspaceDataSend } from '@interfaces/create-workspace-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { State } from '@interfaces/state.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { AuthService } from '@core/services/auth.service';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class CreateWorkspaceService {
    countries: Country[];
    countryStates: State[];
    workspaceForm: UntypedFormGroup;

    constructor(
        private _authService: AuthService,
        private _countryService: CountryService,
        private _formBuilder: UntypedFormBuilder,
        private _stateService: StateService,
        private _workspaceService: WorkspaceService
    ) {
        this.countries = [];
        this.countryStates = [];
        this.workspaceForm = this._buildWorkspaceForm();
    }

    /**
     * Get the form controls
     * @return Form controls
     */
    get f(): { [key: string]: AbstractControl } {
        return this.workspaceForm.controls;
    }

    /**
     * Create a workspace
     * @return New user token data
     */
    createWorkspace(): Observable<HttpResponse> {
        const requestBody: CreateWorkspaceDataSend = {
            ...this.workspaceForm.value,
            countryId: this.f.countryId.value, // Remove if the field is not disabled
        };
        return this._workspaceService.createWorkspace(requestBody);
    }

    /**
     * Load the data from catalogs countries and country states
     * @return country states
     */
    loadCatalogs(): Observable<HttpResponse> {
        return this._countryService.getCountries().pipe(
            mergeMap((resCountries: HttpResponse) => {
                this.countries = resCountries.data;
                return this._stateService
                    .getCountryStates(this.f.countryId.value)
                    .pipe(
                        tap((resCountryStates: HttpResponse) => {
                            this.countryStates = resCountryStates.data;
                        })
                    );
            })
        );
    }

    /**
     * Load the country states
     * @param countryId Country id
     */
    loadCountryStates(countryId: number): void {
        this._stateService
            .getCountryStates(countryId)
            .subscribe((res: HttpResponse) => {
                this.countryStates = res.data;
            });
    }

    /**
     * Login to Agenthos
     * @param  userToken User token
     * @return          User token data
     */
    startSessionInAgenthos(userToken: string): UserTokenData {
        return this._authService.startSessionInAgenthos(userToken);
    }

    /**
     * Build de workspace form
     * @return Workspace form
     */
    private _buildWorkspaceForm(): UntypedFormGroup {
        return this._formBuilder.group({
            realName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(REAL_NAME_LENGTH.MIN),
                    Validators.maxLength(REAL_NAME_LENGTH.MAX),
                    ValidatorsHelper.realName,
                ],
            ],
            brandName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(BRAND_NAME_LENGTH.MIN),
                    Validators.maxLength(BRAND_NAME_LENGTH.MAX),
                    ValidatorsHelper.brandName,
                ],
            ],
            phoneCodeId: [DEFAULT_PHONE_CODE_ID],
            phoneNumber: [
                '',
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
            countryId: [DEFAULT_COUNTRY_ID, [Validators.required]],
            stateId: ['', [Validators.required]],
        });
    }
}
