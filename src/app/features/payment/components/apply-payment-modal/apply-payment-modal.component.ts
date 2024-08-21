import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { IMAGE_AND_DOCUMENT_FORMATS } from '@constants/global';
import { PAYMENT_PLANS, PAYMENT_SOURCE_TYPES } from '@core/constants/settings';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { PaymentType } from '@payment-type/interfaces/payment-type.interface';
import { PaymentTypeService } from '@payment-type/services/payment-type.service';
import { Payment } from '@payment/interfaces/payment.interface';
import { PaymentService } from '@payment/services/payment.service';
import * as moment from 'moment';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-apply-payment-modal',
    templateUrl: './apply-payment-modal.component.html',
    styles: [],
})
export class ApplyPaymentModalComponent implements OnInit {
    calendarIdApplicationDate: string = 'applicationDate';
    form = this._buildForm();
    modalId = 'apply-payment-modal';
    paymentTypes: PaymentType[] = [];
    private _contactId = '';
    private _formats = IMAGE_AND_DOCUMENT_FORMATS;
    private _policyId = '';
    private _payment?: Payment = undefined;
    private _paymentId = '';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _currencyPipe: CurrencyPipe,
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _paymentService: PaymentService,
        private _paymentTypeService: PaymentTypeService
    ) {}

    ngOnInit(): void {
        this._initCalendars();
        this._loadPaymentTypes();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'file') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    openModal(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        ModalPlugin.show(this.modalId);
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        this._paymentId = data.paymentId;
        this._loadPayment();
    }

    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            if (this._checkIfValidFile(file.name, this._formats)) {
                this.form.patchValue({ paymentEvidence: file });
            }
        }
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._applyPayment();
        }
    }

    private _applyPayment(): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        const requestBody = this._getRequestBody();
        this._paymentService
            .applyPayment(
                this._contactId,
                this._policyId,
                this._paymentId,
                requestBody
            )
            .subscribe(() => {
                this._loadingService.hide();
                //AlertHelper.receiptPaid(this._notifyReceiptPaid, this);
                this._payment = undefined;
            });
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            applicationDate: ['', [Validators.required, ValidatorsHelper.date]],
            amount: ['', [Validators.required, ValidatorsHelper.amount]],
            paymentTypeId: [1, [Validators.required]],
            paymentReference: ['', [Validators.required]],
            paymentEvidence: [''],
        });
    }

    private _checkIfValidFile(
        fileName: string,
        fileFormats: string[]
    ): boolean {
        const fileExtension: string = this._getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    private _getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return index !== -1 ? fileName.substring(index + 1) : '';
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('amount', this.form.value.amount);
        requestBody.append('receipts', '1');
        requestBody.append('applicationDate', this.form.value.applicationDate);
        requestBody.append(
            'nextPaymentDate',
            this._calculateNextPaymentDate(this._payment!)
        );
        requestBody.append('paymentTypeId', this.form.value.paymentTypeId);
        requestBody.append(
            'paymentReference',
            this.form.value.paymentReference
        );
        requestBody.append('paymentEvidence', this.form.value.paymentEvidence);
        return requestBody;
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(
            this.calendarIdApplicationDate,
            this._onChangeDate,
            this
        );
    }

    private _loadPayment(): void {
        const fields =
            'bills,tickets,paymentPlanMonths,validityStartDate,validityEndDate,pendingAmount,pendingReceipts,paymentDate,currencyName,isMultiyear,bills,tickets,netPay,taxPay,feePay,coverPay,noTaxPay,extraPay,discount,paymentPlanReceips,paymentPlanId,paymentSourceTypeId';
        this._paymentService
            .getWorkspacePayment(this._paymentId, fields)
            .subscribe((payment) => {
                this._payment = payment;
                this._patchForm(payment);
            });
        /* this.model.loadPayment(paymentId).subscribe(() => {
            
            this.model.buildPaymentForm();
            if (!!this._modalSelectEvidence) {
                this._modalSelectEvidence.resetEvidenceValue();
            }
        }); */
    }

    private _loadPaymentTypes(): void {
        const fields: string = 'paymentTypeId,name';
        this._paymentTypeService
            .getPaymentTypes(fields)
            .subscribe((paymentTypes) => {
                this.paymentTypes = paymentTypes;
            });
    }

    private _patchForm(payment: Payment): void {
        this.form.patchValue({
            amount: this._calculatePaymentAmount(payment),
            applicationDate: moment(payment.paymentDate).format('DD/MM/YYYY'),
            paymentTypeId: 1,
            paymentReference: this._calculatePaymentReference(payment),
        });
    }

    private _calculateNextPaymentDate(payment: Payment): string {
        const paymentDay: number = parseInt(
            moment(payment.validityStartDate).format('D')
        );
        const nextPaymentDate: string =
            UtilitiesHelper.calculateNextPaymentDate(
                payment.paymentDate,
                payment.paymentPlanMonths,
                paymentDay
            );
        return moment(nextPaymentDate).format('DD/MM/YYYY');
    }

    private _calculatePaymentAmount(payment: Payment): string {
        let formattedPaymentAmount: string = '';
        if (!!payment) {
            let receiptsAmount: number = 0;
            receiptsAmount =
                payment.paymentSourceTypeId === PAYMENT_SOURCE_TYPES.POLICY &&
                payment.tickets === 0 &&
                payment.paymentPlanId != PAYMENT_PLANS.SINGLE_PAYMENT &&
                payment.paymentPlanId != PAYMENT_PLANS.ANNUAL
                    ? this._calculateFirstPaymentAmount(
                          payment.paymentPlanReceips,
                          payment.netPay,
                          payment.feePay,
                          payment.coverPay,
                          payment.noTaxPay,
                          payment.extraPay,
                          payment.taxPay,
                          payment.discount
                      )
                    : payment.pendingAmount / payment.pendingReceipts;
            formattedPaymentAmount =
                this._currencyPipe.transform(receiptsAmount, '', '', '0.2-2') ||
                '';
        }
        return formattedPaymentAmount;
    }

    private _calculatePaymentReference(payment: Payment): string {
        const tickets: number = parseInt(payment!.tickets.toString()) + 1;
        return 'PAG-' + tickets + '-' + payment!.bills;
    }

    private _calculateFirstPaymentAmount(
        paymentPlanReceips: number,
        netPay: number,
        feePay: number,
        coverPay: number,
        noTaxPay: number,
        extraPay: number,
        taxPay: number,
        discount: number
    ): number {
        let sumPayments: number =
            (parseFloat(netPay.toString()) - parseFloat(discount.toString())) /
                paymentPlanReceips +
            parseFloat(feePay.toString()) / paymentPlanReceips +
            parseFloat(noTaxPay.toString()) / paymentPlanReceips +
            parseFloat(extraPay.toString()) / paymentPlanReceips +
            parseFloat(coverPay.toString());
        const taxes: number = taxPay != 0 ? sumPayments * 0.16 : 0;
        const paymentAmount = sumPayments + taxes;
        return paymentAmount;
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ApplyPaymentModalComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }
}
