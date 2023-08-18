import { Component, ViewChild } from '@angular/core';
import { ROUTES_NAME } from '@constants/routes-name';
import { PolicySenderComponent } from '../policy-sender/policy-sender.component';
import { SelectActionForSavedPolicy } from '@features/policy/interfaces/select-action-for-saved-policy.interface';
import { AlertHelper } from '@core/helpers/alert.helper';
import { Router } from '@angular/router';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-action-for-saved-policy',
    templateUrl: './modal-select-action-for-saved-policy.component.html',
    styles: [],
})
export class ModalSelectActionForSavedPolicyComponent {
    @ViewChild(PolicySenderComponent)
    policySenderComponent!: PolicySenderComponent;
    data: SelectActionForSavedPolicy | undefined = undefined;
    modalId = 'agt-modal-select-action-for-saved-policy';
    routeContactPolicies = '';
    routePolicyPendingReceipts = '';
    routePolicyRecord = '';

    constructor(private _router: Router) {}

    sendPolicy(): void {
        this.policySenderComponent.sendPolicy({
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

    showModal(data: SelectActionForSavedPolicy): void {
        this.data = data;
        this._initRoutes();
        ModalPlugin.show(this.modalId);
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

    private _goToListContactPolicies(
        context: ModalSelectActionForSavedPolicyComponent
    ): void {
        context._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(context.data!.contactId)
        );
    }
}
