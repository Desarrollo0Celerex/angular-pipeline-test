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

    goToGroupResume(): void {
        if(!!this.group) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.groupResume(this.group.groupId));
        }
    }
}
