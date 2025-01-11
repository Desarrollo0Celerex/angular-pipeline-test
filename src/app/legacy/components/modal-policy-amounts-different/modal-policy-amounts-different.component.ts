import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-modal-policy-amounts-different',
    templateUrl: './modal-policy-amounts-different.component.html',
    styles: [],
    standalone: false
})
export class ModalPolicyAmountsDifferentComponent {
    @Input() modalId: string = '';
}
