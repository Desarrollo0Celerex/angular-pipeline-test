import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { UpdatePolicyActionsModalComponent } from '../update-policy-actions-modal/update-policy-actions-modal.component';
import { Policy } from '@core/interfaces/policy.interface';

@Component({
    selector: 'agt-policy-cover-card',
    templateUrl: './policy-cover-card.component.html',
    styles: [],
})
export class PolicyCoverCardComponent {
    @Input() policy: Policy | undefined = undefined;
    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
    @ViewChild(UpdatePolicyActionsModalComponent)
    updatePolicyActionsModalComponent!: UpdatePolicyActionsModalComponent;

    showModalPolicyActions(): void {
        this.updatePolicyActionsModalComponent.init(this.policy);
    }
}
