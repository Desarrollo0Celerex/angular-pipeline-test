import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { CreateSinister } from '@interfaces/create-sinister.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { SinisterType } from '@interfaces/sinister-type.interface';

import { SHORT_ALPHANUMERIC_LENGTH, LONG_ALPHANUMERIC_LENGTH, FREE_TEXT_LENGTH } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { AuthService } from '@services/auth.service';
import { PolicyService } from '@services/policy.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterTypeService } from '@services/sinister-type.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

@Injectable()
export class ModalCreateSinisterService {
    sinisterForm: UntypedFormGroup = this._buildSinisterForm();
    sinisterTypes: SinisterType[] = [];

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _policyService: PolicyService,
        private _sinisterService: SinisterService,
        private _sinisterTypeService: SinisterTypeService,
        private _workspaceUserService: WorkspaceUserService,
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.sinisterForm.controls;
    }

    /**
     * Create a sinister
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @return           Notice of action done
     */
    createSinister(contactId: string, policyId: string): Observable<HttpResponse> {
        const requestBody: CreateSinister = this.sinisterForm.value;
        return this._sinisterService.createSinister(contactId, policyId, requestBody);
    }

    getPolicyContactId(policyId: string): Observable<string> {
        const fields: string = 'contactId';
        return this._policyService.getWorkspacePolicy(policyId, fields).pipe(
            map((res: HttpResponse) => {
                return res.data.contactId;
            })
        )
    }

    getPolicyInsuranceId(contactId: string, policyId: string): Observable<number> {
        const fields: string = 'insuranceId';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            map((res: HttpResponse) => {
                return res.data.insuranceId;
            })
        )
    }

    /**
     * Load the sinister types
     * @param insuranceId The insurance ID
     */
    loadSinisterTypes(insuranceId: number): void {
        const fields: string = 'sinisterTypeId,name';
        this._sinisterTypeService.getSinisterTypes(insuranceId, fields).subscribe( (res: HttpResponse) => {
            this.sinisterTypes = res.data;
        })
    }

    loadWorkspaceUser(): void {
        const userId: string = this._authService.userId;
        const fields: string = 'shortName';
        this._workspaceUserService.getWorkspaceUser(userId, fields).subscribe( (res: HttpResponse) => {
            this.sinisterForm.patchValue({'manager': res.data.shortName});
        })
    }

    /**
     * Build the sinister form
     * @return The sinister form
     */
    private _buildSinisterForm(): UntypedFormGroup {
        return this._formBuilder.group({
            internalNumber: [this._generateInternalNumber(), [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX)]],
            manager: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
            sinisterNumber: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            invoice: ['', [Validators.required, ValidatorsHelper.alphanumericWithHyphens, Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX)]],
            sinisterDate: ['', [Validators.required, ValidatorsHelper.date]],
            notificationDate: ['', [Validators.required, ValidatorsHelper.date]],
            sinisterTypeId: ['', [Validators.required]],
            location: ['', [Validators.required, ValidatorsHelper.freeText, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX)]],
        });
    }

    private _generateInternalNumber(): string {
        const currentDate: string = moment().format('DDMMYY');
        return 'SIN-'+currentDate+'-'+UtilitiesHelper.generateKey(6);
    }
}
