import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import moment from 'moment';

import { FILE_TYPES, INSURANCE_GROUPS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { UpdatePolicyInsuredService } from './update-policy-insured.service';

declare var DatePickerPlugin: any;
declare var DropifyPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-update-policy-insured',
    templateUrl: './update-policy-insured.page.html',
    styles: [],
    providers: [UpdatePolicyInsuredService],
})
export class UpdatePolicyInsuredPage implements OnInit {
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    contactId: string = '';
    policyId: string = '';
    policyInsuredId: string = '';
    calendarIdValidityEndDate: string = 'validityEndDate';
    calendarIdValidityStartDate: string = 'validityStartDate';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdShowPolicy: string = 'agt-show-policy';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: UpdatePolicyInsuredService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
        this.model.loadCurrencies();
        this.model.loadGenders();
        this.model.loadPaymentMethods();
        this.model.loadPaymentPlans();
    }

    get objectNameLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Nombre del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Nombre de la Persona o Bien Asegurado';
                    break;
            }
        }
        return label;
    }

    get objectUsageLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                    label = 'Marca del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Uso del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Actividad Asegurada';
                    break;
            }
        }
        return label;
    }

    get objectDescriptionLabel(): string {
        let label: string = '';
        if (!!this.model.policy && !!this.model.policy.insuranceGroupId) {
            switch (this.model.policy.insuranceGroupId) {
                case INSURANCE_GROUPS.OBJECTS:
                    label = 'Características del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.MERCHANDISE:
                    label = 'Descripción del Bien Asegurado';
                    break;
                case INSURANCE_GROUPS.RC:
                    label = 'Descripción';
                    break;
            }
        }
        return label;
    }

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
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'insuredPolicyFile') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    updatePolicyInsured(): void {
        this._isFormSubmitted = true;
        if (!this.model.form.valid) {
            AlertHelper.invalidForm();
            return;
        }

        if (!this.model.checkPolicyAmounts()) {
            ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
            return;
        }

        this._loadingService.show();
        this.model
            .updatePolicyInsured(
                this.contactId,
                this.policyId,
                this.policyInsuredId
            )
            .subscribe(() => {
                this._loadingService.hide();
                this._router.navigateByUrl(
                    ROUTES_NAME.listPolicyInsureds(
                        this.contactId,
                        this.policyId
                    )
                );
                AlertHelper.policyInsuredUpdated();
            });
    }

    selectPolicyInsuredFile(event: any): void {
        if (event.target.files.length > 0) {
            const insuredPolicyFile = event.target.files[0];
            this.model.form.patchValue({ insuredPolicyFile });
        }
    }

    showPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
        this.policyInsuredId =
            this._activatedRoute.snapshot.params.policyInsuredId;
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
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

    private _loadPolicy(): void {
        this.model.loadPolicy(this.contactId, this.policyId).subscribe(() => {
            this.model
                .loadPolicyInsured(
                    this.contactId,
                    this.policyId,
                    this.policyInsuredId
                )
                .subscribe((_) => {
                    this.model.buildForm();
                    setTimeout(() => {
                        DropifyPlugin.init(['pdf'], true, '2M');
                    }, 0);
                    this._initCalendars();
                    PopoverPlugin.init();
                });
        });
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: UpdatePolicyInsuredPage
    ): void {
        context.model.form.patchValue({ [selectorId]: changedValue });
        if (
            selectorId === 'validityStartDate' ||
            selectorId === 'validityEndDate'
        ) {
            let validityStartDate: string = '';
            let validityEndDate: string = '';
            switch (selectorId) {
                case 'validityStartDate':
                    validityStartDate = changedValue;
                    validityEndDate = context.model.f.validityEndDate.value;
                    break;

                case 'validityEndDate':
                    validityStartDate = context.model.f.validityStartDate.value;
                    validityEndDate = changedValue;
                    break;
            }
            context._validValidityEndDate(
                context,
                validityStartDate,
                validityEndDate
            );
        }
    }

    private _validValidityEndDate(
        context: UpdatePolicyInsuredPage,
        validityStartDate: string,
        validityEndDate: string
    ): void {
        const validityStartDateAux = moment(validityStartDate, 'DD/MM/YYYY');
        const validityEndDateAux = moment(validityEndDate, 'DD/MM/YYYY');
        if (validityEndDateAux.isBefore(validityStartDateAux)) {
            context.model.f.validityEndDate.setErrors({
                invalidValidityEndDate: true,
            });
        }
    }
}
