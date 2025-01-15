import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AnalizeInsuredsResponse } from '@interfaces/analize-insureds-response.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-policy-insureds',
    templateUrl: './modal-confirm-policy-insureds.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmPolicyInsuredsComponent {
    @Input() modalId: string = '';
    @Input() data: AnalizeInsuredsResponse | null = null;
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.confirmedAction.emit();
    }

}
