import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceMacbookProModule } from '@components/device-macbook-pro/device-macbook-pro.module';
import { ImageAgenthosCertificateModule } from '@components/image-agenthos-certificate/image-agenthos-certificate.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateSiteModule } from '@components/modal-confirm-update-site/modal-confirm-update-site.module';
import { ModalUpgradeLicenseModule } from '@components/modal-upgrade-license/modal-upgrade-license.module';
import { SiteService } from '@services/site.service';
import { WorkspaceService } from '@services/workspace.service';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityPage } from './identity.page';


@NgModule({
  declarations: [
    IdentityPage
  ],
  imports: [
    CommonModule,
    DeviceMacbookProModule,
    FormsModule,
    IdentityRoutingModule,
    ImageAgenthosCertificateModule,
    LoadingContentModule,
    ModalConfirmUpdateSiteModule,
    ModalUpgradeLicenseModule,
    ReactiveFormsModule
  ],
  providers: [
    SiteService,
    WorkspaceService
  ]
})
export class IdentityModule { }
