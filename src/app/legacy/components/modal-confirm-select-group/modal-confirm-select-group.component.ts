import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-select-group',
    templateUrl: './modal-confirm-select-group.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmSelectGroupComponent {
    @Input() modalId: string = '';
    @Input() groupId: string = '';

    constructor(private _router: Router) { }

    goToGroupResume(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.groupResume(this.groupId));
    }

}
