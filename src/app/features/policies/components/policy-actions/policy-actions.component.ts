import { Component, ViewChild } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyActions } from '@policies/interfaces/policy-actions.interface';
import { Router } from '@angular/router';
import { DownloadPolicyComponent } from '../download-policy/download-policy.component';
import { FollowPolicyComponent } from '../follow-policy/follow-policy.component';
import { SendPolicyModalComponent } from '../send-policy-modal/send-policy-modal.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-actions',
    templateUrl: './policy-actions.component.html',
    styles: [],
})
export class PolicyActionsComponent {
    @ViewChild(DownloadPolicyComponent)
    downloadPolicyComponent!: DownloadPolicyComponent;
    @ViewChild(FollowPolicyComponent)
    followPolicyComponent!: FollowPolicyComponent;
    @ViewChild(SendPolicyModalComponent)
    sendPolicyModalComponent!: SendPolicyModalComponent;
    alertMessage = '';
    canShowAlert = false;
    data: PolicyActions | undefined = undefined;
    modalId = 'agt-policy-actions';
    routeContactPolicies = '';
    routePolicyPendingReceipts = '';
    routePolicyRecord = '';

    closeModal(): void {
        this.canShowAlert = false;
        this.alertMessage = '';
        ModalPlugin.hide(this.modalId);
    }

    init(data: PolicyActions): void {
        this.data = data;
        if (this.data.isSavedPolicy) {
            this.canShowAlert = true;
            this.alertMessage = 'La póliza se guardó con éxito.';
        }
        this._initRoutes();
        ModalPlugin.show(this.modalId);
    }

    showModalSendPolicy(): void {
        this.sendPolicyModalComponent.show(
            this.data!.contactId,
            this.data!.policyId
        );
    }

    showAlertPolicySent(): void {
        ModalPlugin.show(this.modalId);
        this.canShowAlert = true;
        this.alertMessage = 'La póliza se envió con éxito.';
    }

    showModalCreateTask(): void {
        this.followPolicyComponent.init({
            contactId: this.data!.contactId,
            policyId: this.data!.policyId,
            cancelRoute: this.data!.cancelRoute,
        });
    }

    showModalDownloadPolicy(): void {
        this.downloadPolicyComponent.init({
            contactId: this.data!.contactId,
            policyId: this.data!.policyId,
            cancelRoute: this.data!.cancelRoute,
        });
    }

    private _initRoutes(): void {
        this.routeContactPolicies =
            '/' + ROUTES_NAME.listContactPolicies(this.data!.contactId);
        this.routePolicyPendingReceipts =
            '/' +
            ROUTES_NAME.pendingReceipts(
                this.data!.contactId,
                this.data!.policyId,
                this.data!.paymentId
            );

        this.routePolicyRecord =
            '/' +
            ROUTES_NAME.showHistoryPolicy(
                this.data!.contactId,
                this.data!.policyId
            );
    }
}
