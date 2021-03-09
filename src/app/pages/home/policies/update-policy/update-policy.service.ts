import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FREE_TEXT_LENGTH, OWN_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';
import { UpdateContactPolicyDataSend } from '@interfaces/update-contact-policy-data-send.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class UpdatePolicyService {
    policy: PolicyComplete | null;
    policyForm: FormGroup;

    constructor(
        private _datePipe: DatePipe,
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {
        this.policy = null;
        this.policyForm = this._formBuilder.group({});
    }

    /**
     * Load the policy data
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadPolicy(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'policyId,policyStatusName,policyStatusBackground,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,coveredProperty,policyNumber,clientNumber,insurerName,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,amount,currencyName,paymentMethodName,paymentPlanName,bills';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
                this._buildPolicyForm();
            }),
            map(() => {})
        )
    }

    /**
     * Update the contact policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @return           Notice of action done
     */
    updateContactPolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: UpdateContactPolicyDataSend = this.policyForm.value;
        return this._policyService.updateContactPolicy(contactId, policyId, requestBody);
    }

    /**
     * Build the policy form
     */
    private _buildPolicyForm(): void {
        if(!!this.policy) {
            this.policyForm = this._formBuilder.group({
                coveredProperty: [this.policy.coveredProperty || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                policyNumber: [this.policy.policyNumber || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                clientNumber: [this.policy.clientNumber || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                emissionDate: [this._getDateFormat(this.policy.emissionDate) || '', [Validators.required, ValidatorsHelper.date] ],
                validityStartDate: [this._getDateFormat(this.policy.validityStartDate) || '', [Validators.required, ValidatorsHelper.date] ],
                validityEndDate: [this._getDateFormat(this.policy.validityEndDate) || '', [Validators.required, ValidatorsHelper.date] ],
                titularName: [this.policy.titularName || '', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName] ],
                titularRfc: [this.policy.titularRfc || '', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText] ],
                titularPostalCode: [this.policy.titularPostalCode || '', [Validators.required, ValidatorsHelper.postalCode ] ],
                titularPhoneNumber: [this.policy.titularPhoneNumber || '', [ValidatorsHelper.phoneNumber] ],
            });
        }
    }

    /**
     * Get the date format
     * @param  date The date to format
     * @return      The formatted date
     */
    private _getDateFormat(date: string | null): string {
        let dateFormat: string = '';
        if(!!date) {
            const formattedDate: string | null = this._datePipe.transform(date, 'dd/MM/YYYY');
            dateFormat = (!!formattedDate) ? formattedDate : '';
        }
        return dateFormat;
    }

}
