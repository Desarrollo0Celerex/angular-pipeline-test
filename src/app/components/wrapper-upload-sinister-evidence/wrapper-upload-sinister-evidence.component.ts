import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FILE_ALL_FORMATS, FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { WrapperUploadSinisterEvidenceService } from './wrapper-upload-sinister-evidence.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-wrapper-upload-sinister-evidence',
  templateUrl: './wrapper-upload-sinister-evidence.component.html',
  styles: [
  ],
  providers: [WrapperUploadSinisterEvidenceService]
})
export class WrapperUploadSinisterEvidenceComponent {
    @Input() sinisterData: SinisterDataSend | null = null;
    modalIdSelectSinisterEvidence: string = 'agt-select-sinister-evidence';
    modalSelectFileData: ModalSelectFileData = {
        title: 'Cargar Evidencia',
        description: 'Selecciona el formato digital de la evidencia del siniestro.',
        buttonLabel: 'Cargar evidencia',
        formats: FILE_ALL_FORMATS,
        fileType: FILE_TYPES.MIXED
    };

    constructor(
        public model: WrapperUploadSinisterEvidenceService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    selectSinisterEvidence(): void {
        ModalPlugin.show(this.modalIdSelectSinisterEvidence);
    }

    updateSinisterEvidence(evidenceFile: File): void {
        this.model.form.patchValue({evidenceFile});
        if(!!this.sinisterData) {
            this._loadingService.show();
            this.model.updateSinisterEvidence(this.sinisterData).subscribe((sinisterEvidenceUrl: string) => {
                this._loadingService.hide();
                AlertHelper.sinisterEvidenceUpdated(this._reloadPage, this);
            });
        }
    }

    private _reloadPage(context: WrapperUploadSinisterEvidenceComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterData.contactId, context.sinisterData.policyId, context.sinisterData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }

}
