import { Component, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TASK_PROGRESS_STATUS } from '@core/constants/settings';
import { DateHelper } from '@core/helpers/date.helper';
import { ModalHelper } from '@core/helpers/modal.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { TaskProgressStatus } from '@features-legacy/task-progress-status/interfaces/task-progress-status.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { TaskProgressStatusService } from '@task-progress-status/services/task-progress-status.service';
import { WorkspaceUserService } from '@workspace-users/services/workspace-user.service';
import { CreateTask } from '@tasks/interfaces/create-task.interface';
import { User } from '@users/interfaces/user.interface';
import { ModalCreateTaskComponent } from '@features-legacy/tasks/components/modal-create-task/modal-create-task.component';
import { TaskService } from '@tasks/services/task.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { SelectTaskCalendarComponent } from '../select-task-calendar/select-task-calendar.component';

declare var DatePickerPlugin: any;
declare var TimePickerPlugin: any;

@Component({
    selector: 'agt-create-task',
    templateUrl: './create-task.component.html',
    styles: [],
})
export class CreateTaskComponent {
    @ViewChild(SelectTaskCalendarComponent)
    selectTaskCalendarComponent!: SelectTaskCalendarComponent;
    calendarIdTaskDate = 'taskDate';
    data: CreateTask | undefined = undefined;
    form = this._buildForm();
    modalId = 'agt-create-task-modal';
    timerIdTaskTime = 'taskTime';
    taskProgressStatus: TaskProgressStatus[] = [];
    workspaceUsers: User[] = [];
    private _isFormSubmitted = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _taskService: TaskService,
        private _taskProgressStatusService: TaskProgressStatusService,
        private _workspaceUserService: WorkspaceUserService
    ) {}

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

    init(data: CreateTask): void {
        this.data = data;
        this._patchFormValues();
        ModalHelper.show(this.modalId);
        this._initCalendars();
        this._initTimers();
        if (this.taskProgressStatus.length === 0) {
            this._loadTaskProgressStatus();
        }
        if (this.workspaceUsers.length === 0) {
            this._loadWorkspaceUsers();
        }
    }

    patchTaskValues(subject: string, details: string): void {
        this.form.patchValue({
            taskTitle: subject,
            taskDetails: details,
        });
    }

    reset(): void {
        this.data = undefined;
        this._isFormSubmitted = false;
        this.form.reset();
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._createTask();
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
            taskModuleId: ['', [Validators.required]],
        });
    }

    private _createTask(): void {
        this._loadingService.show();
        ModalHelper.hide(this.modalId);
        this._taskService.createTask(this.form.value).subscribe((task) => {
            this._loadingService.hide();
            this.selectTaskCalendarComponent.init({
                taskId: task.taskId,
                cancelRoute: this.data!.cancelRoute,
            });
            this.reset();
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
            .subscribe((taskProgressStatus) => {
                this.taskProgressStatus = taskProgressStatus;
            });
    }

    private _loadWorkspaceUsers(): void {
        const fields = 'userId,shortName';
        const page = 1;
        const perPage = 100;
        this._workspaceUserService
            .getWorkspaceUsers(fields, page, perPage)
            .subscribe((users) => {
                this.workspaceUsers = users;
            });
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

    private _patchFormValues(): void {
        this.form.patchValue({
            taskProgressStatusId: TASK_PROGRESS_STATUS.TODO,
            responsibleId: this._authService.userId,
            taskDate: DateHelper.getCurrentDate(),
            taskTime: DateHelper.getCurrentTime(),
            taskModuleId: this.data!.taskModuleId,
        });
    }
}
