import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalShowEndorsementService } from './modal-show-endorsement.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-endorsement',
    templateUrl: './modal-show-endorsement.component.html',
    styles: [],
    standalone: false
})
export class ModalShowEndorsementComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() endorsementId: string = '';
    @Input() modalId: string = '';
    @Input() policyId: string = '';

    constructor(
        public modalShowEndorsementService: ModalShowEndorsementService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.endorsementId && !!changes.endorsementId.currentValue) {
            this.modalShowEndorsementService.resetEndorsementUrl();
            this.modalShowEndorsementService.loadEndorsementUrl(
                this.contactId,
                this.policyId,
                this.endorsementId
            );
        }
    }

    /**
     * Click event to close modal
     */
    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
