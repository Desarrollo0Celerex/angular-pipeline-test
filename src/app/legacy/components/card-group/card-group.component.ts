import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Group } from '@interfaces/group.interface';

@Component({
    selector: 'agt-card-group',
    templateUrl: './card-group.component.html',
    styles: [],
    standalone: false
})
export class CardGroupComponent {
    @Input() group: Group | null = null;
    @Input() isCoincidence: boolean = false;
    @Output() showGroupDetails: EventEmitter<Group> = new EventEmitter<Group>();
    @Output() groupSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _router: Router) { }

    goToGroupResume(): void {
        if(!!this.group) {
            this._router.navigateByUrl(ROUTES_NAME.groupResume(this.group.groupId));
        }
    }

    requestShowPolicyDetails(): void {
        if(!!this.group) {
            this.showGroupDetails.emit(this.group);
        }
    }

    selectGroup(): void {
        if(!!this.group) {
            this.groupSelected.emit(this.group.groupId);
        }
    }
}
