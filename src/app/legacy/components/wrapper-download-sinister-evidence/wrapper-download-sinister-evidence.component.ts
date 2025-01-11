import { Component, Input } from '@angular/core';

import { ModalDownloadFileData } from '@interfaces/modal-download-file-data.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-wrapper-download-sinister-evidence',
    templateUrl: './wrapper-download-sinister-evidence.component.html',
    styles: [],
    standalone: false
})
export class WrapperDownloadSinisterEvidenceComponent {
    @Input() fileUrl: string = '';
    modalIdDownloadFile: string = 'agt-download-sinister-evidence';
    modalDownloadFileData: ModalDownloadFileData = {
        title: 'Descargar Evidencia',
        question: '¿Deseas ver la evidencia del siniestro?',
        description: 'Apunta con la cámara de tu Smartphone al código inteligente y la evidencia será transferida automáticamente a tu dispositivo.',
        note: 'También puedes ver y guardar la evidencia de manera directa.',
        buttonLabel: 'Descargar Evidencia'
    }

    downloadSinisterEvidence(): void {
        ModalPlugin.show(this.modalIdDownloadFile);
    }
}
