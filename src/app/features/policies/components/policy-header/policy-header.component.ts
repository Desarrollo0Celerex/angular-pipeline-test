import { Component, Input, ViewChild } from '@angular/core';
import { DownloadPolicyComponent } from '../download-policy/download-policy.component';
import { Policy } from '@policies/interfaces/policy.interface';

@Component({
    selector: 'agt-policy-header',
    templateUrl: './policy-header.component.html',
    styles: [],
})
export class PolicyHeaderComponent {
    @Input() policy: Policy | undefined = undefined;
    @ViewChild(DownloadPolicyComponent)
    downloadPolicyComponent!: DownloadPolicyComponent;

    showModalDownloadPolicy(): void {
        // TODO: Crear pipes para poner el background de los seguros y tipos de seguro
        this.downloadPolicyComponent.init({
            contactId: this.policy!.contactId,
            policyId: this.policy!.policyId,
            cancelRoute: [],
        });
    }
}
