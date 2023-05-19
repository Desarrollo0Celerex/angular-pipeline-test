import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    CONTENT_TYPES,
    INSURANCE_LIST_TYPES,
    ACTION_TYPES,
} from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ContainerInsurancesService } from './container-insurances.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-insurances',
    templateUrl: './container-insurances.component.html',
    styles: [],
    providers: [ContainerInsurancesService],
})
export class ContainerInsurancesComponent implements OnInit {
    @Input() actionType: number = 0;
    @Input() contactDetailsMessage: string = '';
    @Input() contactId: string = '';
    CONTENT_TYPES: any = CONTENT_TYPES;
    INSURANCE_LIST_TYPES: any = INSURANCE_LIST_TYPES;
    modalIdGetPolicyDetails: string = 'agt-modal-get-policy-details';
    selectedListType: number = INSURANCE_LIST_TYPES.BY_CATEGORY;
    selectedInsuranceId: number = 0;
    query: string = '';

    constructor(
        public model: ContainerInsurancesService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    doAction(data: PolicyDetailsData) {
        switch (this.actionType) {
            case ACTION_TYPES.CREATE_QUOTATION:
                this._createQuotation(data);
                break;

            case ACTION_TYPES.CREATE_POLICY:
                this._createPolicy(data.insuranceTypeId);
                break;
        }
    }

    searchInsurance(query: string): void {
        this.selectedListType = INSURANCE_LIST_TYPES.BY_SEARCH;
        this.query = query;
    }

    showModalToSelectInsuranceType(insuranceId: number): void {
        this.selectedInsuranceId = insuranceId;
        ModalPlugin.show(this.modalIdGetPolicyDetails);
    }

    updateInsuranceList(listType: number): void {
        this.query = '';
        this.selectedListType = listType;
    }

    private _createPolicy(insuranceTypeId: number): void {
        this._loadingService.show();
        this.model
            .createPolicy(
                this.contactId,
                this.selectedInsuranceId,
                insuranceTypeId
            )
            .subscribe((policyId: string) => {
                this._loadingService.hide();
                this._router.navigateByUrl(
                    ROUTES_NAME.uploadPolicy(this.contactId, policyId)
                );
            });
    }

    private _createQuotation(quotationData: PolicyDetailsData): void {
        this._loadingService.show();
        this.model
            .createQuotation(
                this.contactId,
                this.selectedInsuranceId,
                quotationData
            )
            .subscribe(() => {
                this._loadingService.hide();
                this._router.navigateByUrl(
                    ROUTES_NAME.listContactQuotations(this.contactId)
                );
            });
    }
}
