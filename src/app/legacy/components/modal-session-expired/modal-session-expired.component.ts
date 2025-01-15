import { Component, Input } from '@angular/core';

import { AuthService } from '@features-legacy/auth/services/auth.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-session-expired',
    templateUrl: './modal-session-expired.component.html',
    styles: [],
    standalone: false
})
export class ModalSessionExpiredComponent {
    @Input() modalId: string = '';

    constructor(private _authService: AuthService) {}

    /**
     * Navigate to Atom Account to start session again
     */
    goToAtomAcccount(): void {
        ModalPlugin.hide(this.modalId);
        this._authService.logout(true);
    }
}
