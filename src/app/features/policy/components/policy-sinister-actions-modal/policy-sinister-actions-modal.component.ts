import { Component, OnInit } from '@angular/core';
import { PolicySinisterActionsModalService } from './policy-sinister-actions-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { SINISTER_ROUTES } from '@sinister/constants/routes';
import { PolicyService } from '@policy/services/policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-sinister-actions-modal',
    templateUrl: './policy-sinister-actions-modal.component.html',
    styles: [],
})
export class PolicySinisterActionsModalComponent
    extends SmartComponent
    implements OnInit
{
    contactId = '';
    policyId = '';
    policyInsuranceId = 0;
    modalId = 'agt-policy-sinister-actions-modal';
    modalIdCreateSinister = 'agt-create-sinister-modal';
    totalSinisters = 0;

    constructor(
        private _policySinisterActionsModalService: PolicySinisterActionsModalService,
        private _policyService: PolicyService
    ) {
        super();
    }

    ngOnInit(): void {
        this._policySinisterActionsModalService.policySinisterActionsModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                (this.contactId = data.contactId),
                    (this.policyId = data.policyId),
                    (this.policyInsuranceId = data.policyInsuranceId),
                    this._openModal();
                this._loadTotalSinister();
            });
    }

    get alertMessage(): string {
        return this.totalSinisters === 1
            ? 'La póliza tiene <strong>1</strong> siniestro reportado.'
            : 'La póliza tiene <strong>' +
                  this.totalSinisters +
                  '</strong> siniestros reportados.';
    }

    get sinistersRecordRoute(): string {
        return (
            '/' +
            SINISTER_ROUTES.policySinistersRecord(this.contactId, this.policyId)
        );
    }

    get sinistersOpenRoute(): string {
        return (
            '/' +
            SINISTER_ROUTES.policySinistersOpen(this.contactId, this.policyId)
        );
    }

    get sinistersClosedRoute(): string {
        return (
            '/' +
            SINISTER_ROUTES.policySinistersClosed(this.contactId, this.policyId)
        );
    }

    createSinister(): void {
        ModalPlugin.show(this.modalIdCreateSinister);
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
    }

    private _loadTotalSinister(): void {
        this.totalSinisters = 0;
        const fields = 'totalSinisters';
        this._policyService
            .getContactPolicy(this.contactId, this.policyId, fields)
            .subscribe((policy) => {
                this.totalSinisters = policy.totalSinisters;
            });
    }
}
