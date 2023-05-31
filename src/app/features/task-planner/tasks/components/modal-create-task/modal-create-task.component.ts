import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskService } from '@features/tasks/services/task.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-modal-create-task',
    templateUrl: './modal-create-task.component.html',
    styles: [],
})
export class ModalCreateTaskComponent extends SmartComponent {
    @Input() modalId = '';
    @Output() taskCreated = new EventEmitter<{
        eventDate: string;
        eventTime: string;
        eventDescription: string;
    }>();
    calendarIdTaskDate = 'taskDate';
    comment = '';
    form = this._buildForm();
    timerIdTaskTime = 'taskTime';
    private _isFormSubmitted = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _taskService: TaskService
    ) {
        super();
    }

    ngOnInit(): void {
        this._initCalendars();
        this._initTimers();
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
            taskDate: ['', [Validators.required, ValidatorsHelper.date]],
            taskTime: ['', [Validators.required, ValidatorsHelper.time]],
            taskDetails: [
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
        const requestBody = { ...this.form.value, taskModuleId: 2 };
        this.closeModal();
        this._taskService
            .createTask(requestBody)
            .pipe(this.takeOne())
            .subscribe(() => {
                this._loadingService.hide();
                this.taskCreated.emit({
                    eventDate: requestBody.taskDate,
                    eventTime: requestBody.taskTime,
                    eventDescription: requestBody.taskDetails,
                });
            });
    }

    private _initCalendars(): void {
        DatePickerPlugin.initElement(
            this.calendarIdTaskDate,
            this._onChangeDate,
            this
        );
    }

    private _initTimers(): void {
        TimePickerPlugin.init();
        TimePickerPlugin.initElement(
            this.timerIdTaskTime,
            this._onChangeTime,
            this
        );
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalCreateTaskComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }

    private _onChangeTime(
        selectorId: string,
        changedValue: string,
        context: ModalCreateTaskComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }
}
