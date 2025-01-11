import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Policy } from '@core/interfaces/policy.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-policy',
    templateUrl: './modal-select-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectPolicyComponent {
    @Input() modalId: string = '';
    @Input() policies: Policy[] = [];
    @Output() policySelected: EventEmitter<Policy> = new EventEmitter<Policy>();

    /**
     * Click event to select the policy
     * @param policy The selected policy
     */
    onClickSelectPolicy(policy: Policy): void {
        ModalPlugin.hide(this.modalId);
        this.policySelected.emit(policy);
    }
}
