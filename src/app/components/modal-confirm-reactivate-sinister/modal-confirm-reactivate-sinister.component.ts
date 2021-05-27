import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME} from '@constants/routes-name';
import { SinisterDataSend} from '@interfaces/sinister-data-send.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-reactivate-sinister',
  templateUrl: './modal-confirm-reactivate-sinister.component.html',
  styles: [
  ]
})
export class ModalConfirmReactivateSinisterComponent {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;

    constructor(private _router: Router) { }

    /**
     * Click event to navigate to reactivate the sinister
     */
    onClickConfirmAction(): void {
        if(!!this.sinisterData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.reactivateSinister(this.sinisterData.contactId, this.sinisterData.policyId, this.sinisterData.sinisterId));
        }
    }

}
