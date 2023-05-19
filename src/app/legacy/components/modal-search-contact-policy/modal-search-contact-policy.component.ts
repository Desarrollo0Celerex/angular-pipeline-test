import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalSearchContactPolicyService } from './modal-search-contact-policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-search-contact-policy',
    templateUrl: './modal-search-contact-policy.component.html',
    styles: [],
})
export class ModalSearchContactPolicyComponent {
    @Input() contactId: string = '';
    @Input() message: string = '';
    @Input() modalId: string = '';
    @Output() policyFound: EventEmitter<Policy> = new EventEmitter<Policy>();
    foundPolicies: Policy[] = [];
    isNoResults: boolean = false;
    modalIdSelectPolicy: string = 'agt-select-policy';
    private _isFormSubmitted: boolean = false;

    constructor(
        public modalSearchContactPolicyService: ModalSearchContactPolicyService,
        private _loadingService: LoadingService
    ) {}

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.modalSearchContactPolicyService.searchForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.modalSearchContactPolicyService.searchForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        this.isNoResults = false;
        ModalPlugin.hide(this.modalId);
        this._resetSearchForm();
    }

    /**
     * Event to catch the selected policy
     * @param policy The selected policy
     */
    onPolicySelected(policy: Policy): void {
        this.policyFound.emit(policy);
    }

    /**
     * Submit event to search the policy
     */
    onSubmitSearchPolicy(): void {
        this._isFormSubmitted = true;
        if (this.modalSearchContactPolicyService.searchForm.valid) {
            this._loadingService.show();
            this.modalSearchContactPolicyService
                .searchContactPolicy(this.contactId)
                .subscribe((res: HttpResponse) => {
                    const totalFoundPolicies: number = res.data.items.length;
                    // If there are no policies
                    if (totalFoundPolicies === 0) {
                        this.isNoResults = true;
                        this._resetSearchForm(
                            this.modalSearchContactPolicyService.f.policyNumber
                                .value
                        );
                    } else {
                        this.isNoResults = false;
                        ModalPlugin.hide(this.modalId);
                        this._resetSearchForm();
                        // If the policy was found
                        if (totalFoundPolicies === 1) {
                            this.policyFound.emit(res.data.items[0]);
                        }
                        // If there are multiple policies
                        else {
                            this.foundPolicies = res.data.items;
                            ModalPlugin.show(this.modalIdSelectPolicy);
                        }
                    }
                    setTimeout(() => {
                        this._loadingService.hide();
                    }, 250);
                });
        }
    }

    /**
     * Reset the search form
     */
    private _resetSearchForm(policyNumber: string = ''): void {
        this._isFormSubmitted = false;
        this.modalSearchContactPolicyService.searchForm.reset({ policyNumber });
    }
}
