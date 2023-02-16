import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { WalletService } from '@services/wallet.service';
import { WorkspaceService } from '@services/workspace.service';

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
    ReactiveFormsModule,
    LoadingContentModule,
    ModalConfirmUpdateWalletModule
  ],
  providers: [
      WalletService,
      WorkspaceService
  ]
})
export class IdentityModule { }
