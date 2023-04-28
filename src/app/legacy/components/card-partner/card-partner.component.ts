import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Partner } from '@interfaces/partner.interface';

@Component({
  selector: 'agt-card-partner',
  templateUrl: './card-partner.component.html',
  styles: [
  ]
})
export class CardPartnerComponent {
    @Input() partner: Partner | null = null;
    @Input() isCoincidence: boolean = false;
    @Output() partnerSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() showDetails: EventEmitter<Partner> = new EventEmitter<Partner>();

    constructor(private _router: Router) { }

    goToPartnerResume(): void {
        if(!!this.partner) {
            this._router.navigateByUrl(ROUTES_NAME.partnerResume(this.partner.partnerId));
        }
    }

    requestShowDetails(): void {
        if(!!this.partner) {
            this.showDetails.emit(this.partner);
        }
    }

    selectPartner(): void {
        if(!!this.partner) {
            this.partnerSelected.emit(this.partner.partnerId);
        }
    }
}
