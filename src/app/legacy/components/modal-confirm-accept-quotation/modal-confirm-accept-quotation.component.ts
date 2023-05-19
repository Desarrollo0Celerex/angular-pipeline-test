import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalConfirmAcceptQuotationService } from './modal-confirm-accept-quotation.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-accept-quotation',
    templateUrl: './modal-confirm-accept-quotation.component.html',
    styles: [],
})
export class ModalConfirmAcceptQuotationComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() quotationId: string;

    constructor(
        private _loadingService: LoadingService,
        private _modalAcceptQuotationService: ModalConfirmAcceptQuotationService,
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
        this._modalAcceptQuotationService
            .acceptQuotation(this.contactId, this.quotationId)
            .subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                this._router.navigateByUrl(
                    ROUTES_NAME.uploadPolicy(this.contactId, res.data)
                );
            });
    }
}
