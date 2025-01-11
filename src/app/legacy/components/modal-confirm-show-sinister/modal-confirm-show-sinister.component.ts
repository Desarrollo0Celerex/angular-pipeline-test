import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-sinister',
    templateUrl: './modal-confirm-show-sinister.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowSinisterComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;

    constructor(private _router: Router) { }

    ngOnInit(): void {
    }

    /**
     * Click event to confirm show the sinister
     */
    onClickConfirmAction(): void {
        if(!!this.sinisterData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.showSinisterHistory(this.sinisterData.contactId, this.sinisterData.policyId, this.sinisterData.sinisterId))
        }
    }

}
