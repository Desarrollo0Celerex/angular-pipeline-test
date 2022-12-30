import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ERROR_CODES } from '@constants/error-codes';
import { AnalizeInsuredsResponse } from '@interfaces/analize-insureds-response.interface';
import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { ListPolicyInsuredsService } from './list-policy-insureds.service';

@Component({
  selector: 'agt-list-policy-insureds',
  templateUrl: './list-policy-insureds.page.html',
  styles: [
  ],
  providers: [ListPolicyInsuredsService]
})
export class ListPolicyInsuredsPage implements OnInit {
    contactId: string = '';
    policyId: string = '';
    policyNumber: string = '1234567890';

    constructor(
        public model: ListPolicyInsuredsService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    analyzeInsureds(event: any): void {
        const insuredsFile: File = event.target.files[0];
        this._loadingService.show();
        this.model.analyzeInsureds(this.contactId, this.policyId, insuredsFile).subscribe((res: AnalizeInsuredsResponse) => {
            console.log('res: ',res);
            this.model.importInsureds(this.contactId, this.policyId, insuredsFile).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.importedInsureds();
            });
        },
        (error: any) => {
            switch (error.error.message) {
                case ERROR_CODES.invalidFields:
                    console.log('Ocurrieron los siguientes errores: ',error.error.data);
                    break;
            }
        });
    }

    exportInsureds(): void {
        this._loadingService.show();
        this.model.exportInsureds(this.contactId, this.policyId).then(() => {
            this._loadingService.hide();
        });
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

}
