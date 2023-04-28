import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

import { ModalUpgradeLicenseComponent } from './modal-upgrade-license.component';

@NgModule({
  declarations: [
    ModalUpgradeLicenseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalUpgradeLicenseComponent
  ],
  providers: [
    WorkspaceService,
    WorkspaceUserService
  ]
})
export class ModalUpgradeLicenseModule { }
