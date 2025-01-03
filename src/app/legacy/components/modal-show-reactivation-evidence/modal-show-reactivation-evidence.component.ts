import { Component, Input, OnInit } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-reactivation-evidence',
    templateUrl: './modal-show-reactivation-evidence.component.html',
    styles: [],
})
export class ModalShowReactivationEvidenceComponent {
    @Input() modalId: string = '';
    @Input() evidenceUrl: string = '';

    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
