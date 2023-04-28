import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
    EMAIL_LENGTH,
    FILE_NAME_LENGTH,
    LONG_ALPHANUMERIC_LENGTH,
    MULTITEXT_LENGTH,
    OWN_NAME_LENGTH,
    SINISTER_EVENT_TYPES,
    INSURANCE_GROUPS,
} from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Currency } from '@interfaces/currency.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { SinisterEvent } from '@interfaces/sinister-event.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';

import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { SinisterEventService } from '@services/sinister-event.service';
import { SinisterResolution } from '@interfaces/sinister-resolution.interface';
import { SinisterResolutionService } from '@services/sinister-resolution.service';

@Injectable()
export class ModalUpdateSinisterEventService {
    currencies: Currency[] = [];
    isBuiltForm: boolean = false;
    form: UntypedFormGroup = this._formBuilder.group({});
    paymentMethods: PaymentMethod[] = [];
    sinisterEvent: SinisterEvent | null = null;
    sinisterResolutions: SinisterResolution[] = [];

    constructor(
        private _currencyService: CurrencyService,
        private _formBuilder: UntypedFormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _sinisterEventService: SinisterEventService,
        private _sinisterResolutionService: SinisterResolutionService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * Get the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   The sinister event
     */
    getSinisterEvent(
        sinisterEventData: SinisterEventDataSend
    ): Observable<SinisterEvent> {
        const fields: string =
            'sinisterEventTypeId,evidenceName,providerName,providerDate,valuationDate,authorizationDate,insuredNoticeDate,insuredAuthorizationDate,estimatedDeliveryDate,repairDate,deliveryDate,readmissionDate,providerFolio,providerBill,providerPhoneCodeId,providerPhoneNumber,providerEmail,observations,canNotifyInsured,sinisterResolutionId,currencyId,paymentMethodId,insuranceGroupId,sumInsuredChassis,deductibleChassis,sumInsuredAdaptation,deductibleAdaptation';
        return this._sinisterEventService
            .getSinisterEvent(sinisterEventData, fields)
            .pipe(
                tap((res: SinisterEvent) => {
                    this.sinisterEvent = res;
                })
            );
    }

    /**
     * Populate the sinister event form
     * @param sinisterEvent The sinister event
     */
    fillForm(sinisterEvent: SinisterEvent): void {
        sinisterEvent.sinisterEventTypeId = parseInt(
            sinisterEvent.sinisterEventTypeId.toString()
        );
        switch (sinisterEvent.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                this.form = this._formBuilder.group({
                    canNotifyInsured: [
                        sinisterEvent.canNotifyInsured,
                        [Validators.required],
                    ],
                    evidenceName: [
                        sinisterEvent.evidenceName,
                        [
                            Validators.minLength(FILE_NAME_LENGTH.MIN),
                            Validators.maxLength(FILE_NAME_LENGTH.MAX),
                            ValidatorsHelper.fileName,
                        ],
                    ],
                    evidenceFile: [''],
                    providerName: [
                        sinisterEvent.providerName,
                        [
                            Validators.required,
                            Validators.minLength(OWN_NAME_LENGTH.MIN),
                            Validators.maxLength(OWN_NAME_LENGTH.MAX),
                            ValidatorsHelper.ownName,
                        ],
                    ],
                    providerDate: [
                        sinisterEvent.providerDate,
                        [Validators.required, ValidatorsHelper.date],
                    ],
                    valuationDate: [
                        sinisterEvent.valuationDate,
                        [ValidatorsHelper.date],
                    ],
                    authorizationDate: [
                        sinisterEvent.authorizationDate,
                        [ValidatorsHelper.date],
                    ],
                    insuredNoticeDate: [
                        sinisterEvent.insuredNoticeDate,
                        [ValidatorsHelper.date],
                    ],
                    insuredAuthorizationDate: [
                        sinisterEvent.insuredAuthorizationDate,
                        [ValidatorsHelper.date],
                    ],
                    estimatedDeliveryDate: [
                        sinisterEvent.estimatedDeliveryDate,
                        [ValidatorsHelper.date],
                    ],
                    repairDate: [
                        sinisterEvent.repairDate,
                        [ValidatorsHelper.date],
                    ],
                    deliveryDate: [
                        sinisterEvent.deliveryDate,
                        [ValidatorsHelper.date],
                    ],
                    readmissionDate: [
                        sinisterEvent.readmissionDate,
                        [ValidatorsHelper.date],
                    ],
                    providerFolio: [
                        sinisterEvent.providerFolio,
                        [
                            ValidatorsHelper.alphanumeric,
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX),
                        ],
                    ],
                    providerBill: [
                        sinisterEvent.providerBill,
                        [ValidatorsHelper.amount],
                    ],
                    providerPhoneCodeId: [sinisterEvent.providerPhoneCodeId],
                    providerPhoneNumber: [
                        sinisterEvent.providerPhoneNumber,
                        [ValidatorsHelper.phoneNumber],
                    ],
                    providerEmail: [
                        sinisterEvent.providerEmail,
                        [
                            Validators.email,
                            Validators.minLength(EMAIL_LENGTH.MIN),
                            Validators.maxLength(EMAIL_LENGTH.MAX),
                        ],
                    ],
                    observations: [
                        sinisterEvent.observations,
                        [
                            Validators.required,
                            Validators.minLength(MULTITEXT_LENGTH.MIN),
                            Validators.maxLength(MULTITEXT_LENGTH.MAX),
                            ValidatorsHelper.multitext,
                        ],
                    ],
                });
                break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                this.form = this._formBuilder.group({
                    canNotifyInsured: [
                        sinisterEvent.canNotifyInsured,
                        [Validators.required],
                    ],
                    evidenceName: [
                        sinisterEvent.evidenceName,
                        [
                            Validators.minLength(FILE_NAME_LENGTH.MIN),
                            Validators.maxLength(FILE_NAME_LENGTH.MAX),
                            ValidatorsHelper.fileName,
                        ],
                    ],
                    evidenceFile: [''],
                    providerName: [
                        sinisterEvent.providerName,
                        [
                            Validators.required,
                            Validators.minLength(OWN_NAME_LENGTH.MIN),
                            Validators.maxLength(OWN_NAME_LENGTH.MAX),
                            ValidatorsHelper.ownName,
                        ],
                    ],
                    providerDate: [
                        sinisterEvent.providerDate,
                        [Validators.required, ValidatorsHelper.date],
                    ],
                    providerFolio: [
                        sinisterEvent.providerFolio,
                        [
                            ValidatorsHelper.alphanumeric,
                            Validators.minLength(LONG_ALPHANUMERIC_LENGTH.MIN),
                            Validators.maxLength(LONG_ALPHANUMERIC_LENGTH.MAX),
                        ],
                    ],
                    providerBill: [
                        sinisterEvent.providerBill,
                        [ValidatorsHelper.amount],
                    ],
                    providerPhoneCodeId: [sinisterEvent.providerPhoneCodeId],
                    providerPhoneNumber: [
                        sinisterEvent.providerPhoneNumber,
                        [ValidatorsHelper.phoneNumber],
                    ],
                    providerEmail: [
                        sinisterEvent.providerEmail,
                        [
                            Validators.email,
                            Validators.minLength(EMAIL_LENGTH.MIN),
                            Validators.maxLength(EMAIL_LENGTH.MAX),
                        ],
                    ],
                    observations: [
                        sinisterEvent.observations,
                        [
                            Validators.required,
                            Validators.minLength(MULTITEXT_LENGTH.MIN),
                            Validators.maxLength(MULTITEXT_LENGTH.MAX),
                            ValidatorsHelper.multitext,
                        ],
                    ],
                });
                break;

            case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                switch (sinisterEvent.insuranceGroupId) {
                    case INSURANCE_GROUPS.VEHICLES:
                        this.form = this._formBuilder.group({
                            canNotifyInsured: [
                                sinisterEvent.canNotifyInsured,
                                [Validators.required],
                            ],
                            evidenceName: [
                                sinisterEvent.evidenceName,
                                [
                                    Validators.minLength(FILE_NAME_LENGTH.MIN),
                                    Validators.maxLength(FILE_NAME_LENGTH.MAX),
                                    ValidatorsHelper.fileName,
                                ],
                            ],
                            evidenceFile: [''],
                            sinisterResolutionId: [
                                sinisterEvent.sinisterResolutionId,
                                [Validators.required],
                            ],
                            providerDate: [
                                sinisterEvent.providerDate,
                                [Validators.required, ValidatorsHelper.date],
                            ],
                            valuationDate: [
                                sinisterEvent.valuationDate,
                                [Validators.required, ValidatorsHelper.date],
                            ],
                            sumInsuredChassis: [
                                sinisterEvent.sumInsuredChassis,
                                [Validators.required, ValidatorsHelper.amount],
                            ],
                            deductibleChassis: [
                                sinisterEvent.deductibleChassis,
                                [Validators.required, ValidatorsHelper.amount],
                            ],
                            sumInsuredAdaptation: [
                                sinisterEvent.sumInsuredAdaptation,
                                [Validators.required, ValidatorsHelper.amount],
                            ],
                            deductibleAdaptation: [
                                sinisterEvent.deductibleAdaptation,
                                [Validators.required, ValidatorsHelper.amount],
                            ],
                            providerBill: [
                                sinisterEvent.providerBill,
                                [ValidatorsHelper.amount],
                            ],
                            currencyId: [
                                sinisterEvent.currencyId,
                                [Validators.required],
                            ],
                            paymentMethodId: [
                                sinisterEvent.paymentMethodId,
                                [Validators.required],
                            ],
                            observations: [
                                sinisterEvent.observations,
                                [
                                    Validators.required,
                                    Validators.minLength(MULTITEXT_LENGTH.MIN),
                                    Validators.maxLength(MULTITEXT_LENGTH.MAX),
                                    ValidatorsHelper.multitext,
                                ],
                            ],
                        });
                        break;

                    default:
                        this.form = this._formBuilder.group({
                            canNotifyInsured: [
                                sinisterEvent.canNotifyInsured,
                                [Validators.required],
                            ],
                            evidenceName: [
                                sinisterEvent.evidenceName,
                                [
                                    Validators.minLength(FILE_NAME_LENGTH.MIN),
                                    Validators.maxLength(FILE_NAME_LENGTH.MAX),
                                    ValidatorsHelper.fileName,
                                ],
                            ],
                            evidenceFile: [''],
                            sinisterResolutionId: [
                                sinisterEvent.sinisterResolutionId,
                                [Validators.required],
                            ],
                            providerDate: [
                                sinisterEvent.providerDate,
                                [Validators.required, ValidatorsHelper.date],
                            ],
                            providerBill: [
                                sinisterEvent.providerBill,
                                [ValidatorsHelper.amount],
                            ],
                            currencyId: [
                                sinisterEvent.currencyId,
                                [Validators.required],
                            ],
                            paymentMethodId: [
                                sinisterEvent.paymentMethodId,
                                [Validators.required],
                            ],
                            observations: [
                                sinisterEvent.observations,
                                [
                                    Validators.required,
                                    Validators.minLength(MULTITEXT_LENGTH.MIN),
                                    Validators.maxLength(MULTITEXT_LENGTH.MAX),
                                    ValidatorsHelper.multitext,
                                ],
                            ],
                        });
                        break;
                }
                break;

            default:
                this.form = this._formBuilder.group({
                    canNotifyInsured: [
                        sinisterEvent.canNotifyInsured,
                        [Validators.required],
                    ],
                    evidenceName: [
                        sinisterEvent.evidenceName,
                        [
                            Validators.minLength(FILE_NAME_LENGTH.MIN),
                            Validators.maxLength(FILE_NAME_LENGTH.MAX),
                            ValidatorsHelper.fileName,
                        ],
                    ],
                    evidenceFile: [''],
                    providerName: [
                        sinisterEvent.providerName,
                        [
                            Validators.required,
                            Validators.minLength(OWN_NAME_LENGTH.MIN),
                            Validators.maxLength(OWN_NAME_LENGTH.MAX),
                            ValidatorsHelper.ownName,
                        ],
                    ],
                    providerDate: [
                        sinisterEvent.providerDate,
                        [Validators.required, ValidatorsHelper.date],
                    ],
                    observations: [
                        sinisterEvent.observations,
                        [
                            Validators.required,
                            Validators.minLength(MULTITEXT_LENGTH.MIN),
                            Validators.maxLength(MULTITEXT_LENGTH.MAX),
                            ValidatorsHelper.multitext,
                        ],
                    ],
                });
        }
        this.isBuiltForm = true;
    }

