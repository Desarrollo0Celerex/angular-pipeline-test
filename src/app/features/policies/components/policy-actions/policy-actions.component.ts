import { Component, ViewChild } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { SendPolicyComponent } from '../send-policy/send-policy.component';
import { PolicyActions } from '@policies/interfaces/policy-actions.interface';
import { AlertHelper } from '@core/helpers/alert.helper';
import { Router } from '@angular/router';
import { DownloadPolicyComponent } from '../download-policy/download-policy.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-policy-actions',
    templateUrl: './policy-actions.component.html',
    styles: [],
})
export class PolicyActionsComponent {
    @ViewChild(DownloadPolicyComponent)
    downloadPolicyComponent!: DownloadPolicyComponent;
    @ViewChild(SendPolicyComponent)
    sendPolicyComponent!: SendPolicyComponent;
    data: PolicyActions | undefined = undefined;
    modalId = 'agt-policy-actions';
    routeContactPolicies = '';
    routePolicyPendingReceipts = '';
    routePolicyRecord = '';

    constructor(private _router: Router) {}

    init(data: PolicyActions): void {
        this.data = data;
        this._initRoutes();
        ModalPlugin.show(this.modalId);
    }

    showModalSendPolicy(): void {
        this.sendPolicyComponent.init({
            contactId: this.data!.contactId,
            policyId: this.data!.policyId,
            cancelRoute: this.routeContactPolicies,
            phoneCode: this.data!.phoneCode,
            phoneNumber: this.data!.phoneNumber,
            email: this.data!.email,
        });
    }

    showAlertPolicySent(): void {
        AlertHelper.policySent(this._goToListContactPolicies, this);
    }

    showModalCreateTask(): void {}

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

    private _goToListContactPolicies(context: PolicyActionsComponent): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.data!.contactId)
        );
    }
}
