import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceUserService } from '@services/workspace-user.service';

import { ModalUpgradeLicenseToProComponent } from './modal-upgrade-license-to-pro.component';

@NgModule({
  declarations: [
    ModalUpgradeLicenseToProComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalUpgradeLicenseToProComponent
  ],
  providers: [
    WorkspaceService,
    WorkspaceUserService
  ]
})
export class ModalUpgradeLicenseToProModule { }
