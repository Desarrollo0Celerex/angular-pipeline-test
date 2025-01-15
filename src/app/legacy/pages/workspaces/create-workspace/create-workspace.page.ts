import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { CreateWorkspaceService } from './create-workspace.service';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';

declare var $: any;
declare var Select2Plugin: any;

@Component({
    selector: 'agt-create-workspace',
    templateUrl: './create-workspace.page.html',
    styles: [],
    standalone: false
})
export class CreateWorkspacePage implements OnInit {
    selectCountriesId: string;
    selectCountryStatesId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public model: CreateWorkspaceService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.selectCountriesId = 'agt-countries';
        this.selectCountryStatesId = 'agt-country-states';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._loadCatalogs();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.workspaceForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.workspaceForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    loadCountryStates(): void {
        this.model.f.stateId.setValue(null);
        this.model.loadCountryStates(this.model.f.countryId.value);
    }

    /**
     * Phone code id selected event to update the phone code id
     * @param phoneCodeId Phone code id
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.model.workspaceForm.patchValue({ phoneCodeId });
    }

    /**
     * Submit event to create workspace
     */
    onSubmitCreateWorkspace(): void {
        this._isFormSubmitted = true;
        if (this.model.workspaceForm.valid) {
            this._loadingService.show();
            this.model.createWorkspace().subscribe((res: string) => {
                const userTokenData: UserTokenData =
                    this.model.startSessionInAgenthos(res);
                // Login to firebase
                this.model
                    .getFirebaseToken(
                        userTokenData.workspaceId,
                        userTokenData.userId
                    )
                    .subscribe((res: string) => {
                        this.model
                            .startSessionInFirebase(res)
                            .then(() => {
                                this._loadingService.hide();
                                AlertHelper.workspaceCreated(
                                    this._goToDashboard,
                                    this
                                );
                            })
                            .catch(() => {
                                this._loadingService.hide();
                                this.model.logout();
                            });
                    });
                /* this._loadingService.hide();
                    this.model.startSessionInAgenthos(res);
                    AlertHelper.workspaceCreated(
                        this._goToActivateWorkspace,
                        this
                    ); */
            });
        }
    }

    private _goToDashboard(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
    }

    /**
     * Load catalogs data
     */
    private _loadCatalogs(): void {
        this.model.loadCatalogs().subscribe(() => {
            Select2Plugin.init();
            this._onChange(this.selectCountriesId);
            this._onChange(this.selectCountryStatesId);
        });
    }

    /**
     * Create a event change on selects
     * @param selectId Select id
     */
    private _onChange(selectId: string): void {
        $('select#' + selectId).on('change', (element: any) => {
            switch (selectId) {
                case this.selectCountriesId:
                    this._onChangeCountryId(element.currentTarget.value);
                    break;
                case this.selectCountryStatesId:
                    this._onChangeStateId(element.currentTarget.value);
                    break;
            }
        });
    }

    /**
     * Change event to update de form country id
     * @param value Country id
     */
    private _onChangeCountryId(value: number): void {
        this.model.workspaceForm.patchValue({
            countryId: value,
        });
        this.model.workspaceForm.patchValue({ stateId: '' });
        this.model.loadCountryStates(value);
    }

    /**
     * Change event to update de form state id
     * @param  value State id
     */
    private _onChangeStateId(value: number): void {
        this.model.workspaceForm.patchValue({
            stateId: value,
        });
    }
}
