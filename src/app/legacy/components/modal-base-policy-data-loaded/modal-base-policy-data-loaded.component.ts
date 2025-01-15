import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-modal-base-policy-data-loaded',
    templateUrl: './modal-base-policy-data-loaded.component.html',
    styles: [],
    standalone: false
})
export class ModalBasePolicyDataLoadedComponent {
    @Input() modalId: string = '';
}
