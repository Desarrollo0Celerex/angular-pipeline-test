import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyDetailsData } from '@interfaces/policy-details-data.interface';
import { LoadingService } from '@services/loading.service';

import { CreatePolicyService } from './create-policy.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-create-policy',
  templateUrl: './create-policy.page.html',
  styles: [
  ]
})
export class CreatePolicyPage implements OnInit {
    actionType: number = ACTION_TYPES.CREATE_POLICY;
    contactId: string = '';
    cardContactMessage: string = 'Selecciona el tipo de seguro para cargar la póliza de';
    modalIdGetPolicyDetails: string = 'agt-modal-get-policy-details';
    selectedInsuranceId: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _createPolicyService: CreatePolicyService,
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
    onPolicydetailsSelected(data: PolicyDetailsData): void {
        this._createPolicy(data.insuranceTypeId);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

    /**
     * Create a policy
     * @param insuranceTypeId The insurance type ID
     */
    private _createPolicy(insuranceTypeId: number): void {
        this._loadingService.show();
        this._createPolicyService.createPolicy(this.contactId, this.selectedInsuranceId, insuranceTypeId).subscribe( (res: HttpResponse) => {
            this._loadingService.hide();
            const policyId: string = res.data;
            this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(this.contactId, policyId));
        })
    }
}
