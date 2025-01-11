import { Component, Input, ViewChild } from '@angular/core';
import { PolicyComplementModalComponent } from '@policy-complement/components/policy-complement-modal/policy-complement-modal.component';

@Component({
    selector: 'agt-policy-complements',
    templateUrl: './policy-complements.component.html',
    styles: [],
    standalone: false
})
export class PolicyComplementsComponent {
    @Input() contactId = '';
    @Input() policyId = '';
    @ViewChild(PolicyComplementModalComponent)
    policyComplementModalComponent!: PolicyComplementModalComponent;

    showModalPolicyComplements(): void {
        this.policyComplementModalComponent.show();
    }
}
