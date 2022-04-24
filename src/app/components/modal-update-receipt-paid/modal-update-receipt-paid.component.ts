import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ModalSelectEvidenceComponent } from '@components/modal-select-evidence/modal-select-evidence.component';
import { ERROR_CODES } from '@constants/error-codes';
import { IMAGE_AND_DOCUMENT_FORMATS, FILE_TYPES } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { UpdateReceiptPaidDataSend } from '@interfaces/update-receipt-paid-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUpdateReceiptPaidService } from './modal-update-receipt-paid.service';

declare var DatePickerPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-update-receipt-paid',
  templateUrl: './modal-update-receipt-paid.component.html',
  styles: [
  ],
  providers: [ModalUpdateReceiptPaidService]
})
export class ModalUpdateReceiptPaidComponent implements OnChanges, OnInit {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() receiptPaidId: string = '';
    @Output() receiptPaidUpdated: EventEmitter<UpdateReceiptPaidDataSend> = new EventEmitter<UpdateReceiptPaidDataSend>();
    @ViewChild('modalSelectEvidence') private _modalSelectEvidence!: ModalSelectEvidenceComponent;
    calendarIdApplicationDate: string = 'applicationDate';
    modalIdErrorUpdatingPaidReceipt: string = 'murp-error-updating-paid-receipt';
    modalIdSelectPaymentEvidence: string = 'murp-upload-payment-evidence';
    modalSelectEvidenceData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description: 'Selecciona el formato digital de la evidencia del pago.',
        buttonLabel: 'Cargar evidencia',
        formats: IMAGE_AND_DOCUMENT_FORMATS,
        fileType: FILE_TYPES.IMAGE_AND_DOCUMENT
    };
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateReceiptPaidService,
        private _loadingService: LoadingService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.receiptPaidId && !!changes.receiptPaidId.currentValue) {
            this._loadReceiptPaid(changes.receiptPaidId.currentValue);
        }
    }

    ngOnInit(): void {
        this.model.loadPaymentTypes();
    }

    addPaymentEvidence(file: File): void {
        this.showModalUpdateReceiptPaid();
        this.model.form.patchValue({ paymentEvidence: file})
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
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
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    selectPaymentEvidence(): void {
        ModalPlugin.hide(this.modalId);
        ModalPlugin.show(this.modalIdSelectPaymentEvidence);
    }

    showModalUpdateReceiptPaid(): void {
        ModalPlugin.show(this.modalId);
    }

    updateReceipPaid(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            this.model.updateReceipPaid(this.contactId, this.policyId, this.paymentId, this.receiptPaidId).subscribe(() => {
                ModalPlugin.hide(this.modalId);
                this.receiptPaidUpdated.emit(this.model.form.value);
                setTimeout(() => {
                    this._loadingService.hide();
                    AlertHelper.receiptPaidUpdated();
                },500);
            }, (error: HttpError) => {
                switch(error.error) {
                    case ERROR_CODES.receiptsAmountExceeded:
                    case ERROR_CODES.receiptsNumberExceeded:
                    case ERROR_CODES.pendingAmount:
                    case ERROR_CODES.pendingReceipts:
                        ModalPlugin.hide(this.modalId);
                        ModalPlugin.show(this.modalIdErrorUpdatingPaidReceipt);
                    break;
                }
            })
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdApplicationDate, this._onChangeDate, this);
    }

    private _loadReceiptPaid(receiptPaidId: string): void {
        this.model.isBuiltForm = false;
        this.model.loadReceiptPaid(receiptPaidId).subscribe(() => {
            this.model.buildForm();
            this._initCalendars();
        });
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ModalUpdateReceiptPaidComponent): void {
        context.model.form.patchValue({[selectorId]: changedValue});
    }
}
