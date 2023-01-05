import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import { FILE_TYPES, INSURANCE_GROUPS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { CreatePolicyInsuredService } from './create-policy-insured.service';

declare var DatePickerPlugin: any;
declare var DropifyPlugin: any;
declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-create-policy-insured',
  templateUrl: './create-policy-insured.page.html',
  styles: [
  ],
  providers: [CreatePolicyInsuredService]
})
export class CreatePolicyInsuredPage implements OnInit {
    INSURANCE_GROUPS: any = INSURANCE_GROUPS;
    contactId: string = '';
    policyId: string = '';
    calendarIdValidityEndDate: string = 'validityEndDate';
    calendarIdValidityStartDate: string = 'validityStartDate';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdShowPolicy: string = 'agt-show-policy';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: CreatePolicyInsuredService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this._loadPolicy();
        this.model.loadCurrencies();
        this.model.loadPaymentMethods();
        this.model.loadPaymentPlans();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'insuredPolicyFile') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    savePolicyInsured(): void {
        this._isFormSubmitted = true;
        if(!this.model.form.valid) {
            AlertHelper.invalidForm();
            return;
        }

        if(!this.model.checkPolicyAmounts()) {
            ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
            return;
        }

        this._loadingService.show();
        this.model.createPolicyInsured(this.contactId, this.policyId).subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.listPolicyInsureds(this.contactId, this.policyId));
            AlertHelper.policyInsuredCreated();
        });
    }

    selectPolicyInsuredFile(event: any): void {
        if (event.target.files.length > 0) {
            const insuredPolicyFile = event.target.files[0];
            this.model.form.patchValue({insuredPolicyFile});
        }
    }

    showPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdValidityStartDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdValidityEndDate, this._onChangeDate, this);
    }

    private _loadPolicy(): void {
        this.model.loadPolicy(this.contactId, this.policyId).subscribe(() => {
            this.model.buildForm();
            setTimeout(() => {
              DropifyPlugin.init(FILE_TYPES.DOCUMENT, ['pdf'], true, '2M');
            }, 0);
            this._initCalendars();
            PopoverPlugin.init();
        })
    }

    private _onChangeDate(selectorId: string, changedValue: string, context: CreatePolicyInsuredPage): void {
        context.model.form.patchValue({[selectorId]: changedValue});
        if(selectorId === 'validityStartDate' || selectorId === 'validityEndDate') {
            let validityStartDate: string = '';
            let validityEndDate: string = '';
            switch(selectorId) {
                case 'validityStartDate':
                    validityStartDate = changedValue;
                    validityEndDate = context.model.f.validityEndDate.value;
                break;

                case 'validityEndDate':
                    validityStartDate = context.model.f.validityStartDate.value;
                    validityEndDate = changedValue;
                break;
            }
            context._validValidityEndDate(context, validityStartDate, validityEndDate);
        }
    }

    private _validValidityEndDate(context: CreatePolicyInsuredPage, validityStartDate: string, validityEndDate: string): void {
        const validityStartDateAux = moment(validityStartDate, 'DD/MM/YYYY');
        const validityEndDateAux = moment(validityEndDate, 'DD/MM/YYYY');
        if(validityEndDateAux.isBefore(validityStartDateAux)) {
            context.model.f.validityEndDate.setErrors({invalidValidityEndDate: true});
        }
    }

}
