import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { CreateWorkspaceService } from './create-workspace.service';

declare var $: any;
declare var Select2Plugin: any;

@Component({
  selector: 'agt-create-workspace',
  templateUrl: './create-workspace.page.html',
  styles: [
  ]
})
export class CreateWorkspacePage implements OnInit {
    selectCountriesId: string;
    selectCountryStatesId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public createWorkspaceService: CreateWorkspaceService,
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
        const control: AbstractControl | null = this.createWorkspaceService.workspaceForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.createWorkspaceService.workspaceForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Phone code id selected event to update the phone code id
     * @param phoneCodeId Phone code id
     */
    onPhoneCodeIdSelected(phoneCodeId: number): void {
        this.createWorkspaceService.workspaceForm.patchValue({phoneCodeId})
    }

    /**
     * Submit event to create workspace
     */
    onSubmitCreateWorkspace(): void {
        this._isFormSubmitted = true;
        if(this.createWorkspaceService.workspaceForm.valid) {
            this._loadingService.show();
            this.createWorkspaceService.createWorkspace().subscribe( (res: HttpResponse) => {
                this._loadingService.hide();
                this.createWorkspaceService.startSessionInAgenthos(res.data);
                AlertHelper.workspaceCreated(this._goToUploadWorkspaceAvatar, this);
            })
        }
    }

    /**
     * Navigates to upload workspace avatar
     * @param context Context
     */
    private _goToUploadWorkspaceAvatar(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.uploadWorkspaceAvatar);
    }

    /**
     * Load catalogs data
     */
    private _loadCatalogs(): void {
        this.createWorkspaceService.loadCatalogs().subscribe( () => {
            Select2Plugin.init();
            this._onChange(this.selectCountriesId);
            this._onChange(this.selectCountryStatesId);
        })
    }

    /**
     * Create a event change on selects
     * @param selectId Select id
     */
    private _onChange(selectId: string): void {
        $('select#'+selectId).on('change', (element: any) => {
            switch(selectId) {
                case this.selectCountriesId: this._onChangeCountryId(element.currentTarget.value); break;
                case this.selectCountryStatesId: this._onChangeStateId(element.currentTarget.value); break;
            }
        });
    }

    /**
     * Change event to update de form country id
     * @param value Country id
     */
    private _onChangeCountryId(value: number): void {
        this.createWorkspaceService.workspaceForm.patchValue({countryId: value});
        this.createWorkspaceService.workspaceForm.patchValue({stateId: ''});
        this.createWorkspaceService.loadCountryStates(value);
    }

    /**
     * Change event to update de form state id
     * @param  value State id
     */
    private _onChangeStateId(value: number): void {
        this.createWorkspaceService.workspaceForm.patchValue({stateId: value});
    }
}
