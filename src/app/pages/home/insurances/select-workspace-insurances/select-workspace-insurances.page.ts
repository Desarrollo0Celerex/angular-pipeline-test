import { Component, OnInit } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { SelectWorkspaceInsurancesService } from './select-workspace-insurances.service';

@Component({
  selector: 'agt-select-workspace-insurances',
  templateUrl: './select-workspace-insurances.page.html',
  styles: [
  ],
  providers: [SelectWorkspaceInsurancesService]
})
export class SelectWorkspaceInsurancesPage implements OnInit {

    constructor(
        public model: SelectWorkspaceInsurancesService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit(): void {
        this._loadWorkspaceLicenseId();
    }

    addWorkspaceInsurance(insuranceId: number): void {
        this._loadingService.show();
        this.model.addWorkspaceInsurance(insuranceId).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.workspaceInsuranceAdded();
        });
    }

    removeWorkspaceInsurance(insuranceId: number): void {
        this._loadingService.show();
        this.model.removeWorkspaceInsurance(insuranceId).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.workspaceInsuranceRemoved();
        });
    }

    showAlertUpgradeLicense(): void {
        AlertHelper.upgradeLicense();
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
