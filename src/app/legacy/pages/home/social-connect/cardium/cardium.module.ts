import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateCardiumAccountModule } from '@components/modal-confirm-create-cardium-account/modal-confirm-create-cardium-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@services/workspace.service';

import { CardiumRoutingModule } from './cardium-routing.module';
import { CardiumPage } from './cardium.page';

@NgModule({
  declarations: [
    CardiumPage
  ],
  imports: [
    CommonModule,
    CardiumRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmCreateCardiumAccountModule,
    ModalConfirmUpdateSocialConnectModule,
    ReactiveFormsModule
  ],
  providers: [
    WorkspaceService
  ]
})
export class CardiumModule { }
