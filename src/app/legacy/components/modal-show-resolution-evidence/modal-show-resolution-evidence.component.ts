import { Component, Input, OnInit } from '@angular/core';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-resolution-evidence',
    templateUrl: './modal-show-resolution-evidence.component.html',
    styles: [],
})
export class ModalShowResolutionEvidenceComponent {
    @Input() modalId: string = '';
    @Input() evidenceUrl: string = '';

    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
