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
            this.model.loadSinister(this.sinisterData);
        }
    }

    get fileExtension(): string {
        if(!!this.model.sinister && !!this.model.sinister.evidenceUrl) {
            const fileExtension: string = this.model.sinister.evidenceUrl.split(/[#?]/)[0].split('.').pop()!.trim();
            return fileExtension;
        }
        return 'empty';
    }

    showModalToDownloadSinisterEvidence(): void {
        ModalPlugin.hide(this.modalId);
        setTimeout(() => {
            this.selectedSinisterEvidenceUrl = this.model.sinister!.evidenceUrl;
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
