import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-container-policy-endorsements-manager',
  templateUrl: './container-policy-endorsements-manager.component.html',
  styles: [
  ]
})
export class ContainerPolicyEndorsementsManagerComponent {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    goToPolicyHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId))
    }

}
