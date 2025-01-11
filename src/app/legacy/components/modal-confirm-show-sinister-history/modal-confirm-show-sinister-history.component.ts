import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-sinister-history',
    templateUrl: './modal-confirm-show-sinister-history.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowSinisterHistoryComponent {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;

    constructor(private _router: Router) { }

    /**
     * Event to confirm show the sinister history
     */
    onClickConfirmAction(): void {
        ModalPlugin.hide(this.modalId);
        if(!!this.sinisterData) {
            this._router.navigateByUrl(ROUTES_NAME.showSinisterHistory(this.sinisterData.contactId, this.sinisterData.policyId, this.sinisterData.sinisterId));
        }
    }
}
