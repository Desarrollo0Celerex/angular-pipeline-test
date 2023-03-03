import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { PhonePreviewWalletModule } from '@components/phone-preview-wallet/phone-preview-wallet.module';
import { WalletService } from '@services/wallet.service';
import { WorkspaceService } from '@services/workspace.service';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemePage } from './theme.page';


@NgModule({
  declarations: [
    ThemePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalConfirmUpdateWalletModule,
    LoadingContentModule,
    PhonePreviewWalletModule,
    ReactiveFormsModule,
    ThemeRoutingModule
  ],
  providers: [
    WalletService,
    WorkspaceService
  ]
})
export class ThemeModule { }
