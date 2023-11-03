import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DownloadPolicyComponent } from '../download-policy/download-policy.component';
import { Policy } from '@policies/interfaces/policy.interface';
import { UpdatePolicyModalComponent } from '../update-policy-modal/update-policy-modal.component';
import { DeletePolicyModalComponent } from '../delete-policy-modal/delete-policy-modal.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-update-policy-actions-modal',
    templateUrl: './update-policy-actions-modal.component.html',
    styles: [],
})
export class UpdatePolicyActionsModalComponent {
    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
    @ViewChild(DownloadPolicyComponent)
    downloadPolicyComponent!: DownloadPolicyComponent;
    @ViewChild(UpdatePolicyModalComponent)
    updatePolicyModalComponent!: UpdatePolicyModalComponent;
    @ViewChild(DeletePolicyModalComponent)
    deletePolicyModalComponent!: DeletePolicyModalComponent;

    modalId = 'agt-update-policy-actions-modal';
    private _policy: Policy | undefined = undefined;

    init(policy: Policy | undefined): void {
        this._policy = policy;
        ModalPlugin.show(this.modalId);
    }

    showModalDownloadPolicy(): void {
        this.downloadPolicyComponent.init({
            contactId: this._policy!.contactId,
            policyId: this._policy!.policyId,
            cancelRoute: [],
        });
    }

    showModalUpdatePolicy(): void {
        this.updatePolicyModalComponent.init();
    }

    showModalConfirmDeletePolicy(): void {
        this.deletePolicyModalComponent.init(
            this._policy!.contactId,
            this._policy!.policyId
        );
    }
}
