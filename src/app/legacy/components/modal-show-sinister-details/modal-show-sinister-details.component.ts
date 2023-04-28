import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { SINISTER_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { Sinister } from '@interfaces/sinister.interface';

import { ModalShowSinisterDetailsService } from './modal-show-sinister-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-sinister-details',
  templateUrl: './modal-show-sinister-details.component.html',
  styles: [
  ],
  providers: [ModalShowSinisterDetailsService]
})
export class ModalShowSinisterDetailsComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() sinister: Sinister | null = null;

    constructor(
        public model: ModalShowSinisterDetailsService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.sinister && changes.sinister.currentValue) {
            this.model.loadSinister(changes.sinister.currentValue.contactId, changes.sinister.currentValue.policyId, changes.sinister.currentValue.sinisterId);
        }
    }

    get sinisterStatus(): string {
        let sinisterStatus: string = '';
        if(!!this.model.sinister && !!this.model.sinister.sinisterStatusId) {
            sinisterStatus = (this.model.sinister.sinisterStatusId === SINISTER_STATUS.FINISHED) ? 'CERRADO' : 'ABIERTO'
        }
        return sinisterStatus;
    }

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
