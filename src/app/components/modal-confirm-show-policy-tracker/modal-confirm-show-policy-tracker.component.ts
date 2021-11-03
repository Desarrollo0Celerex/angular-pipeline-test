import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-policy-tracker',
  templateUrl: './modal-confirm-show-policy-tracker.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPolicyTrackerComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    goToPolicyTracker(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.policyTracker(this.contactId, this.policyId));
    }
}
