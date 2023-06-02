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
import { Task } from '@features/tasks/interfaces/task.interface';
import { TaskProgressStatus } from '@features/task-progress-status/interfaces/task-progress-status.interface';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskProgressStatusService } from '@features/task-progress-status/services/task-progress-status.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskService } from '@features/tasks/services/task.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import * as moment from 'moment';
import { ModalHelper } from '@core/helpers/modal.helper';
declare var DatePickerPlugin: any;
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
    private _taskId: string = '';
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
            .subscribe((taskId) => {
                this._taskId = taskId;
                this._loadTask();
            });
    }

    closeModal(): void {
        ModalHelper.hideModal(this.modalId);
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

    private _loadTask(): void {
        const fields =
            'taskTitle,taskDate,taskTime,taskDetails,taskProgressStatusId,responsibleId';
        this._taskService.getTask(this._taskId, fields).subscribe((task) => {
            this._updateForm(task);
            ModalHelper.showModal(this.modalId);
        });
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

    private _updateForm(task: Task) {
        this.form.patchValue({
            taskTitle: task.taskTitle,
            taskDetails: task.taskDetails,
            taskProgressStatusId: task.taskProgressStatusId,
            responsibleId: task.responsibleId ? task.responsibleId : '0',
            taskDate: moment(task.taskDate).format('DD/MM/YYYY'),
            taskTime: moment(task.taskDate + ' ' + task.taskTime).format(
                'h:mm A'
            ),
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
            .updateTask(this._taskId, requestBody)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.taskUpdated();
                this._moduleService.requestReloadContent();
            });
    }
}
