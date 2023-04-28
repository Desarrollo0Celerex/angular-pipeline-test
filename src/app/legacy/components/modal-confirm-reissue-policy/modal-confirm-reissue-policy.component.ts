import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalConfirmReissuePolicyService } from './modal-confirm-reissue-policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-reissue-policy',
    templateUrl: './modal-confirm-reissue-policy.component.html',
    styles: [],
})
export class ModalConfirmReissuePolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;
    @Output() actionTypeSelected: EventEmitter<SelectActionTypeData>;

    constructor(
        private _modalConfirmReissuePolicyService: ModalConfirmReissuePolicyService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
        this.actionTypeSelected = new EventEmitter<SelectActionTypeData>();
    }

    /**
     * Click event to reissue the policy to same client
     */
    onClickReissuePolicyToSameClient(): void {
        ModalPlugin.hide(this.modalId);
        this._loadingService.show();
        this._modalConfirmReissuePolicyService
            .rissuePolicy(this.contactId, this.policyId)
            .subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                this._router.navigate([
                    ROUTES_NAME.uploadPolicy(this.contactId, res.data),
                ]);
            });
    }

    /**
     * Click event to reissue policy to other client
     */
    onClickReissuePolicyToOtherClient(): void {
        ModalPlugin.hide(this.modalId);
        const data: SelectActionTypeData = {
            policyId: this.policyId,
            actionType: ACTION_TYPES.REISSUE_POLICY,
        };
        this.actionTypeSelected.emit(data);
    }
}
