import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';

import { ContainerWorkspacePoliciesIncompleteService } from './container-workspace-policies-incomplete.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-workspace-policies-incomplete',
    templateUrl: './container-workspace-policies-incomplete.component.html',
    styles: [],
    providers: [ContainerWorkspacePoliciesIncompleteService],
})
export class ContainerWorkspacePoliciesIncompleteComponent implements OnInit {
    modalIdConfirmDeletePolicy: string = 'agt-confirm-delete-policy';
    modalIdConfirmShowHistoryPolicy: string = 'agt-confirm-show-history-policy';
    modalIdShowPolicy: string = 'agt-show-policy';
    modalIdShowPolicyDetails: string = 'agt-show-policy-details-02';
    selectedContactId: string = '';
    selectedPolicyId: string = '';

    constructor(
        public model: ContainerWorkspacePoliciesIncompleteService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.model.loadWorkspaceIncompletePolicies();
    }

    goToListIncompletePolicies(): void {
        this._router.navigateByUrl(ROUTES_NAME.listIncompletePolicies);
    }

    /**
     * Event to complete the policy data
     * @param policyId The policy ID to complete
     */
    onCompletePolicy(data: ContactPolicyData): void {
        this._router.navigateByUrl(
            ROUTES_NAME.uploadPolicy(data.contactId, data.policyId)
        );
    }

    /**
     * Event to show modal to confirm delete the policy
     * @param policyId The policy ID to delete
     */
    onDeletePolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmDeletePolicy);
    }

    /**
     * Event to notify that the policy has been deleted
     * @param policyId The deleted policy ID
     */
    onPolicyDeleted(): void {
        this._reloadPage(ROUTES_NAME.dashboard);
        AlertHelper.policyDeleted();
    }

    /**
     * event to show the history policy
     * @param policyId The policy ID
     */
    onShowHistoryPolicy(data: ContactPolicyData): void {
        this.selectedPolicyId = data.policyId;
        this.selectedContactId = data.contactId;
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    onShowPolicy(data: string | ContactPolicyData): void {
        if (typeof data === 'string') {
            this.selectedPolicyId = data;
        } else {
            this.selectedContactId = data.contactId;
            this.selectedPolicyId = data.policyId;
        }
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    onShowPolicyDetails(data: ContactPolicyData): void {
        this.selectedPolicyId = data.policyId;
        this.selectedContactId = data.contactId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    private _reloadPage(pageUrl: string): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + pageUrl], {
            relativeTo: this._activatedRoute,
        });
    }
}
