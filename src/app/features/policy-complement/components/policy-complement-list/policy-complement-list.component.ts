import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyComplement } from '@policy-complement/interfaces/policy-complement.interface';

@Component({
    selector: 'agt-policy-complement-list',
    templateUrl: './policy-complement-list.component.html',
    styles: [],
    standalone: false
})
export class PolicyComplementListComponent {
    @Input() policyComplements: PolicyComplement[] = [];
    @Output() deletePolicyComplement = new EventEmitter<string>();
    @Output() downloadPolicyComplement = new EventEmitter<string>();

    requestDeletePolicyComplement(policyComplementId: string): void {
        this.deletePolicyComplement.emit(policyComplementId);
    }

    requestDownloadPolicyComplement(fileUrl: string): void {
        this.downloadPolicyComplement.emit(fileUrl);
    }
}
