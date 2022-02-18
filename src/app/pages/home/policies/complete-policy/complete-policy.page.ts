import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ERROR_CODES } from '@constants/error-codes';
import { DOCUMENT_FORMATS, FILE_TYPES, POLICY_SOURCES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { Policy } from '@interfaces/policy.interface';
import { LoadingService } from '@services/loading.service';
import { ScanningService } from '@services/scanning.service';

import { CompletePolicyService } from './complete-policy.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-complete-policy',
  templateUrl: './complete-policy.page.html',
  styles: [
  ]
})
export class CompletePolicyPage implements OnInit {
    contactId: string;
    message: string;
    policyId: string;
    modalIdBasePoliciDataLoaded: string = 'agt-base-policy-data-loaded';
    modalIdInvalidExpiredPolicy: string = 'agt-invalid-expired-policy';
    modalIdInvalidHistoryPolicy: string = 'agt-invalid-history-policy';
    modalIdPolicyAmountsDifferent: string = 'agt-policy-amounts-different';
    modalIdSelectFile: string;
    modalIdScanningPolicy: string;
    modalIdScanningPolicyFailed: string;
    modalIdScanningPolicySuccess: string;
    modalIdShowPolicy: string;
    modalSelectFileData: ModalSelectFileData;
    emissionDateCalendarId: string;
    validityEndDateCalendarId: string;
    validityStartDateCalendarId: string;
    private _isFormSubmitted: boolean;
    private _scannedPolicyData: Policy | null = null;

