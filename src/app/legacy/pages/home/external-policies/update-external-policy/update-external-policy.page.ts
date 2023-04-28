import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { ExternalPolicy } from '@interfaces/external-policy.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading.service';

declare var DatePickerPlugin: any;
declare var PopoverPlugin: any;
declare var ModalPlugin: any;

import { UpdateExternalPolicyService } from './update-external-policy.service';

@Component({
    selector: 'agt-update-external-policy',
    templateUrl: './update-external-policy.page.html',
    styles: [],
    providers: [UpdateExternalPolicyService],
})
export class UpdateExternalPolicyPage implements OnInit {
    calendarIdEmissionDate: string = 'emissionDate';
    calendarIdValidityEndDate: string = 'validityEndDate';
    calendarIdValidityStartDate: string = 'validityStartDate';
    contactId: string = '';
    externalPolicyId: string = '';
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _updateExternalPolicyService: UpdateExternalPolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadExternalPolicy();
    }

    get model(): UpdateExternalPolicyService {
        return this._updateExternalPolicyService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
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

    reloadInsuranceTypes(): void {
        this.model.f.insuranceTypeId.setValue(null);
        this._loadInsuranceTypes();
    }

    showPolicyFile(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    updateExternalPolicy(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.model
                .updateExternalPolicy(this.contactId, this.externalPolicyId)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.policyUpdated(
                        this._goToListContactPolicies,
                        this
                    );
                });
        }
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.externalPolicyId =
            this._activatedRoute.snapshot.params.externalPolicyId;
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: UpdateExternalPolicyPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.contactId)
        );
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdEmissionDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdValidityStartDate,
            this._onChangeDate,
            this
        );
        DatePickerPlugin.initElement(
            this.calendarIdValidityEndDate,
            this._onChangeDate,
            this
        );
    }

    private _loadExternalPolicy(): void {
        this.model
            .loadExternalPolicy(this.contactId, this.externalPolicyId)
            .subscribe((externalPolicy: ExternalPolicy) => {
                PopoverPlugin.init();
                this.model.buildForm(externalPolicy);
                this.model.loadInsurers();
                this._loadInsurances();
                this._initCalendars();
                this.model.loadCurrencies();
                this.model.loadPaymentMethods();
                this.model.loadPaymentPlans();
            });
    }

    /**
     * Load the insurances
     */
    private _loadInsurances(): void {
        this.model.loadInsurances().subscribe(() => {
            this._loadInsuranceTypes();
        });
    }

    /**
     * Load the insurance types
     */
    private _loadInsuranceTypes(): void {
        const insuranceId: number = this.model.f.insuranceId.value;
        this.model.loadInsuranceTypes(insuranceId);
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: UpdateExternalPolicyPage
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
    }
}
