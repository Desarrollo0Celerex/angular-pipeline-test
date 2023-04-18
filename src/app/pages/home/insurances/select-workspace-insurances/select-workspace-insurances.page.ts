import { Component, OnInit } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { SelectWorkspaceInsurancesService } from './select-workspace-insurances.service';
import { ActionWorkspaceInsuranceData } from '@interfaces/action-workspace-insurance-data.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-select-workspace-insurances',
  templateUrl: './select-workspace-insurances.page.html',
  styles: [
  ],
  providers: [SelectWorkspaceInsurancesService]
})
export class SelectWorkspaceInsurancesPage implements OnInit {
    modalIdConfirmAddWorkspaceInsurance: string = 'agt-confirm-add-workspace-insurace';
    modalIdConfirmRemoveWorkspaceInsurance: string = 'agt-confirm-remove-workspace-insurace';
    modalIdConfirmUpgradeLicense: string = 'agt-confirm-upgrade-license';
    modalIdUpgradeLicense: string = 'agt-upgrade-license';
    selectedInsuranceId: number = 0;
    selectedLicenseName: string = '';
    selectedInsuranceIndex: number | null = null;
    selectedLicenseIndex: number | null = null;

    constructor(
        public model: SelectWorkspaceInsurancesService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._loadWorkspaceLicenseId();
    }

    addWorkspaceInsurance(): void {
        this._loadingService.show();
        this.model.addWorkspaceInsurance(this.selectedInsuranceId).subscribe(() => {
            this.model.licenseInsurances[this.selectedLicenseIndex!].insurances[this.selectedInsuranceIndex!].hasActiveLeadGenerator = true;
            this._loadingService.hide();
            AlertHelper.workspaceInsuranceAdded();
        });
    }

    removeWorkspaceInsurance(): void {
        this._loadingService.show();
        this.model.removeWorkspaceInsurance(this.selectedInsuranceId).subscribe(() => {
            this.model.licenseInsurances[this.selectedLicenseIndex!].insurances[this.selectedInsuranceIndex!].hasActiveLeadGenerator = false;
            this._loadingService.hide();
            AlertHelper.workspaceInsuranceRemoved();
        });
    }

    showModalToConfirmUpgradeLicense(licenseName: string): void {
        this.selectedLicenseName = licenseName;
        ModalPlugin.show(this.modalIdConfirmUpgradeLicense);
    }

    showModalToConfirmAddWorkspaceInsurance(data: ActionWorkspaceInsuranceData): void {
        this.selectedInsuranceId = data.insuranceId;
        this.selectedLicenseIndex = data.licenseIndex;
        this.selectedInsuranceIndex = data.insuranceIndex;
        ModalPlugin.show(this.modalIdConfirmAddWorkspaceInsurance);
    }

    showModalToConfirmRemoveWorkspaceInsurance(data: ActionWorkspaceInsuranceData): void {
        this.selectedInsuranceId = data.insuranceId;
        this.selectedLicenseIndex = data.licenseIndex;
        this.selectedInsuranceIndex = data.insuranceIndex;
        ModalPlugin.show(this.modalIdConfirmRemoveWorkspaceInsurance);
    }

    showModalToUpgradeLicense(): void {
        ModalPlugin.show(this.modalIdUpgradeLicense);
    }

    private _loadWorkspaceLicenseId(): void {
        this.model.loadWorkspaceLicenseId().subscribe(() => {
            this.model.loadWorkspaceInsurances().subscribe(() => {
                this.model.loadLicenses().subscribe(() => {
                    this.model.loadLicenseInsurances();
                });
            });
        });
    }

}
