import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Payment } from '@interfaces/payment.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalSearchPaymentService } from './modal-search-payment.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-search-payment',
    templateUrl: './modal-search-payment.component.html',
    styles: [],
    providers: [ModalSearchPaymentService],
})
export class ModalSearchPaymentComponent {
    @Input() modalId: string = '';
    @Output() paymentFound: EventEmitter<Payment> = new EventEmitter<Payment>();
    foundPayments: Payment[] = [];
    isNoResults: boolean = false;
    modalIdSelectPayment: string = 'agt-select-payment';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _modalSearchPaymentsService: ModalSearchPaymentService
    ) {}

    ngOnInit(): void {}

    get model(): ModalSearchPaymentService {
        return this._modalSearchPaymentsService;
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

    closeModal(): void {
        this.isNoResults = false;
        ModalPlugin.hide(this.modalId);
        this._resetForm();
    }

    selectPayment(payment: Payment): void {
        this.paymentFound.emit(payment);
    }

    /**
     * Submit event to search the payment
     */
    searchPayment(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.model.searchPayment().subscribe((res: HttpResponse) => {
                const totalFoundPayments: number = res.data.items.length;
                // If there are no policies
                if (totalFoundPayments === 0) {
                    this.isNoResults = true;
                    this._resetForm(this.model.f.policyNumber.value);
                } else {
                    this.isNoResults = false;
                    ModalPlugin.hide(this.modalId);
                    this._resetForm();
                    // If the payment was found
                    if (totalFoundPayments === 1) {
                        this.paymentFound.emit(res.data.items[0]);
                    }
                    // If there are multiple policies
                    else {
                        this.foundPayments = res.data.items;
                        ModalPlugin.show(this.modalIdSelectPayment);
                    }
                }
                setTimeout(() => {
                    this._loadingService.hide();
                }, 250);
            });
        }
    }

    /**
     * Reset the form
     */
    private _resetForm(policyNumber: string = ''): void {
        this._isFormSubmitted = false;
        this.model.form.reset({ policyNumber });
    }
}
