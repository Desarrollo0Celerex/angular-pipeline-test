import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardLicenseInsuranceModule } from '@components/card-license-insurance/card-license-insurance.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmAddWorkspaceInsuranceModule } from '@components/modal-confirm-add-workspace-insurance/modal-confirm-add-workspace-insurance.module';
import { ModalConfirmRemoveWorkspaceInsuranceModule } from '@components/modal-confirm-remove-workspace-insurance/modal-confirm-remove-workspace-insurance.module';
import { ModalConfirmUpgradeLicenseModule } from '@components/modal-confirm-upgrade-license/modal-confirm-upgrade-license.module';
import { ModalUpgradeLicenseModule } from '@components/modal-upgrade-license/modal-upgrade-license.module';
import { InsuranceService } from '@services/insurance.service';
import { LicenseService } from '@services/license.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceInsuranceService } from '@services/workspace-insurance.service';

import { SelectWorkspaceInsurancesRoutingModule } from './select-workspace-insurances-routing.module';
import { SelectWorkspaceInsurancesPage } from './select-workspace-insurances.page';

@NgModule({
  declarations: [
    SelectWorkspaceInsurancesPage
  ],
  imports: [
    CardLicenseInsuranceModule,
    CommonModule,
    LoadingContentModule,
    ModalConfirmAddWorkspaceInsuranceModule,
    ModalConfirmRemoveWorkspaceInsuranceModule,
    ModalConfirmUpgradeLicenseModule,
    ModalUpgradeLicenseModule,
    SelectWorkspaceInsurancesRoutingModule
  ],
  providers: [
    InsuranceService,
    LicenseService,
    WorkspaceService,
    WorkspaceInsuranceService
  ]
})
export class SelectWorkspaceInsurancesModule { }
