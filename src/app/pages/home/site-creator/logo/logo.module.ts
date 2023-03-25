import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceMacbookProModule } from '@components/device-macbook-pro/device-macbook-pro.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateSiteModule } from '@components/modal-confirm-update-site/modal-confirm-update-site.module';
import { SiteService } from '@services/site.service';

import { LogoRoutingModule } from './logo-routing.module';
import { LogoPage } from './logo.page';


@NgModule({
  declarations: [
    LogoPage
  ],
  imports: [
    CommonModule,
    DeviceMacbookProModule,
    FormsModule,
    LoadingContentModule,
    LogoRoutingModule,
    ModalConfirmUpdateSiteModule,
    ReactiveFormsModule,
  ],
  providers: [
    SiteService
  ]
})
export class LogoModule { }
