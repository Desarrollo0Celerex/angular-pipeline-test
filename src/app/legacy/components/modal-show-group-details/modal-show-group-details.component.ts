import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Group } from '@interfaces/group.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-group-details',
  templateUrl: './modal-show-group-details.component.html',
  styles: [
  ]
})
export class ModalShowGroupDetailsComponent {
    @Input() modalId: string = '';
    @Input() group: Group | null = null;

    constructor(private _router: Router) { }

    get walletPending(): number {
        if(!!this.group && !!this.group.totalGlobalWallet && !!this.group.totalGlobalWalletPaid) {
            return this.group.totalGlobalWallet - this.group.totalGlobalWalletPaid;
        }
        return 0;
    }

    goToGroupMembers(): void {
        if(!!this.group) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.groupMembers(this.group.groupId));
        }
    }
}
