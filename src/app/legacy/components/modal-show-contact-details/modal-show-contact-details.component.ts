import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Contact } from '@core/interfaces/contact.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-contact-details',
    templateUrl: './modal-show-contact-details.component.html',
    styles: [],
    standalone: false
})
export class ModalShowContactDetailsComponent {
    @Input() modalId: string = '';
    @Input() contact: Contact | null = null;

    constructor(private _router: Router) {}

    get walletPending(): number {
        if (
            !!this.contact &&
            !!this.contact.totalGlobalWallet &&
            !!this.contact.totalGlobalWalletPaid
        ) {
            return (
                this.contact.totalGlobalWallet -
                this.contact.totalGlobalWalletPaid
            );
        }
        return 0;
    }

    goToContactPolicies(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(
            ROUTES_NAME.listContactPolicies(this.contact!.contactId)
        );
    }
}
