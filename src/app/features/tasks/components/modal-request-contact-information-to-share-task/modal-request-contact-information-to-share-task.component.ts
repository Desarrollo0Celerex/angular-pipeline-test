import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { PHONE_CODES } from '@core/constants/settings';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ModalHelper } from '@core/helpers/modal.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { InitModalRequestContactInformationToShareTask } from '@features/tasks/interfaces/init-modal-request-contact-information-to-share-task.interface';
import { SendTaskNotfication } from '@features/tasks/interfaces/send-task-notification.interface';
import { Task } from '@features/tasks/interfaces/task.interface';
import { ModuleService } from '@features/tasks/services/module.service';
import { TaskService } from '@features/tasks/services/task.service';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

@Component({
    selector: 'agt-modal-request-contact-information-to-share-task',
    templateUrl:
        './modal-request-contact-information-to-share-task.component.html',
    styles: [],
})
export class ModalRequestContactInformationToShareTaskComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-modal-request-contact-information-to-share-task';
    form: FormGroup = this._formBuilder.group({});
    isFormBuilt = false;
    private _data: InitModalRequestContactInformationToShareTask | undefined =
        undefined;
    private _isFormSubmitted: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _loadingService: LoadingService,
        private _moduleService: ModuleService,
        private _taskService: TaskService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalRequestContactInformation$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._data = data;
                this._buildForm();
                ModalHelper.show(this.modalId);
            });
    }

    get canShowInputEmail(): boolean {
        return this._data ? this._data.canShareByEmail : false;
    }

    get canShowInputWhatsapp(): boolean {
        return this._data ? this._data.canShareByWhatsapp : false;
    }

    closeModal(): void {
        this.form.reset();
        this._isFormSubmitted = false;
        ModalHelper.hide(this.modalId);
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

    updatePhoneCode(phoneCode: string): void {
        this.form.patchValue({ phoneCode });
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this._loadTask();
        }
    }

    private _buildForm(): void {
        this.isFormBuilt = false;
        if (this._data?.canShareByEmail) {
            this.form.addControl(
                'email',
                new FormControl('', [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ])
            );
        }
        if (this._data?.canShareByWhatsapp) {
            this.form.addControl(
                'phoneCode',
                new FormControl(PHONE_CODES.MEXICO)
            );
            this.form.addControl(
                'phoneNumber',
                new FormControl('', [
                    Validators.required,
                    ValidatorsHelper.phoneNumber,
                ])
            );
        }
        this.isFormBuilt = true;
    }

    private _loadTask(): void {
        this._loadingService.show();
        const email = this._data!.canShareByEmail
            ? this.form.controls.email.value
            : '';
        const phoneNumber = this._data!.canShareByWhatsapp
            ? this.form.controls.phoneCode.value +
              '1' +
              this.form.controls.phoneNumber.value
            : '';
        this.closeModal();
        const fields =
            'taskTitle,taskDetails,workspaceName,workspaceAvatarUrl,createdByName';
        this._taskService
            .getTask(this._data!.taskId, fields)
            .subscribe((task) => {
                this._sendTaskNotification(email, phoneNumber, task);
            });
    }

    private _sendTaskNotification(
        email: string,
        phoneNumber: string,
        task: Task
    ): void {
        const requestBody: SendTaskNotfication = {
            taskId: this._data!.taskId,
            canSendByEmail: this._data!.canShareByEmail,
            canSendByWhatsapp: this._data!.canShareByWhatsapp,
            email,
            phoneNumber,
            taskTitle: task.taskTitle,
            taskDetails: task.taskDetails,
            workspaceName: task.workspaceName,
            workspaceAvatarUrl: task.workspaceAvatarUrl,
            createdByName: task.createdByName,
        };
        this._taskService
            .sendTaskNotification(requestBody)
            .subscribe((whatsappLink) => {
                this._loadingService.hide();
                if (this._data?.canShareByWhatsapp) {
                    UtilitiesHelper.sendMessageByWhatsapp(whatsappLink);
                }
                AlertHelper.taskSent();
            });
    }
}
