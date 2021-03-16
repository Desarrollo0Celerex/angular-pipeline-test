import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ModalConfirmRenewPolicyService } from './modal-confirm-renew-policy.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-renew-policy',
  templateUrl: './modal-confirm-renew-policy.component.html',
  styles: [
  ]
})
export class ModalConfirmRenewPolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    ROUTES_NAME: any;

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmRenewPolicyService: ModalConfirmRenewPolicyService,
        private _router: Router,
    ) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.ROUTES_NAME = ROUTES_NAME;
    }

    /**
     * Click event to renew policy to other client
     */
    onClickRenewPolicyToOtherClient(): void {
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Click event to renew the policy to same client
     */
    onClickRenewPolicyToSameClient(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalConfirmRenewPolicyService.renewPolicy(this.contactId, this.policyId).subscribe( (res: HttpResponse) => {
            this._loadingService.hide();
            this._router.navigate([ROUTES_NAME.uploadPolicy(this.contactId, res.data)], { queryParams: { isRenewal: true } });
        })
    }
}
