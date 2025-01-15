import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-duplicate-partner',
    templateUrl: './modal-duplicate-partner.component.html',
    styles: [],
    standalone: false
})
export class ModalDuplicatePartnerComponent {
    @Input() modalId: string = '';
    @Input() partnerName: string = '';

    constructor(private _router: Router) { }

    goToPartnerCoincidences(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigate([ROUTES_NAME.partnerCoincidences], { queryParams: { partnerName: this.partnerName } } );
    }
}
