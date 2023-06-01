import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { TaskProgressStatus } from '@features/task-progress-status/interfaces/task-progress-status.interface';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskProgressStatusService } from '@features/task-progress-status/services/task-progress-status.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { InitModalEditTask } from '@features/tasks/interfaces/init-modal-edit-task.interface';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskService } from '@features/tasks/services/task.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import * as moment from 'moment';
declare var DatePickerPlugin: any;
declare var ModalPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-modal-edit-task',
    templateUrl: './modal-edit-task.component.html',
    styles: [],
})
export class ModalEditTaskComponent extends SmartComponent implements OnInit {
    calendarIdTaskDate = 'taskDate';
    modalId = 'agt-modal-edit-task';
    form = this._buildForm();
    taskProgressStatus: TaskProgressStatus[] = [];
    workspaceUsers: Partial<WorkspaceUser>[] = [];
    timerIdTaskTime = 'taskTime';
    private _data: InitModalEditTask | undefined = undefined;
    private _isFormSubmitted = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _moduleService: ModuleService,
        private _taskService: TaskService,
        private _taskProgressStatusService: TaskProgressStatusService,
        private _workspaceUserService: WorkspaceUserService
    ) {
        super();
    }

    ngOnInit(): void {
        this._initCalendars();
        this._initTimers();
        this._loadTaskProgressStatus();
        this._loadWorkspaceUsers();
        this._moduleService.modalEditTask$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this._updateForm();
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
            this._updateTask();
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            taskTitle: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ],
            ],
            taskDetails: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(1000),
                ],
            ],
            taskProgressStatusId: ['', [Validators.required]],
            responsibleId: ['', [Validators.required]],
            taskDate: ['', [Validators.required, ValidatorsHelper.date]],
            taskTime: ['', [Validators.required, ValidatorsHelper.time]],
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

    private _loadTaskProgressStatus(): void {
        const fields = 'taskProgressStatusId,name';
        this._taskProgressStatusService
            .getTaskProgressStatus(fields)
            .subscribe((res) => {
                this.taskProgressStatus = res;
            });
    }

    private _loadWorkspaceUsers(): void {
        const fields = 'userId,shortName';
        const page = 1;
        const perPage = 100;
        this._workspaceUserService
            .getWorkspaceUsers(fields, page, perPage)
            .subscribe((res) => {
                this.workspaceUsers = res;
                this.workspaceUsers.unshift({
                    userId: '0',
                    shortName: 'SIN ASIGNAR',
                });
            });
    }

    private _onChangeDate(
        selectorId: string,
        changedValue: string,
        context: ModalEditTaskComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }

    private _onChangeTime(
        selectorId: string,
        changedValue: string,
        context: ModalEditTaskComponent
    ): void {
        context.form.patchValue({ [selectorId]: changedValue });
    }

    private _showModal() {
        ModalPlugin.show(this.modalId);
    }

    private _updateForm() {
        this.form.patchValue({
            taskTitle: this._data!.taskTitle,
            taskDetails: this._data!.taskDetails,
            taskProgressStatusId: this._data!.taskProgressStatusId,
            responsibleId: this._data!.responsibleId
                ? this._data!.responsibleId
                : '0',
            taskDate: moment(this._data!.taskDate).format('DD/MM/YYYY'),
            taskTime: moment(
                this._data!.taskDate + ' ' + this._data!.taskTime
            ).format('h:mm A'),
        });
    }

    private _updateTask(): void {
        this._loadingService.show();
        const requestBody = this.form.value;
        requestBody.responsibleId =
            requestBody.responsibleId !== '0'
                ? requestBody.responsibleId
                : null;
        this.closeModal();
        this._taskService
            .updateTask(this._data!.taskId, requestBody)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.taskUpdated();
                this._moduleService.requestReloadContent();
            });
    }
}
