import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Partner } from '@interfaces/partner.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-partner-details',
  templateUrl: './modal-show-partner-details.component.html',
  styles: [
  ]
})
export class ModalShowPartnerDetailsComponent {
    @Input() modalId: string = '';
    @Input() partner: Partner | null = null;

    constructor(private _router: Router) { }

    get walletPending(): number {
        if(!!this.partner && !!this.partner.wallet && !!this.partner.walletPaid) {
            return this.partner.wallet - this.partner.walletPaid;
        }
        return 0;
    }

    goToPartnerPolicies(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.partnerPolicies(this.partner!.partnerId))
    }
}
