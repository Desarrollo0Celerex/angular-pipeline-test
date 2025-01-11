import { Component, Input, ViewChild } from '@angular/core';
import { DownloadContentComponent } from '@shared/components/download-content/download-content.component';

@Component({
    selector: 'agt-download-policy-complement-modal',
    templateUrl: './download-policy-complement-modal.component.html',
    styles: [],
    standalone: false
})
export class DownloadPolicyComplementModalComponent {
    @ViewChild(DownloadContentComponent)
    downloadContentComponent!: DownloadContentComponent;

    show(contentUrl: string): void {
        this.downloadContentComponent.init({
            title: 'Descargar Complemento',
            message: 'Escanea el código inteligente para ver el complemento.',
            description:
                'Apunta con la cámara de tu Smartphone al código inteligente y el complemento será transferido de manera automática a tu dispositivo.',
            details:
                'Si lo deseas, puedes descargar el complemento para almacenarlo en tu dispositivo de manera permanante.',
            buttonLabel: '📄 DESCARGAR COMPLEMENTO',
            cancelRoute: [],
            contentUrl,
        });
    }
}
