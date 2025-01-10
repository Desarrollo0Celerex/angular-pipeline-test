import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { InitModalCreateTask } from '@features-legacy/tasks/interfaces/init-modal-create-task.interface';
import { TaskModalService } from '@features-legacy/tasks/services/task-modal.service';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import moment from 'moment';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-modal-create-task',
    templateUrl: './modal-create-task.component.html',
    styles: [],
})
export class ModalCreateTaskComponent extends SmartComponent implements OnInit {
    calendarIdTaskDate = 'taskDate';
    form = this._buildForm();
    modalId = 'agt-modal-create-task';
    timerIdTaskTime = 'taskTime';
    cancelRoute: string | [] = [];
    private _isFormSubmitted = false;
    private _data: InitModalCreateTask | undefined = undefined;

    constructor(
        private _formBuilder: FormBuilder,
        private _moduleServie: ModuleService,
        private _loadingService: LoadingService,
        private _taskService: TaskService,
        private _taskModalService: TaskModalService
    ) {
        super();
    }

    ngOnInit(): void {
        this._initCalendars();
        this._initTimers();
        this._taskModalService.modalCreateTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((res) => {
                this._data = res;
                this.cancelRoute = res.cancelRoute;
                this._updateFormValues();
                this._showModal();
            });
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
            this._createTask();
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

    private _createTask(): void {
        this._loadingService.show();
        const requestBody = {
            ...this.form.value,
            taskTitle: this._data?.taskTitle,
            taskModuleId: this._data?.taskModuleId,
            responsibleId: this._data?.responsibleId,
        };
        this.closeModal();
        this._taskService.createTask(requestBody).subscribe((task) => {
            this._loadingService.hide();
            this._moduleServie.requestReloadContent();
            this._taskModalService.showModalSelectCalendar({
                taskId: task.taskId,
                cancelRoute: this.cancelRoute,
            });
        });
    }

    private _initCalendars(): void {
        DatePickerPlugin.init();
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

    private _showModal(): void {
        ModalPlugin.show(this.modalId);
    }

    private _updateFormValues(): void {
        this.form.patchValue({
            taskDate: this._data?.taskDate
                ? this._data?.taskDate
                : moment().format('DD/MM/YYYY'),
            taskTime: this._data?.taskTime
                ? this._data?.taskTime
                : moment().format('h:mm A'),
            taskDetails: this._data?.taskDetails ? this._data?.taskDetails : '',
        });
    }
}
