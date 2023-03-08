import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateSiteModule } from '@components/modal-confirm-update-site/modal-confirm-update-site.module';
import { SiteService } from '@services/site.service';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityPage } from './identity.page';


@NgModule({
  declarations: [
    IdentityPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentityRoutingModule,
    LoadingContentModule,
    ModalConfirmUpdateSiteModule,
    ReactiveFormsModule
  ],
  providers: [
    SiteService
  ]
})
export class IdentityModule { }
