import { Component, Input } from '@angular/core';

import { AuthService } from '@features-legacy/auth/services/auth.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-user-role-updated',
    templateUrl: './modal-user-role-updated.component.html',
    styles: [],
    standalone: false
})
export class ModalUserRoleUpdatedComponent {
    @Input() modalId: string = '';

    constructor(private _authService: AuthService) {}

    /**
     * Restart the user session
     */
    restartSession(): void {
        ModalPlugin.hide(this.modalId);
        this._authService.restartSession();
    }
}
