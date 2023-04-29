import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { WorkspaceUserService } from '@core/services/workspace-user/workspace-user.service';

import { ModalUpgradeLicenseComponent } from './modal-upgrade-license.component';

@NgModule({
    declarations: [ModalUpgradeLicenseComponent],
    imports: [CommonModule],
    exports: [ModalUpgradeLicenseComponent],
    providers: [WorkspaceService, WorkspaceUserService],
})
export class ModalUpgradeLicenseModule {}
