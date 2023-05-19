import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insurer } from '@interfaces/insurer.interface';
import { InsurerService } from '@services/insurer.service';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class UploadPolicyService {
    insurers: Insurer[];
    policyForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _insurerService: InsurerService,
        private _policyService: PolicyService
    ) {
        this.insurers = [];
        this.policyForm = this._formBuilder.group({});
    }

    get f(): { [key: string]: AbstractControl } {
        return this.policyForm.controls;
    }

    /**
     * Build the policy form
     */
    buildPolicyForm(): void {
        this.policyForm = this._formBuilder.group({
            file: ['', [Validators.required]],
            insurerId: ['', [Validators.required]],
        });
    }

    /**
     * Get the contact policy
     * @param  contactId The contact ID
     * @param  policyId  The policy
     * @return           The contact policy data
     */
    getContactPolicy(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const fields: string =
            'policyUrl,insurerId,insurerName,workspaceCountryId';
        return this._policyService.getContactPolicy(
            contactId,
            policyId,
            fields
        );
    }

    /**
     * Load the insurers
     * @return Notice of action done
     */
    loadInsurers(): Observable<void> {
        return this._insurerService.getInsurers().pipe(
            tap((res: HttpResponse) => {
                this.insurers = res.data;
            }),
            map(() => {})
        );
    }

    /**
     * Load the insurers
     * @return Notice of action done
     */
    loadCountryInsurers(countryId: number): Observable<void> {
        return this._insurerService.getCountryInsurers(countryId).pipe(
            tap((res: HttpResponse) => {
                this.insurers = res.data;
            }),
            map(() => {})
        );
    }
}
