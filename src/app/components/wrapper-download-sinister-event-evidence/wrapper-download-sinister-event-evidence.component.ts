import { Component, Input } from '@angular/core';

import { ModalDownloadFileData } from '@interfaces/modal-download-file-data.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-wrapper-download-sinister-event-evidence',
  templateUrl: './wrapper-download-sinister-event-evidence.component.html',
  styles: [
  ]
})
export class WrapperDownloadSinisterEventEvidenceComponent {
    @Input() fileUrl: string = '';
    modalIdDownloadFile: string = 'agt-download-sinister-event-evidence';
    modalDownloadFileData: ModalDownloadFileData = {
        title: 'Descargar Evidencia',
        question: '¿Deseas ver la evidencia del evento?',
        description: 'Apunta con la cámara de tu Smartphone al código inteligente y la evidencia será transferida automáticamente a tu dispositivo.',
        note: 'También puedes ver y guardar la evidencia de manera directa.',
        buttonLabel: 'Descargar Evidencia'
    }

    downloadSinisterEventEvidence(): void {
        ModalPlugin.show(this.modalIdDownloadFile);
    }
}
