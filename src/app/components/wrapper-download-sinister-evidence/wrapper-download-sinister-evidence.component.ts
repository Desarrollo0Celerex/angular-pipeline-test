import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ModalDownloadFileData } from '@interfaces/modal-download-file-data.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-wrapper-download-sinister-evidence',
  templateUrl: './wrapper-download-sinister-evidence.component.html',
  styles: [
  ]
})
export class WrapperDownloadSinisterEvidenceComponent implements OnChanges {
    @Input() fileUrl: string = '';
    modalIdDownloadFile: string = 'agt-download-sinister-evidence';
    modalDownloadFileData: ModalDownloadFileData = {
        title: 'Descargar Evidencia',
        question: '¿Deseas ver la evidencia del siniestro?',
        description: 'Apunta con la cámara de tu Smartphone al código inteligente y la evidencia será transferida automáticamente a tu dispositivo.',
        note: 'También puedes ver y guardar la evidencia de manera directa.',
        buttonLabel: 'Descargar Evidencia'
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes: ',changes);
        
    }

    downloadSinisterEvidence(): void {
        ModalPlugin.show(this.modalIdDownloadFile);
    }
}
