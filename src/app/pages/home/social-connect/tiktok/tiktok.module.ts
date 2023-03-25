import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateTwitterAccountModule } from '@components/modal-confirm-create-twitter-account/modal-confirm-create-twitter-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@services/workspace.service';

import { TiktokRoutingModule } from './tiktok-routing.module';
import { TiktokPage } from './tiktok.page';


@NgModule({
  declarations: [
    TiktokPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmCreateTwitterAccountModule,
    ModalConfirmUpdateSocialConnectModule,
    ReactiveFormsModule,
    TiktokRoutingModule
  ],
  providers: [
    WorkspaceService
  ]
})
export class TiktokModule { }
