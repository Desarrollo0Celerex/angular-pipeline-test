import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-cancellation-type',
    templateUrl: './modal-select-cancellation-type.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectCancellationTypeComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) {}

    cancelPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(
            ROUTES_NAME.cancelPolicy(this.contactId, this.policyId)
        );
    }

    endorsePolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(
            ROUTES_NAME.endorsePolicy(this.contactId, this.policyId)
        );
    }
}
