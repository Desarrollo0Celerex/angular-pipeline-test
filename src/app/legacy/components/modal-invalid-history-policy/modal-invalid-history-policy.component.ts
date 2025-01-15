import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-modal-invalid-history-policy',
    templateUrl: './modal-invalid-history-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalInvalidHistoryPolicyComponent {
    @Input() modalId: string = '';
}
