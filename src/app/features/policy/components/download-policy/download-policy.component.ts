import { Component, ViewChild } from '@angular/core';
import { DownloadPolicy } from '@features/policy/interfaces/download-policy.interface';
import { PolicyService } from '@features/policy/services/policy.service';
import { DownloadContentComponent } from '@shared/components/download-content/download-content.component';

@Component({
    selector: 'agt-download-policy',
    templateUrl: './download-policy.component.html',
    styles: [],
})
export class DownloadPolicyComponent {
    @ViewChild(DownloadContentComponent)
    downloadContentComponent!: DownloadContentComponent;

    constructor(private _policyService: PolicyService) {}

    init(data: DownloadPolicy): void {
        this.downloadContentComponent.init({
            title: 'Descargar Póliza',
            message: 'Escanea el código inteligente para ver la póliza.',
            description:
                'Apunta con la cámara de tu Smartphone al código inteligente y la póliza será transferida de manera automática a tu dispositivo.',
            details:
                'Si lo deseas, puedes descargar la póliza para almacenarla en tu dispositivo de manera permanante',
            cancelRoute: data.cancelRoute,
        });
        this._loadPolicyUrl(data.contactId, data.policyId);
    }

    private _loadPolicyUrl(contactId: string, policyId: string): void {
        const fields = 'policyUrl';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((policy) => {
                this.downloadContentComponent.contentUrl = policy.policyUrl;
            });
    }
}
