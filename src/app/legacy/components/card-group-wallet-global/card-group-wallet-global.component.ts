import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardGroupWalletGlobalService } from './card-group-wallet-global.service';

@Component({
  selector: 'agt-card-group-wallet-global',
  templateUrl: './card-group-wallet-global.component.html',
  styles: [
  ],
  providers: [CardGroupWalletGlobalService]
})
export class CardGroupWalletGlobalComponent implements OnChanges {
    @Input() groupId: string = '';

    constructor(
        public model: CardGroupWalletGlobalService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadGroup(changes.groupId.currentValue);
        }
    }

    goToGroupPolicies(): void {
        this._router.navigateByUrl(ROUTES_NAME.groupPolicies(this.groupId.toString()));
    }
}
