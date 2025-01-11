import { Component, Input, ViewChild } from '@angular/core';
import { UploadPolicyComplementModalComponent } from '../upload-policy-complement-modal/upload-policy-complement-modal.component';
import { PolicyComplement } from '@policy-complement/interfaces/policy-complement.interface';
import { PolicyComplementService } from '@policy-complement/services/policy-complement.service';
import { DownloadPolicyComplementModalComponent } from '../download-policy-complement-modal/download-policy-complement-modal.component';
import { DeletePolicyComplementModalComponent } from '../delete-policy-complement-modal/delete-policy-complement-modal.component';
import { ArrayHelper } from '@core/helpers/array.helper';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-complement-modal',
    templateUrl: './policy-complement-modal.component.html',
    styles: [],
    standalone: false
})
export class PolicyComplementModalComponent {
    @Input() contactId = '';
    @Input() policyId = '';
    @ViewChild(UploadPolicyComplementModalComponent)
    uploadPolicyComplementModalComponent!: UploadPolicyComplementModalComponent;
    @ViewChild(DownloadPolicyComplementModalComponent)
    downloadPolicyComplementModalComponent!: DownloadPolicyComplementModalComponent;
    @ViewChild(DeletePolicyComplementModalComponent)
    deletePolicyComplementModalComponent!: DeletePolicyComplementModalComponent;
    alertMessage = '';
    canShowAlert = false;
    isInitializedComponent = false;
    modalId = 'agt-policy-complement-modal';
    policyComplements: PolicyComplement[] = [];

    constructor(private _policyComplementService: PolicyComplementService) {}

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this.canShowAlert = false;
    }

    downloadPolicyComplement(fileUrl: string): void {
        this.closeModal();
        this.downloadPolicyComplementModalComponent.show(fileUrl);
    }

    handleComplementDeletedSuccessfully(policyComplementId: string): void {
        ModalPlugin.show(this.modalId);
        this._showAlert('El complemento se eliminó con éxito.');
        this._removePolicyComplement(policyComplementId);
    }

    handleComplementUploadedSuccessfully(
        policyComplement: PolicyComplement
    ): void {
        ModalPlugin.show(this.modalId);
        this._showAlert('El complemento se cargó con éxito.');
        this.policyComplements.unshift(policyComplement);
    }

    show(): void {
        if (!this.isInitializedComponent) {
            this.isInitializedComponent = true;
            this._loadPolicyComplements();
        }
        ModalPlugin.show(this.modalId);
    }

    showModalDeletePolicyComplement(policyComplementId: string): void {
        this.closeModal();
        this.deletePolicyComplementModalComponent.show(policyComplementId);
    }

    showModalUploadPolicyComplement(): void {
        this.uploadPolicyComplementModalComponent.show();
    }

    private _loadPolicyComplements(): void {
        const fields = 'policyComplementId,name,url';
        this._policyComplementService
            .getPolicyComplements(this.contactId, this.policyId, fields)
            .subscribe((policyComplements) => {
                this.policyComplements = policyComplements;
            });
    }

    private _removePolicyComplement(policyComplementId: string): void {
        const index = ArrayHelper.findIndex(
            policyComplementId,
            'policyComplementId',
            this.policyComplements
        );
        this.policyComplements.splice(index, 1);
    }

    private _showAlert(message: string): void {
        this.alertMessage = message;
        this.canShowAlert = true;
    }
}
