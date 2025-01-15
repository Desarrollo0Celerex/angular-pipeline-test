import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-duplicate-group',
    templateUrl: './modal-duplicate-group.component.html',
    styles: [],
    standalone: false
})
export class ModalDuplicateGroupComponent {
    @Input() modalId: string = '';
    @Input() groupName: string = '';

    constructor(private _router: Router) { }

    goToGroupCoincidences(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigate([ROUTES_NAME.groupCoincidences], { queryParams: { groupName: this.groupName } } );
    }
}
