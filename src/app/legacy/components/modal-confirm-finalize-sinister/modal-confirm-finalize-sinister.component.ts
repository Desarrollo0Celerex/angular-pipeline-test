import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-finalize-sinister',
    templateUrl: './modal-confirm-finalize-sinister.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmFinalizeSinisterComponent {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;

    constructor(private _router: Router) { }

    /**
     * Click event to confirm finalize sinister
     */
    onClickConfirmAction(): void {
        if(!!this.sinisterData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.finalizeSinister(this.sinisterData.contactId, this.sinisterData.policyId, this.sinisterData.sinisterId))
        }
    }
}
