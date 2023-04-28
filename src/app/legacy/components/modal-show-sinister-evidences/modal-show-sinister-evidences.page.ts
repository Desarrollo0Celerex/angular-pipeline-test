import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { WrapperDownloadSinisterEvidenceComponent } from '@components/wrapper-download-sinister-evidence/wrapper-download-sinister-evidence.component';

import { ModalShowSinisterEvidencesService } from './modal-show-sinister-evidences.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-sinister-evidences',
  templateUrl: './modal-show-sinister-evidences.page.html',
  styles: [
  ],
  providers: [ModalShowSinisterEvidencesService]
})
export class ModalShowSinisterEvidencesPage implements OnChanges {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    @ViewChild('modalDownloadSinisterEvidence') modalDownloadSinisterEvidence!: WrapperDownloadSinisterEvidenceComponent;
    modalIdToUploadSinisterEvidence: string = 'agt-upload-sinister-evidence';
    selectedSinisterEvidenceUrl: string = ''

    constructor(public model: ModalShowSinisterEvidencesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!this.sinisterData) {
            this.model.loadSinisterEvidences(this.sinisterData);
        }
    }

    showModalToDownloadSinisterEvidence(evidenceUrl: string): void {
        ModalPlugin.hide(this.modalId);
        setTimeout(() => {
            this.selectedSinisterEvidenceUrl = evidenceUrl;
            this.modalDownloadSinisterEvidence.downloadSinisterEvidence();
        }, 500)
    }

    showModalToUploadSinisterEvidence(): void {
        ModalPlugin.hide(this.modalId);
        setTimeout(() => {
            ModalPlugin.show(this.modalIdToUploadSinisterEvidence);
        }, 500)
    }

}
