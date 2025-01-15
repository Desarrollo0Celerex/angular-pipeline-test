import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-modal-notify-endorsement-cannot-be-applied',
    templateUrl: './modal-notify-endorsement-cannot-be-applied.component.html',
    styles: [],
    standalone: false
})
export class ModalNotifyEndorsementCannotBeAppliedComponent {
    @Input() modalId: string = '';
}
