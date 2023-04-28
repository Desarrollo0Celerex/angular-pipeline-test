import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { QUOTATION_STATUS } from '@constants/global';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@core/services/loading.service';

import { ModalConfirmRejectQuotationService } from './modal-confirm-reject-quotation.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-reject-quotation',
    templateUrl: './modal-confirm-reject-quotation.component.html',
    styles: [],
})
export class ModalConfirmRejectQuotationComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() quotationId: string;

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmRejectQuotationService: ModalConfirmRejectQuotationService,
        private _router: Router
    ) {
        this.contactId = '';
        this.modalId = '';
        this.quotationId = '';
    }

    /**
     * Click event to reject the quotation
     */
    onClickRejectQuotation(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalConfirmRejectQuotationService
            .rejectQuotation(this.contactId, this.quotationId)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.quotationRejected(
                    this._goToQuotationsRejected,
                    this,
                    this.contactId
                );
            });
    }

    /**
     * Navigates to the quotations rejected
     * @param context   The app context
     * @param contactId The contact ID
     */
    private _goToQuotationsRejected(
        context: ModalConfirmRejectQuotationComponent,
        contactId: string
    ): void {
        context._router.navigate(
            [ROUTES_NAME.listContactQuotations(contactId)],
            { queryParams: { contentSubtype: QUOTATION_STATUS.REJECTED } }
        );
    }
}
