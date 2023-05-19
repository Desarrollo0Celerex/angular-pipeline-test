import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AuthService } from '@core/services/auth/auth.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-update-policy',
    templateUrl: './modal-confirm-update-policy.component.html',
    styles: [],
})
export class ModalConfirmUpdatePolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    roleId: number = this._authService.roleId;

    constructor(private _authService: AuthService, private _router: Router) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
    }

    /**
     * Event to close the modal
     */
    onClickCloseModal(): void {
        this._router.navigateByUrl(
            ROUTES_NAME.updateCompletePolicy(this.contactId, this.policyId)
        );
        ModalPlugin.hide(this.modalId);
    }
}
