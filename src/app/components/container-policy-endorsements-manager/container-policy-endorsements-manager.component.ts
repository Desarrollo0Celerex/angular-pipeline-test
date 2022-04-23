import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-endorsements-manager',
  templateUrl: './container-policy-endorsements-manager.component.html',
  styles: [
  ]
})
export class ContainerPolicyEndorsementsManagerComponent {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdShowPolicyFile: string = 'cpem-modal-show-policy-file';
    modalIdConfirmShowHistoryPolicy: string = 'cpem-confirm-show-history-policy';
    modalIdConfirmEndorsePolicy: string = 'cpem-modal-confirm-endorse-policy';

    constructor() { }

    showModalToShowPolicyFile(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    showModalToConfirmShowPolicyHistory(): void {
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    showModalToConfirmEndorsePolicy(): void {
        ModalPlugin.show(this.modalIdConfirmEndorsePolicy);
    }

}
