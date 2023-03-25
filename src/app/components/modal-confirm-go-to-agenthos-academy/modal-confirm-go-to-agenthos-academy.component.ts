import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-go-to-agenthos-academy',
  templateUrl: './modal-confirm-go-to-agenthos-academy.component.html',
  styles: [
  ]
})
export class ModalConfirmGoToAgenthosAcademyComponent {
    @Input() modalId: string = '';

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        window.open("http://hub.agenthos.com/novedades", "_blank");
    }
}
