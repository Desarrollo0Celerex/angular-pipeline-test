import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { environment } from '@env/environment';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { Payment } from '@core/interfaces/payment.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import * as moment from 'moment';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskService } from '@core/services/task/task.service';
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-modal-create-payment-tracking',
    templateUrl: './modal-create-payment-tracking.component.html',
    styles: [],
})
export class ModalCreatePaymentTrackingComponent
    extends SmartComponent
    implements OnInit, OnChanges
{
    @Input() modalId = '';
    @Input() contactId = '';
    @Input() policyId = '';
    @Input() paymentId = '';
    @Output() paymentTrackingCreated = new EventEmitter<{
        eventDate: string;
        eventTime: string;
        eventDescription: string;
    }>();
    calendarIdDate = 'date';
    comment = '';
    form = this._buildForm();
    timerIdTime = 'time';
    private _isFormSubmitted = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _paymentService: PaymentService,
        private _taskService: TaskService
    ) {
        super();
    }

    ngOnInit(): void {
        this._initCalendars();
        this._initTimers();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.paymentId && changes.paymentId.currentValue) {
            this._loadPayment();
        }
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this.form.reset();
        this._isFormSubmitted = false;
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

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._createPaymentTracking();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            date: ['', [Validators.required, ValidatorsHelper.date]],
            time: ['', [Validators.required, ValidatorsHelper.time]],
            comment: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(1000),
                ],
            ],
        });
    }

    private _createPaymentTracking(): void {
        this._loadingService.show();
        const requestBody = this.form.value;
        this.closeModal();
        this._taskService
            .createTask(requestBody)
            .pipe(this.takeOne())
            .subscribe(() => {
                this._loadingService.hide();
                this.paymentTrackingCreated.emit({
                    eventDate: requestBody.date,
                    eventTime: requestBody.time,
                    eventDescription: requestBody.comment,
                });
            });
    }

    private _initCalendars(): void {
        DatePickerPlugin.initElement(
            this.calendarIdDate,
            this._onChangeDate,
            this
        );
    }

    private _initTimers(): void {
        TimePickerPlugin.init();
        TimePickerPlugin.initElement(
            this.timerIdTime,
            this._onChangeTime,
            this
        );
    }

    private _loadPayment(): void {
        const fields =
            'tickets,bills,policyNumber,insuranceName,coveredProperty,titularName,insurerName';
        this._paymentService
            .getWorkspacePayment(this.paymentId, fields)
            .pipe(this.takeOne())
            .subscribe((payment) => {
                this._updateFormValues(payment);
            });
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalCreatePaymentTrackingComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }

    private _onChangeTime(
        selectorId: string,
        changedValue: string,
        context: ModalCreatePaymentTrackingComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }

    private _updateFormValues(payment: Payment): void {
        this.comment = `🎯 Seguimiento de cobranza para el pago del recibo ${
            payment.tickets + 1
        } de ${payment.bills} de la póliza ${payment.policyNumber} (${
            payment.insuranceName
        }: ${payment.coveredProperty}) de ${payment.titularName}, emitida con ${
            payment.insurerName
        }.

💵 Pagos Pendientes: ${
            environment.appAgenthosUrl
        }/workspace/payments/pending-receipts/${this.contactId}/${
            this.policyId
        }/${this.paymentId}
📊 Historial de Póliza: ${
            environment.appAgenthosUrl
        }/workspace/policies/history-policy/${this.contactId}/${this.policyId}
🪪 Perfil de Cliente: ${environment.appAgenthosUrl}/workspace/contact-profile/${
            this.contactId
        }/resume

🤖 Tarea gestionada en Agenthos.`;
        this.form.controls.date.setValue(moment().format('DD/MM/YYYY'));
        this.form.controls.time.setValue(moment().format('h:mm A'));
        this.form.controls.comment.setValue(this.comment);
    }
}
