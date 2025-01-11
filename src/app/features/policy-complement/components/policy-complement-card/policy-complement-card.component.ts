import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyComplement } from '@policy-complement/interfaces/policy-complement.interface';

@Component({
    selector: 'agt-policy-complement-card',
    templateUrl: './policy-complement-card.component.html',
    styles: [],
    standalone: false
})
export class PolicyComplementCardComponent {
    @Input() policyComplement: PolicyComplement | undefined = undefined;
    @Output() delete = new EventEmitter<string>();
    @Output() download = new EventEmitter<string>();

    deletePolicyComplement(policyComplementId: string): void {
        this.delete.emit(policyComplementId);
    }

    downloadPolicyComplement(fileUrl: string): void {
        this.download.emit(fileUrl);
    }
}
