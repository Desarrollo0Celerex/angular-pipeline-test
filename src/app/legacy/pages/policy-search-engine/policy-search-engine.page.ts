import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { HttpError } from '@interfaces/http-error.interface';

import { Policy } from '@core/interfaces/policy.interface';

import { PolicySearchEngineService } from './policy-search-engine.service';

@Component({
    selector: 'agt-policy-search-engine',
    templateUrl: './policy-search-engine.page.html',
    styles: [],
    providers: [PolicySearchEngineService],
})
export class PolicySearchEnginePage implements OnInit {
    policy: Policy | null = null;
    errorMessage: string = '';
    private _isFormSubmitted: boolean = false;

    constructor(public model: PolicySearchEngineService) {}

    ngOnInit(): void {}

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    searchWorkspacePolicy(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this.policy = null;
            this.errorMessage = '';
            this.model.searchWorkspacePolicy().subscribe(
                (res: HttpResponse) => {
                    this.policy = res.data;
                },
                (error: HttpError) => {
                    switch (error.error) {
                        case 'WorkspacePolicyNotFound':
                            this.errorMessage = 'Póliza NO encontrada';
                            break;

                        default:
                            this.errorMessage = 'Ocurrio un error desconocido';
                            break;
                    }
                }
            );
        }
    }
}
