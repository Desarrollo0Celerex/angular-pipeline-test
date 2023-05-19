import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ModalShowExternalPolicyDetailsService } from './modal-show-external-policy-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-external-policy-details',
  templateUrl: './modal-show-external-policy-details.component.html',
  styles: [
  ],
  providers: [ModalShowExternalPolicyDetailsService]
})
export class ModalShowExternalPolicyDetailsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() modalId: string = '';
    @Input() externalPolicyId: string = '';
    @Output() showExternalPolicy: EventEmitter<string> = new EventEmitter<string>();

    constructor(public model: ModalShowExternalPolicyDetailsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(((!!changes.contactId && changes.contactId.currentValue) && (!!changes.externalPolicyId && !!changes.externalPolicyId.currentValue) ) || (!!this.contactId && (!!changes.externalPolicyId && !!changes.externalPolicyId.currentValue) )) {
            this.model.loadPolicyDetails(this.contactId, this.externalPolicyId);
        }
    }

    onClickShowExternalPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this.showExternalPolicy.emit(this.model.externalPolicy!.policyUrl);
    }
}
