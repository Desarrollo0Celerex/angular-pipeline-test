import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { PolicyService } from '@policy/services/policy.service';

declare var ModalPlugin: any;
@Component({
    selector: 'agt-delete-policy-modal',
    templateUrl: './delete-policy-modal.component.html',
    styles: [],
})
export class DeletePolicyModalComponent {
    modalId = 'agt-delete-policy-modal';
    private _contactId = '';
    private _policyId = '';

    constructor(
        private _loadingService: LoadingService,
        private _policyService: PolicyService,
        private _router: Router
    ) {}

    init(contactId: string, policyId: string): void {
        this._contactId = contactId;
        this._policyId = policyId;
        ModalPlugin.show(this.modalId);
    }

    deletePolicy(): void {
        this._loadingService.show();
        this._policyService
            .deleteActivePolicy(this._contactId, this._policyId)
            .subscribe(() => {
                this._loadingService.hide();
                ModalPlugin.hide(this.modalId);
                AlertHelper.policyDeleted();
                this._goToContactPolicies();
            });
    }

    private _goToContactPolicies(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(this._contactId)
        );
    }
}
