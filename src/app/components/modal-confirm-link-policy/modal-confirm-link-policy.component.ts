import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ModalConfirmLinkPolicyService } from './modal-confirm-link-policy.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-link-policy',
  templateUrl: './modal-confirm-link-policy.component.html',
  styles: [
  ],
  providers: [
      ModalConfirmLinkPolicyService
  ]
})
export class ModalConfirmLinkPolicyComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() insuranceId: number = 0;
    @Input() insuranceTypeId: number = 0;
    @Input() tracker: string = '';

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmLinkPolicyService: ModalConfirmLinkPolicyService,
        private _router: Router
    ) { }

    get model(): ModalConfirmLinkPolicyService {
        return this._modalConfirmLinkPolicyService;
    }

    createPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this.model.createPolicy(this.contactId, this.insuranceId, this.insuranceTypeId, this.tracker).subscribe( (policyId: string) => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(this.contactId, policyId));
        })
    }
}
