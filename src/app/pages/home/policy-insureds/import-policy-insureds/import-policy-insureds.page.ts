import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ERROR_CODES } from '@constants/error-codes';
import { FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { AnalizeInsuredsResponse } from '@interfaces/analize-insureds-response.interface';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';
import { LoadingService } from '@services/loading.service';

import { ImportPolicyInsuredsService } from './import-policy-insureds.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-import-policy-insureds',
  templateUrl: './import-policy-insureds.page.html',
  styles: [
  ],
  providers: [ImportPolicyInsuredsService]
})
export class ImportPolicyInsuredsPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    analizeInsuredResponse: AnalizeInsuredsResponse | null = null;
    modalIdConfirmPolicyInsureds: string = 'agt-confirm-policy-insureds';
    modalIdSelectFile: string = 'agt-select-file';
    modalSelectFileData: ModalSelectFileData = {
      title: 'Cargar Formato',
      description: 'Selecciona el formato con los certificados actualizados.',
      buttonLabel: 'Cargar formato',
      formats: ['xls', 'xlsx'],
      fileType: FILE_TYPES.DOCUMENT
    }
    private _selectedFile: File | null = null;
    
    constructor(
        public model: ImportPolicyInsuredsService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    analyzePolicyInsureds(file: File): void {
        this._loadingService.show();
        this.model.analyzeInsureds(this.contactId, this.policyId, file).subscribe((res: AnalizeInsuredsResponse) => {
            this._loadingService.hide();
            this.analizeInsuredResponse = res;
            this._selectedFile = file;
            ModalPlugin.show(this.modalIdConfirmPolicyInsureds);
        },
        (error: any) => {
            switch (error.error.message) {
                case ERROR_CODES.invalidFields:
                    //error.error.data
                    AlertHelper.importInsuredsFailed();
                    break;
            }
        });
    }

    exportPolicyInsureds(): void {
        this._loadingService.show();
        this.model.exportInsureds(this.contactId, this.policyId).then(() => {
            this._loadingService.hide();
        });
    }

    importPolicyInsureds(): void {
        if(this._selectedFile !== null) {
            this._loadingService.show();
            this.model.importInsureds(this.contactId, this.policyId, this._selectedFile).subscribe(() => {
                this._loadingService.hide();
                this._goToListPolicyInsureds();
                AlertHelper.importedInsureds();
            });
        }
    }

    showModalToSelectFile(): void {
        ModalPlugin.show(this.modalIdSelectFile);
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    private _goToListPolicyInsureds(): void {
        this._router.navigateByUrl(ROUTES_NAME.listPolicyInsureds(this.contactId, this.policyId));
    }

}
