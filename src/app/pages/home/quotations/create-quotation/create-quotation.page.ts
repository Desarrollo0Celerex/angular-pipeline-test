import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';
import { LoadingService } from '@services/loading.service';

import { CreateQuotationService } from './create-quotation.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-create-quotation',
  templateUrl: './create-quotation.page.html',
  styles: [
  ]
})
export class CreateQuotationPage implements OnInit {
    actionType: number = ACTION_TYPES.CREATE_QUOTATION;
    contactId: string = '';
    cardContactMessage: string = 'Selecciona el tipo de seguro que deseas cotizar para';
    modalIdGetPolicyDetails: string = 'agt-modal-get-policy-details';
    selectedInsuranceId: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _createQuotationService: CreateQuotationService,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    /**
     * Event to catch the selected insurance ID
     * And show modal to get the policy details
     * @param insuranceId The selected insurance ID
     */
    onInsuranceSelected(insuranceId: number): void {
        this.selectedInsuranceId = insuranceId;
        ModalPlugin.show(this.modalIdGetPolicyDetails);
    }

    /**
     * Event to catch the selected policy details
     * @param data The policy details data
     */
    onPolicydetailsSelected(quotationData: PolicyDetailsData): void {
        this._createQuotation(quotationData);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

    /**
     * Create a quotation
     * @param insuranceTypeId The insurance type ID
     */
    private _createQuotation(quotationData: PolicyDetailsData): void {
        this._loadingService.show();
        this._createQuotationService.createQuotation(this.contactId, this.selectedInsuranceId, quotationData).subscribe( () => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.listContactQuotations(this.contactId));
        })
    }
}
