import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';
import { PolicyService } from '@policy/services/policy.service';
import { PolicyActionsDeletedModalComponent } from '../policy-actions-deleted-modal/policy-actions-deleted-modal.component';

declare var ModalPlugin: any;
@Component({
    selector: 'agt-delete-policy-modal',
    templateUrl: './delete-policy-modal.component.html',
    styles: [],
})
export class DeletePolicyModalComponent {
    @Input() canShowPolicyActions = false;
    @ViewChild(PolicyActionsDeletedModalComponent)
    policyActionsDeletedModalComponent!: PolicyActionsDeletedModalComponent;
    @Output() policyDeleted = new EventEmitter<void>();
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
        ModalPlugin.hide(this.modalId);
        this._policyService
            .deleteActivePolicy(this._contactId, this._policyId)
            .subscribe(() => {
                this._loadingService.hide();
                this.policyDeleted.emit();
                if (this.canShowPolicyActions) {
                    this.policyActionsDeletedModalComponent.openModal();
                } else {
                    AlertHelper.policyDeleted();
                    this._goToContactPolicies();
                }
            });
    }

    private _goToContactPolicies(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(this._contactId)
        );
    }
}