    loadCurrencies(): void {
        if (this.currencies.length === 0) {
            const fields: string = 'currencyId,name';
            this._currencyService
                .getCurrencies(fields)
                .subscribe((res: HttpResponse) => {
                    this.currencies = res.data;
                });
        }
    }

    loadPaymentMethods(): void {
        if (this.paymentMethods.length === 0) {
            const fields: string = 'paymentMethodId,name';
            this._paymentMethodService
                .getPaymentMethods(fields)
                .subscribe((res: HttpResponse) => {
                    this.paymentMethods = res.data;
                });
        }
    }

    loadSinisterResolutions(): void {
        if (this.sinisterResolutions.length === 0) {
            const fields: string = 'sinisterResolutionId,name';
            this._sinisterResolutionService
                .getSinisterResolutions(fields)
                .subscribe((res: HttpResponse) => {
                    this.sinisterResolutions = res.data;
                });
        }
    }

    /**
     * Update the sinister event
     * @param  sinisterEventData The sinister event data
     * @return                   Notice of action done
     */
    updateSinisterEvent(
        sinisterEventData: SinisterEventDataSend
    ): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._sinisterEventService.updateSinisterEvent(
            sinisterEventData,
            requestBody
        );
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        this.sinisterEvent!.sinisterEventTypeId = parseInt(
            this.sinisterEvent!.sinisterEventTypeId.toString()
        );
        switch (this.sinisterEvent!.sinisterEventTypeId) {
            case SINISTER_EVENT_TYPES.WORKSHOP_AND_SERVICE:
                requestBody.set(
                    'canNotifyInsured',
                    this.f.canNotifyInsured.value
                );
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('valuationDate', this.f.valuationDate.value);
                requestBody.set(
                    'authorizationDate',
                    this.f.authorizationDate.value
                );
                requestBody.set(
                    'insuredNoticeDate',
                    this.f.insuredNoticeDate.value
                );
                requestBody.set(
                    'insuredAuthorizationDate',
                    this.f.insuredAuthorizationDate.value
                );
                requestBody.set(
                    'estimatedDeliveryDate',
                    this.f.estimatedDeliveryDate.value
                );
                requestBody.set('repairDate', this.f.repairDate.value);
                requestBody.set('deliveryDate', this.f.deliveryDate.value);
                requestBody.set(
                    'readmissionDate',
                    this.f.readmissionDate.value
                );
                requestBody.set('providerFolio', this.f.providerFolio.value);
                requestBody.set('providerBill', this.f.providerBill.value);
                requestBody.set(
                    'providerPhoneCodeId',
                    this.f.providerPhoneCodeId.value
                );
                requestBody.set(
                    'providerPhoneNumber',
                    this.f.providerPhoneNumber.value
                );
                requestBody.set('providerEmail', this.f.providerEmail.value);
                requestBody.set('observations', this.f.observations.value);
                break;

            case SINISTER_EVENT_TYPES.CIVIL_WORK:
            case SINISTER_EVENT_TYPES.CRANES_AND_TRANSFER:
            case SINISTER_EVENT_TYPES.LEGAL_PROCESS:
                requestBody.set(
                    'canNotifyInsured',
                    this.f.canNotifyInsured.value
                );
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('providerFolio', this.f.providerFolio.value);
                requestBody.set('providerBill', this.f.providerBill.value);
                requestBody.set(
                    'providerPhoneCodeId',
                    this.f.providerPhoneCodeId.value
                );
                requestBody.set(
                    'providerPhoneNumber',
                    this.f.providerPhoneNumber.value
                );
                requestBody.set('providerEmail', this.f.providerEmail.value);
                requestBody.set('observations', this.f.observations.value);
                break;

            case SINISTER_EVENT_TYPES.INDEMNIFICATION:
                requestBody.set(
                    'canNotifyInsured',
                    this.f.canNotifyInsured.value
                );
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set(
                    'sinisterResolutionId',
                    this.f.sinisterResolutionId.value
                );
                requestBody.set('providerDate', this.f.providerDate.value);

                switch (this.sinisterEvent!.insuranceGroupId) {
                    case INSURANCE_GROUPS.VEHICLES:
                        requestBody.set(
                            'valuationDate',
                            this.f.valuationDate.value
                        );
                        requestBody.set(
                            'sumInsuredChassis',
                            this.f.sumInsuredChassis.value
                        );
                        requestBody.set(
                            'deductibleChassis',
                            this.f.deductibleChassis.value
                        );
                        requestBody.set(
                            'sumInsuredAdaptation',
                            this.f.sumInsuredAdaptation.value
                        );
                        requestBody.set(
                            'deductibleAdaptation',
                            this.f.deductibleAdaptation.value
                        );
                        break;
                }

                requestBody.set('providerBill', this.f.providerBill.value);
                requestBody.set('currencyId', this.f.currencyId.value);
                requestBody.set(
                    'paymentMethodId',
                    this.f.paymentMethodId.value
                );
                requestBody.set('observations', this.f.observations.value);
                break;

            default:
                requestBody.set(
                    'canNotifyInsured',
                    this.f.canNotifyInsured.value
                );
                requestBody.set('evidenceName', this.f.evidenceName.value);
                requestBody.set('evidenceFile', this.f.evidenceFile.value);
                requestBody.set('providerName', this.f.providerName.value);
                requestBody.set('providerDate', this.f.providerDate.value);
                requestBody.set('observations', this.f.observations.value);
        }
        return requestBody;
    }
}
