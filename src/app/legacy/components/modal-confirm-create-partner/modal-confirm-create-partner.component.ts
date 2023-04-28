import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalConfirmCreatePartnerService } from './modal-confirm-create-partner.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-partner',
    templateUrl: './modal-confirm-create-partner.component.html',
    styles: [],
    providers: [ModalConfirmCreatePartnerService],
})
export class ModalConfirmCreatePartnerComponent {
    @Input() modalId: string = '';
    @Input() partnerName: string = '';
    @Input() ignoreMatches: boolean = false;
    @Output() partnerCreated: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmCreatePartnerService: ModalConfirmCreatePartnerService
    ) {}

    get model(): ModalConfirmCreatePartnerService {
        return this._modalConfirmCreatePartnerService;
    }

    createPartner(): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        this.model
            .createPartner(this.partnerName, this.ignoreMatches)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.partnerCreated();
                this.partnerCreated.emit();
            });
    }
}
