import { Component, OnInit, ViewChild } from '@angular/core';
import { PolicyService } from '@policy/services/policy.service';
import { PolicyUpdateActionsModalService } from './policy-update-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { POLICY_ROUTES } from '@policy/constants/routes';
import { UpdatePolicyFileModalComponent } from '../update-policy-file-modal/update-policy-file-modal.component';
import * as moment from 'moment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-update-actions-modal',
    templateUrl: './policy-update-actions-modal.component.html',
    styles: [],
})
export class PolicyUpdateActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    @ViewChild(UpdatePolicyFileModalComponent)
    updatePolicyFileModalComponent!: UpdatePolicyFileModalComponent;
    alertMessage = '';
    contactId = '';
    lastUpdateDays = -1;
    modalId = 'agt-policy-update-actions-modal';
    policyId = '';

    constructor(
        private _policyUpdateActionsModalService: PolicyUpdateActionsModalService,
        private _policyService: PolicyService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policyUpdateActionsModalService.policyUpdateActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                (this.contactId = data.contactId),
                    (this.policyId = data.policyId),
                    this._openModal();
                this._loadLastUpdateDate();
            });
    }

    get policyTrackerRoute(): string {
        return '/' + POLICY_ROUTES.policyTracker(this.contactId, this.policyId);
    }

    get updatePolicyRoute(): string {
        return '/' + POLICY_ROUTES.updatePolicy(this.contactId, this.policyId);
    }

    updatePolicyFile(): void {
        this.updatePolicyFileModalComponent.openModal({
            contactId: this.contactId,
            policyId: this.policyId,
        });
    }

    private _calculateLastUpdateDays(lastUpdateDate: string | null): void {
        if (lastUpdateDate !== null) {
            const currentDate = moment();
            this.lastUpdateDays = currentDate.diff(lastUpdateDate, 'days');
        } else {
            this.lastUpdateDays = -1;
        }
    }

    private _generateAlertMessage(): void {
        this.alertMessage = '';
        if (this.lastUpdateDays !== -1) {
            if (this.lastUpdateDays === 0) {
                this.alertMessage =
                    'La póliza se actualizó <strong>hoy</strong>.';
            } else if (this.lastUpdateDays === 1) {
                this.alertMessage =
                    'La póliza se actualizó hace <strong>1</strong> día.';
            } else {
                this.alertMessage =
                    'La póliza se actualizó hace <strong>' +
                    this.lastUpdateDays +
                    '</strong> días.';
            }
        }
    }

    private _loadLastUpdateDate(): void {
        this.alertMessage = '';
        const fields = 'updatedAt';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                this._calculateLastUpdateDays(policy.updatedAt);
                this._generateAlertMessage();
            });
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }
}
