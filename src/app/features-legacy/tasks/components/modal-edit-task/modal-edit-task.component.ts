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
import { Task } from '@features-legacy/tasks/interfaces/task.interface';
import { TaskProgressStatus } from '@features-legacy/task-progress-status/interfaces/task-progress-status.interface';
import { WorkspaceUser } from '@core/interfaces/workspace-user.interface';
import { LoadingService } from '@core/services/loading/loading.service';
import { TaskProgressStatusService } from '@features-legacy/task-progress-status/services/task-progress-status.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import { TaskService } from '@features-legacy/tasks/services/task.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import moment from 'moment';
import { ModalHelper } from '@core/helpers/modal.helper';
import { SendTaskNotfication } from '@features-legacy/tasks/interfaces/send-task-notification.interface';
declare var DatePickerPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-modal-edit-task',
    templateUrl: './modal-edit-task.component.html',
    styles: [],
    standalone: false
})
export class ModalEditTaskComponent extends SmartComponent implements OnInit {
    calendarIdTaskDate = 'taskDate';
    modalId = 'agt-modal-edit-task';
    form = this._buildForm();
    taskProgressStatus: TaskProgressStatus[] = [];
    workspaceUsers: Partial<WorkspaceUser>[] = [];
    timerIdTaskTime = 'taskTime';
    private _currentResponsibleId: string = '';
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
        ModalHelper.hide(this.modalId);
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
            this._currentResponsibleId = task.responsibleId;
            this._updateForm(task);
            ModalHelper.show(this.modalId);
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
                if (
                    this._checkIsChangedResponsible(requestBody.responsibleId)
                ) {
                    this._reloadTask();
                } else {
                    this._handleSuccessfulUpdate();
                }
            });
    }

    private _checkIsChangedResponsible(responsibleId: string): boolean {
        return this._currentResponsibleId !== responsibleId ? true : false;
    }

    private _handleSuccessfulUpdate(): void {
        this._loadingService.hide();
        AlertHelper.taskUpdated();
        this._moduleService.requestReloadContent();
    }

    private _reloadTask(): void {
        const fields =
            'responsibleEmail,workspaceName,workspaceAvatarUrl,createdByName';
        this._taskService.getTask(this._taskId, fields).subscribe((task) => {
            this._sendTaskNotification(task);
        });
    }

    private _sendTaskNotification(task: Task): void {
        const requestBody: SendTaskNotfication = {
            taskId: this._taskId,
            canSendByEmail: true,
            canSendByWhatsapp: false,
            email: task.responsibleEmail,
            phoneNumber: '',
            taskTitle: '',
            taskDetails: '',
            workspaceName: task.workspaceName,
            workspaceAvatarUrl: task.workspaceAvatarUrl,
            createdByName: task.createdByName,
        };
        this._taskService.sendTaskNotification(requestBody).subscribe(() => {
            this._handleSuccessfulUpdate();
        });
    }
}
