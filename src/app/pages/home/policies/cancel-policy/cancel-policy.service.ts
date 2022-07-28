import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DEFAULT_POLICY_CANCELLATION_REASON_ID } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';
import { PolicyCancellationReason } from '@interfaces/policy-cancellation-reason.interface';
import { PolicyService } from '@services/policy.service';
import { PolicyCancellationReasonService } from '@services/policy-cancellation-reason.service';

@Injectable()
export class CancelPolicyService {
    cancellationForm: UntypedFormGroup;
    policy: PolicyComplete | null;
    policyCancellationReasons: PolicyCancellationReason[];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _policyService: PolicyService,
        private _policyCancellationReasonService: PolicyCancellationReasonService
    ) {
        this.cancellationForm = this._formBuilder.group({});
        this.policy = null;
        this.policyCancellationReasons = [];
    }

    get f(): { [key: string]: AbstractControl } {
        return this.cancellationForm.controls;
    }

    /**
     * Build the cancelation form
     */
    buildCancellationForm(): void {
        this.cancellationForm = this._formBuilder.group({
            policyCancellationReasonId: [DEFAULT_POLICY_CANCELLATION_REASON_ID, [Validators.required]],
            evidenceFile: ['']
        })
    }

    /**
     * Cancel the policy
     * @param contactId The contact ID
     * @param policyId  The policy ID
     */
    cancelPolicy(contactId: string, policyId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._policyService.cancelPolicy(contactId, policyId, requestBody);
    }

    deleteActivePolicy(contactId: string, policyId: string): Observable<void> {
        return this._policyService.deleteActivePolicy(contactId, policyId);
    }

    /**
     * Load the policy data
     * @param contactId The contact ID
     * @param policyId  The policy ID
     * @return          Notice of action done
     */
    loadPolicy(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'policyId,policyStatusName,policyStatusBackground,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyUrl,coveredProperty,policyNumber,clientNumber,insurerName,titularName,titularRfc,titularPostalCode,titularPhoneNumber,emissionDate,validityStartDate,validityEndDate,policyAmount,currencyName,paymentMethodName,paymentPlanName,bills';
        return this._policyService.getContactPolicy(contactId, policyId, fields).pipe(
            tap((res: HttpResponse) => {
                this.policy = res.data;
            }),
            map(() => {})
        )
    }

    /**
     * Load the cancellation reasons of the policy
     * @return The policy cancellation reasons
     */
    loadPolicyCancellationReasons(): Observable<void> {
        return this._policyCancellationReasonService.getPolicyCancellationReasons().pipe(
            tap( (res: HttpResponse) => {
                this.policyCancellationReasons = res.data;
            }),
            map( () => { })
        )
    }

    /**
     * Get the request body
     * @return The request body
     */
    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('policyCancellationReasonId', this.f.policyCancellationReasonId.value);
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        return requestBody;
    }
}
