import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES, FORMAT_TYPES } from '@constants/global';
import { LoadingService } from '@core/services/loading/loading.service';

import { ListPolicyInsuredsService } from './list-policy-insureds.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-list-policy-insureds',
    templateUrl: './list-policy-insureds.page.html',
    styles: [],
    providers: [ListPolicyInsuredsService],
})
export class ListPolicyInsuredsPage implements OnInit, OnDestroy {
    CONTENT_TYPES: any = CONTENT_TYPES;
    contactId: string = '';
    policyId: string = '';
    modalIdSelectPolicyInsuredUploadType: string =
        'agt-select-policy-insured-upload-type';
    modalIdSelectReportFormat: string = 'agt-select-report-format';
    modalIdShowPolicyInsuredActions: string = 'agt-show-policy-insured-actions';
    private _subParams: any;

    constructor(
        public model: ListPolicyInsuredsService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if (!!this._subParams) this._subParams.unsubscribe();
    }

    showModalToSelectPolicyInsuredUploadType(): void {
        ModalPlugin.show(this.modalIdSelectPolicyInsuredUploadType);
    }

    showModalToSelectReportFormatType(): void {
        ModalPlugin.show(this.modalIdSelectReportFormat);
    }

    showModalToShowPolicyInsuredActions(): void {
        ModalPlugin.show(this.modalIdShowPolicyInsuredActions);
    }

    downloadPolicyInsuredsReport(formatType: number): void {
        this._loadingService.show();
        this.model
            .downloadReportFlotilla(this.contactId, this.policyId, formatType)
            .then(() => {
                this._loadingService.hide();
            });
    }

    private _catchParams(): void {
        // Static params
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;

        // Dynamic params
        this._subParams = this._activatedRoute.queryParams.subscribe(
            (params: Params) => {
                const action: string =
                    typeof params.action !== 'undefined' ? params.action : '';
                if (action !== '') {
                    switch (action) {
                        case 'DOWNLOAD_EDITABLE_REPORT':
                            this.downloadPolicyInsuredsReport(
                                FORMAT_TYPES.XLSX
                            );
                            break;
                    }
                }
            }
        );
    }
}