    constructor(
        public completePolicyService: CompletePolicyService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
        private _scanningService: ScanningService,
    ) {
        this.emissionDateCalendarId = 'emissionDate';
        this.contactId = '';
        this.message = 'Verfica los datos para la nueva póliza de';
        this.policyId = '';
        this.modalIdSelectFile = 'agt-select-file';
        this.modalIdScanningPolicy = 'agt-scanning-policy';
        this.modalIdScanningPolicyFailed = 'agt-scanning-policy-failed';
        this.modalIdScanningPolicySuccess = 'agt-scanning-policy-success';
        this.modalIdShowPolicy = 'agt-show-policy';
        this.modalSelectFileData = {
            title: 'Actualizar Póliza',
            description: 'Selecciona el formato digital de la póliza.',
            buttonLabel: 'Cargar poliza',
            formats: DOCUMENT_FORMATS,
            fileType: FILE_TYPES.DOCUMENT
        }
        this.validityEndDateCalendarId = 'validityEndDate';
        this.validityStartDateCalendarId = 'validityStartDate';
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadContactPolicy();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.completePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.completePolicyService.policyForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Change event to calculate the bills
     */
    onChangeCalculateBills(): void {
        this._calculateBills();
    }

    /**
     * Click event to show modal to select policy
     */
    onClickSelectPolicy(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

    /**
     * Click event to show modal to view the policy
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to load the data of the scanned policy
     */
    onLoadScannedPolicyData(): void {
        this.completePolicyService.buildPolicyForm(this._scannedPolicyData);
        this._calculateBills();
    }

    /**
     * Event to update the form policy file
     */
    onPolicySelected(policyFile: File): void {
        this.completePolicyService.policyForm.patchValue({policyFile: policyFile});
        this._scannPolicy(policyFile);
    }

    /**
     * Submit event to save policy
     */
    onSubmitSavePolicy(): void {
        this._isFormSubmitted = true;
        if(!this.completePolicyService.policyForm.valid) {
            return;
        }
        // Check the policy amounts
        if(!this.completePolicyService.checkPolicyAmounts()) {
            ModalPlugin.show(this.modalIdPolicyAmountsDifferent);
            return;
        }
        // Check if it is a new policy
        if(this.completePolicyService.checkIsNewPolicy()) {
            // Check if it is a expired policy
            if(this.completePolicyService.checkIsExpiredPolicy()) {
                // Check if it is a valid expired policy
                if(!this.completePolicyService.checkIsValidExpiredPolicy()) {
                    ModalPlugin.show(this.modalIdInvalidExpiredPolicy);
                    return;
                }
            }
        } else {
            // Check if the policy is a history policy
            if(this.completePolicyService.checkIsHistoryPolicy()) {
                // Check if it is a valid history policy
                if(!this.completePolicyService.checkIsValidHistoryPolicy()) {
                    ModalPlugin.show(this.modalIdInvalidHistoryPolicy);
                    return;
                }
            }
        }
        // Complete the policy
        this._loadingService.show();
        this.completePolicyService.completePolicy(this.contactId, this.policyId, this._scannedPolicyData).subscribe( () => {
            this._loadingService.hide();
            AlertHelper.policyCompleted(this._goToListContactPolicies, this);
        });
    }

    /**
     * Calculate the bills
     */
    private _calculateBills(): void {
        this.completePolicyService.calculateBills();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _downloadPolicy(policyUrl: string): void {
        this.completePolicyService.downloadPolicy(policyUrl).subscribe( (res: any) => {
            this._scannPolicy(res, policyUrl);
        })
    }

    /**
     * Navigates to list contact policies
     * @param context The app context
     */
    private _goToListContactPolicies(context: CompletePolicyPage): void {
        context._router.navigateByUrl(ROUTES_NAME.listContactPolicies(context.contactId));
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.emissionDateCalendarId, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.validityStartDateCalendarId, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.validityEndDateCalendarId, this._onChangeDate, this);
    }

    /**
     * Load the contact policy
     */
    private _loadContactPolicy(): void {
        this._scanningService.show();
        this.completePolicyService.getContactPolicy(this.contactId, this.policyId).subscribe( (res: HttpResponse) => {
            this._downloadPolicy(res.data.policyUrl);
            this.completePolicyService.buildPolicyForm(res.data);
            this._initCalendars();
            this._loadCurrencies();
            this._loadPaymentMethods();
            this._loadPaymentPlans();
        })
    }

    /**
     * Load the currencies
     */
    private _loadCurrencies(): void {
        this.completePolicyService.loadCurrencies().subscribe( () => {
        })
    }

    /**
     * Load the payment methods
     */
    private _loadPaymentMethods(): void {
        this.completePolicyService.loadPaymentMethods().subscribe( () => {
        })
    }

    /**
     * Load the payment plans
     */
    private _loadPaymentPlans(): void {
        this.completePolicyService.loadPaymentPlans().subscribe( () => {
            this._calculateBills();
        })
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: CompletePolicyPage): void {
        context.completePolicyService.policyForm.patchValue({[selectorId]: changedValue});
        context.completePolicyService.calculateBills();
    }

    /**
     * Scan the policy file
     * @param policyFile The policy file to scan
     */
    private _scannPolicy(policyFile: any, policyUrl: string = ''): void {
        this._scanningService.show();
        this.completePolicyService.scannPolicy(policyFile).subscribe( (res: HttpResponse) => {
            this._scanningService.hide();
            ModalPlugin.show(this.modalIdScanningPolicySuccess);
            this._scannedPolicyData = res.data;
            this._reviewPolicyData(policyUrl);
        }, (error: HttpError) => {
            this._handleScanError(error, policyUrl);
        });
    }

    private _handleScanError(error: HttpError, policyUrl: string): void {
        this._reviewPolicyData(policyUrl);
        switch(error.error) {
            case ERROR_CODES.scanFileError:
                if(!!this.completePolicyService.policy && (this.completePolicyService.policy.policySourceId === POLICY_SOURCES.RENEWAL || this.completePolicyService.policy.policySourceId === POLICY_SOURCES.REISSUE) ) {
                    this.completePolicyService.getContactBasePolicy(this.completePolicyService.policy.baseContactId, this.completePolicyService.policy.basePolicyId).subscribe((res: HttpResponse) => {
                        this.completePolicyService.buildPolicyForm(res.data);
                        setTimeout(() => {
                            this._scanningService.hide();
                            ModalPlugin.show(this.modalIdBasePoliciDataLoaded);
                        }, 1000);
                    })
                } else {
                    setTimeout(() => {
                        this._scanningService.hide();
                        ModalPlugin.show(this.modalIdScanningPolicyFailed);
                    }, 1000);
                }
            break;

            default:
                setTimeout(() => {
                    this._scanningService.hide();
                    ModalPlugin.show(this.modalIdScanningPolicyFailed);
                }, 1000);
        }
    }

    /**
     * Review the policy data to see if a field is missing
     */
    private _reviewPolicyData(policyUrl: string): void {
        const missingFields: string[] = this._getMissingFields();
        const totalMissingFields: number = missingFields.length;
        if(totalMissingFields > 0) {
            this.completePolicyService.createScannerLog(this.contactId, this.policyId, policyUrl, totalMissingFields, missingFields.join(',')).subscribe(() => {
            });
        }
    }

    /**
     * Get the missing fields
     * @return The missing fields
     */
    private _getMissingFields(): string[] {
        let missingFields: string[] = [];
        if(!!this._scannedPolicyData) {
            const data: any = this._scannedPolicyData;
            for(const field in data) {
                if(data[field] == '') {
                    missingFields.push(field);
                }
            }
        } else {
            missingFields = [
                'coveredProperty',
                'coveredPropertyBrand',
                'coveredPropertyId',
                'coveredPropertyAge',
                'coveredPropertyPlan',
                'agentNumber',
                'policyNumber',
                'clientNumber',
                'titularName',
                'titularRfc',
                'titularPostalCode',
                'titularPhoneNumber',
                'titularAge',
                'titularGenderId',
                'emissionDate',
                'validityStartDate',
                'validityEndDate',
                'netPay',
                'taxPay',
                'feePay',
                'coverPay',
                'extraPay',
                'firstPayment',
                'policyAmount',
                'currencyId',
                'paymentMethodId',
                'paymentPlanId'
            ];
        }
        return missingFields;
    }

}
