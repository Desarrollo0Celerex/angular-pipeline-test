import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Sinister } from '@interfaces/sinister.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-sinister-details',
  templateUrl: './modal-show-sinister-details.component.html',
  styles: [
  ]
})
export class ModalShowSinisterDetailsComponent {
    @Input() modalId: string = '';
    @Input() sinister: Sinister | null = null;

    constructor(private _router: Router) { }

    /**
     * Click event to navigate to events
     */
    onclickGoToEvents(): void {
        if(!!this.sinister) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.showSinisterHistory(this.sinister.contactId, this.sinister.policyId, this.sinister.sinisterId));
        }
    }

}
