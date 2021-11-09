import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Group } from '@interfaces/group.interface';

@Component({
  selector: 'agt-card-group',
  templateUrl: './card-group.component.html',
  styles: [
  ]
})
export class CardGroupComponent {
    @Input() group: Group | null = null;

    constructor(private _router: Router) { }

    goToGroupResume(): void {
        if(!!this.group) {
            this._router.navigateByUrl(ROUTES_NAME.groupResume(this.group.groupId));
        }
    }
}
