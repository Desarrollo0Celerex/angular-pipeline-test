import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-policy-insured-file',
    templateUrl: './modal-show-policy-insured-file.component.html',
    styles: [],
})
export class ModalShowPolicyInsuredFileComponent {
    @Input() modalId: string = '';
    @Input() policyInsuredUrl: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
