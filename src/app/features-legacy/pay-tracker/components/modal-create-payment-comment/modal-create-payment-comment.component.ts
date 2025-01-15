import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MULTITEXT_LENGTH } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
import { Payment } from '@core/interfaces/payment.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { PaymentService } from '@core/services/payment/payment.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-create-payment-comment',
    templateUrl: './modal-create-payment-comment.component.html',
    styles: [],
    standalone: false
})
export class ModalCreatePaymentCommentComponent {
    @Output() commentAdded = new EventEmitter<void>();
    form = this._buildForm();
    modalId = 'agt-modal-create-payment-comment';
    payment: Payment | undefined = undefined;
    private _isFormSubmitted = false;
    private _paymentId = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _paymentService: PaymentService
    ) {}

    get paymentAmount(): number {
        if (this.payment) {
            const data: CalculatePaymentAmount = {
                paymentPlanReceips: this.payment.paymentPlanReceips,
                netPay: this.payment.netPay,
                feePay: this.payment.feePay,
                coverPay: this.payment.coverPay,
                noTaxPay: this.payment.noTaxPay,
                extraPay: this.payment.extraPay,
                taxPay: this.payment.taxPay,
                discount: this.payment.discount,
                paymentSourceTypeId: this.payment.paymentSourceTypeId,
                tickets: this.payment.tickets,
                paymentPlanId: this.payment.paymentPlanId,
                pendingAmount: this.payment.pendingAmount,
                pendingReceipts: this.payment.pendingReceipts,
                firstReceiptAmount: this.payment.firstReceiptAmount,
                subsequentReceiptsAmount: this.payment.subsequentReceiptsAmount,
            };
            return UtilitiesHelper.calculatePaymentAmount(data);
        }
        return 0;
    }

    closeModal(): void {
        this._isFormSubmitted = false;
        this.form.reset();
        ModalPlugin.hide(this.modalId);
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    init(paymentId: string): void {
        this._paymentId = paymentId;
        this._loadPayment();
        ModalPlugin.show(this.modalId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._updatePaymentComment();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            comment: [
                '',
                [
                    Validators.required,
                    Validators.minLength(MULTITEXT_LENGTH.MIN),
                    Validators.maxLength(MULTITEXT_LENGTH.MAX),
                    ValidatorsHelper.multitext,
                ],
            ],
        });
    }

    private _loadPayment(): void {
        const fields =
            'policyNumber,bills,paymentPlanReceips,netPay,feePay,coverPay,noTaxPay,extraPay,taxPay,discount,paymentSourceTypeId,tickets,paymentPlanId,pendingAmount,pendingReceipts,paymentDate,comment,firstReceiptAmount,subsequentReceiptsAmount';
        this._paymentService
            .getWorkspacePayment(this._paymentId, fields)
            .subscribe((payment) => {
                this.payment = payment;
                this.form.patchValue({ comment: payment.comment });
            });
    }

    private _updatePaymentComment(): void {
        this._loadingService.show();
        const comment = this.form.value.comment;
        this.closeModal();
        this._paymentService
            .updatePaymentComment(this._paymentId, comment)
            .subscribe(() => {
                this._loadingService.hide();
                this.commentAdded.emit();
            });
    }
}
