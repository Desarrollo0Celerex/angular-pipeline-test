import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SmartComponent } from '@core/classes/smart-component';
import { ModalHelper } from '@core/helpers/modal.helper';
import { ModuleService } from '@features/tasks/services/module.service';

@Component({
    selector: 'agt-modal-select-channels-to-share-task',
    templateUrl: './modal-select-channels-to-share-task.component.html',
    styles: [],
})
export class ModalSelectChannelsToShareTaskComponent
    extends SmartComponent
    implements OnInit
{
    modalId = 'agt-modal-select-channels';
    form: FormGroup = this._buildForm();
    private _taskId = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _moduleService: ModuleService
    ) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.modalSelectChannels$
            .pipe(this.untilComponentDestroy())
            .subscribe((taskId) => {
                this._taskId = taskId;
                ModalHelper.showModal(this.modalId);
            });
    }

    get canShareTask(): boolean {
        return (
            this.form.controls.whatsapp.value || this.form.controls.email.value
        );
    }
    closeModal(): void {
        ModalHelper.hideModal(this.modalId);
        this.form.reset();
    }

    validForm(): void {
        if (this.form.valid) {
            const canShareByEmail = this.form.controls.email.value;
            const canShareByWhatsapp = this.form.controls.whatsapp.value;
            this.closeModal();
            this._moduleService.showModalRequestContactInformationToShareTask({
                taskId: this._taskId,
                canShareByEmail,
                canShareByWhatsapp,
            });
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            whatsapp: [false],
            email: [false],
        });
    }
}
