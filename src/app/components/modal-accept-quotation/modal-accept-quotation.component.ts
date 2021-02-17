import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UploadPolicyData } from '@interfaces/upload-policy-data.interface';
import { LoadingService } from '@services/loading.service';

import { ModalAcceptQuotationService } from './modal-accept-quotation.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-accept-quotation',
  templateUrl: './modal-accept-quotation.component.html',
  styles: [
  ]
})
export class ModalAcceptQuotationComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() quotationId: string;

    constructor(
        private _loadingService: LoadingService,
        private _modalAcceptQuotationService: ModalAcceptQuotationService,
        private _router: Router
    ) {
        this.contactId = '';
        this.modalId = '';
        this.quotationId = '';
    }

    /**
     * Click event to accept the quotation
     */
    onClickAcceptQuotation(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalAcceptQuotationService.acceptQuotation(this.contactId, this.quotationId).subscribe( (res: HttpResponse) => {
            this._loadingService.hide();
            const data: UploadPolicyData = { contactId: this.contactId, policyId: res.data };
            AlertHelper.quotationAccepted(this._goToUploadPolicy, this, data)
        })
    }

    /**
     * Navigates to upload the policy data
     * @param context The app context
     * @param data    The data to navigate to upload policy
     */
    private _goToUploadPolicy(context: ModalAcceptQuotationComponent, data: UploadPolicyData): void {
        context._router.navigateByUrl(ROUTES_NAME.uploadPolicy(data.contactId, data.policyId));
    }

}
