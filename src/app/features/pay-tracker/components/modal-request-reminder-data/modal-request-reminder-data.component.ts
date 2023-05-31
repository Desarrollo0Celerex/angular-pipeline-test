import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { Policy } from '@core/interfaces/policy.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { PolicyService } from '@core/services/policy/policy.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Reminder } from '@features/pay-tracker/interfaces/reminder.interface';
import { PaymentReminderService } from '@features/pay-tracker/services/payment-reminder/payment-reminder.service';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-request-reminder-data',
    templateUrl: './modal-request-reminder-data.component.html',
    styles: [],
})
export class ModalRequestReminderDataComponent
    extends SmartComponent
    implements OnChanges
{
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canRequestEmail: boolean = false;
    @Input() canRequestPhoneNumber: boolean = false;
    form: FormGroup = this._formBuilder.group({});
    isFormBuilt = false;
    private _isFormSubmitted: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _paymentReminderService: PaymentReminderService,
        private _policyService: PolicyService
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (changes.canRequestEmail && changes.canRequestEmail.currentValue) ||
            (changes.canRequestPhoneNumber &&
                changes.canRequestPhoneNumber.currentValue)
        ) {
            this._buildForm();
        }
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this._removeFormControls();
        this._isFormSubmitted = false;
        this.canRequestEmail = false;
        this.canRequestPhoneNumber = false;
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

    updatePhoneCodeId(titularPhoneCodeId: number): void {
        this.form.patchValue({ titularPhoneCodeId });
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._updatePolicyTitularContact();
        }
    }

    private _buildForm(): void {
        this.isFormBuilt = false;
        if (this.canRequestEmail) {
            this.form.addControl(
                'titularEmail',
                new FormControl('', [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ])
            );
        }
        if (this.canRequestPhoneNumber) {
            this.form.addControl('titularPhoneCodeId', new FormControl(1));
            this.form.addControl(
                'titularPhoneNumber',
                new FormControl('', [
                    Validators.required,
                    ValidatorsHelper.phoneNumber,
                ])
            );
        }
        this.isFormBuilt = true;
    }

    private _getPhoneCode(): void {
        const fields = 'titularPhoneCode';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .pipe(this.takeOne())
            .subscribe((res: Policy) => {
                this._saveReminderData(res.titularPhoneCode);
            });
    }

    private _removeFormControls(): void {
        this.isFormBuilt = false;
        if (this.canRequestEmail) {
            this.form.removeControl('titularEmail');
        }
        if (this.canRequestPhoneNumber) {
            this.form.removeControl('titularPhoneCodeId');
            this.form.removeControl('titularPhoneNumber');
        }
    }

    private _saveReminderData(titularPhoneCode: string): void {
        const savedReminderData: Reminder =
            this._paymentReminderService.getReminderData();
        this._paymentReminderService.saveReminderData({
            ...savedReminderData,
            email: this.canRequestEmail
                ? this.form.controls.titularEmail.value
                : savedReminderData.email,
            phoneNumber: this.canRequestPhoneNumber
                ? titularPhoneCode +
                  '1' +
                  this.form.controls.titularPhoneNumber.value
                : savedReminderData.phoneNumber,
        });
        this._generatePaymentReminderData();
    }

    private _generatePaymentReminderData(): void {
        this.closeModal();
        this._paymentReminderService.generatePaymentReminderData(
            this.contactId,
            this.policyId,
            this.paymentId
        );
    }

    private _updatePolicyTitularContact(): void {
        this._loadingService.show();
        this._policyService
            .updatePolicyTitularContact(
                this.contactId,
                this.policyId,
                this.form.value
            )
            .pipe(this.takeOne())
            .subscribe(() => {
                this._getPhoneCode();
            });
    }
}
