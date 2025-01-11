import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-go-to-agenthos-hub',
    templateUrl: './modal-confirm-go-to-agenthos-hub.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmGoToAgenthosHubComponent {
    @Input() modalId: string = '';

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        window.open("http://hub.agenthos.com", "_blank");
    }
}
