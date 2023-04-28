import { Injectable } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ACTION_TYPES, FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { InsuranceType } from '@interfaces/insurance-type.interface';
import { InsuranceTypeService } from '@services/insurance-type.service';

@Injectable()
export class ModalGetPolicyDetailsService {
    insuranceTypes: InsuranceType[] = [];
    policyDetailsForm: UntypedFormGroup = this._formBuilder.group({});

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _insuranceTypeService: InsuranceTypeService
    ) {}

    get f() {
        return this.policyDetailsForm.controls;
    }

    /**
     * Build the policy details form based on the type of action
     * @param actionType The action type
     */
    buildPolicyDetailsForm(actionType: number): void {
        switch (actionType) {
            case ACTION_TYPES.CREATE_QUOTATION:
                this._buildPolicyDetailsFormToCreateQuotation();
                break;

            case ACTION_TYPES.CREATE_POLICY:
                this._buildPolicyDetailsFormToCreatePolicy();
                break;
        }
    }

    /**
     *  Load the insurance types of an insurance
     * @param  insuranceId The insurance ID
     * @return             Notice of action done
     */
    loadInsuranceTypes(insuranceId: number): Observable<void> {
        const fields: string = 'insuranceTypeId,name';
        return this._insuranceTypeService
            .getInsuranceTypes(insuranceId, fields)
            .pipe(
                tap((res: HttpResponse) => {
                    this.insuranceTypes = res.data;
                    this.policyDetailsForm.patchValue({
                        insuranceTypeId: this.insuranceTypes[0].insuranceTypeId,
                    });
                }),
                map(() => {
                    return;
                })
            );
    }

    /**
     * Build the policy details form to create policy
     */
    private _buildPolicyDetailsFormToCreatePolicy(): void {
        this.policyDetailsForm = this._formBuilder.group({
            insuranceTypeId: ['', [Validators.required]],
        });
    }

    /**
     * Build the policy details form to create quotation
     */
    private _buildPolicyDetailsFormToCreateQuotation(): void {
        this.policyDetailsForm = this._formBuilder.group({
            description: [
                '',
                [
                    Validators.required,
                    Validators.minLength(FREE_TEXT_LENGTH.MIN),
                    Validators.maxLength(FREE_TEXT_LENGTH.MAX),
                    ValidatorsHelper.freeText,
                ],
            ],
            insuranceTypeId: ['', [Validators.required]],
        });
    }
}
