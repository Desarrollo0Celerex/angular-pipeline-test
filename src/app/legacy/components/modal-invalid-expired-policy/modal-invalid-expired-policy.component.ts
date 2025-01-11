import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-modal-invalid-expired-policy',
    templateUrl: './modal-invalid-expired-policy.component.html',
    styles: [],
    standalone: false
})
export class ModalInvalidExpiredPolicyComponent {
    @Input() modalId: string = '';
}
