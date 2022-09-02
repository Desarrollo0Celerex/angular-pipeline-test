import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { CONTENT_TYPES, SINISTER_STATUS, INSURANCE_TYPES } from '@constants/global';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { WrapperDownloadSinisterEvidenceComponent } from '@components/wrapper-download-sinister-evidence/wrapper-download-sinister-evidence.component';
import { WrapperUploadSinisterEvidenceComponent } from '@components/wrapper-upload-sinister-evidence/wrapper-upload-sinister-evidence.component';

import { ShowSinisterHistoryService } from './show-sinister-history.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-show-sinister-history',
  templateUrl: './show-sinister-history.page.html',
  styles: [
  ],
  providers: [ShowSinisterHistoryService]
})
export class ShowSinisterHistoryPage implements OnInit {
    @ViewChild('modalDownloadSinisterEvidence') modalDownloadSinisterEvidence!: WrapperDownloadSinisterEvidenceComponent;
    @ViewChild('modalUploadSinisterEvidence') modalUploadSinisterEvidence!: WrapperUploadSinisterEvidenceComponent;
    CONTENT_TYPES: any = CONTENT_TYPES;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    SINISTER_STATUS: any = SINISTER_STATUS;
    contactId: string = '';
    modalIdConfirmFinalizeSinister: string = 'agt-confirm-finalize-sinister';
    modalIdConfirmReactivateSinister: string = 'agt-confirm-reactivate-sinister';
    modalIdUpdateSinister: string = 'agt-update-sinister';
    modalIdUpdateSinisterCertificate: string = 'agt-update-sinister-certificate';
    modalIdUpdateSinisterDetails: string = 'agt-update-sinister-details';
    policyId: string = '';
    selectedSinisterEvidence: string = '';
    sinisterId: string = '';
    sinisterData: SinisterDataSend | null = null;

    constructor(
        public model: ShowSinisterHistoryService,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    get estimatedDays(): number {
        if(!!this.model.sinister) {
            const sinisterDate: any = moment(this.model.sinister.sinisterDate);
            const estimatedDate: any = moment(this.model.sinister.estimatedResolutionDate);
            return estimatedDate.diff(sinisterDate, 'days');
        }
        return 0;
    }

    get elapsedDays(): number {
        if(!!this.model.sinister) {
            const sinisterDate: any = moment(this.model.sinister.sinisterDate);
            const currentDate: any = moment();
            return currentDate.diff(sinisterDate, 'days');
        }
        return 0;
    }

    confirmReactivateSinister(): void {
        ModalPlugin.show(this.modalIdConfirmReactivateSinister);
    }

    confirmFinalizeSinister(): void {
        ModalPlugin.show(this.modalIdConfirmFinalizeSinister);
    }

    showModalToDownloadSinisterEvidence(): void {
        this.selectedSinisterEvidence = this.model.sinister!.evidenceUrl;
        this.modalDownloadSinisterEvidence.downloadSinisterEvidence();
    }

    showModalToUpdateCertificate(): void {
        ModalPlugin.show(this.modalIdUpdateSinisterCertificate);
    }

    showModalToUpdateSinister(): void {
        ModalPlugin.show(this.modalIdUpdateSinister);
    }

    showModalToUpdateSinisterDetails(): void {
        ModalPlugin.show(this.modalIdUpdateSinisterDetails);
    }

    showModalToUploadSinisterEvidence(): void {
        this.modalUploadSinisterEvidence.selectSinisterEvidence();
    }

    updateSinisterCertificate(policyInsuredId: string): void {
        this.model.sinister!.policyInsuredId = policyInsuredId;
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
        this.sinisterId = this._activatedRoute.snapshot.params.sinisterId;
        this.sinisterData = {
            contactId: this.contactId,
            policyId: this.policyId,
            sinisterId: this.sinisterId
        }
        this.model.loadSinister(this.sinisterData);
    }

}
