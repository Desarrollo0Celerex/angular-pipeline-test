import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { PolicyService } from '@services/policy.service';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';

@Injectable()
export class ModalSearchContactPolicyService {
    searchForm: UntypedFormGroup = this._buildSearchForm();

    constructor(
        private _formbuilder: UntypedFormBuilder,
        private _policyService: PolicyService
    ) { }

    get f(): { [key: string]: AbstractControl } {
        return this.searchForm.controls;
    }

    /**
     * Search the policy
     * @return The policies
     */
    /**
     * Search the contact policy
     * @param  contactId The contact ID
     * @return           The contact policies
     */
    searchContactPolicy(contactId: string): Observable<HttpResponse> {
        const page: number = 1;
        const fields: string = 'policyId,contactId,policyStatusName,policyStatusBackground,policyNumber,validityStartDate,validityEndDate,totalAmount,currencyName,insuranceId';
        const filters: number [] = [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED, POLICY_STATUS.CANCELLED];
        const query: string = 'policyNumber: ' + this.f.policyNumber.value.trim();
        return this._policyService.getContactPolicies(contactId, page, fields, filters, query);
    }

    /**
     * Build the search form
     * @return The search form
     */
    private _buildSearchForm(): UntypedFormGroup {
        return this._formbuilder.group({
            policyNumber: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]]
        })
    }
}
