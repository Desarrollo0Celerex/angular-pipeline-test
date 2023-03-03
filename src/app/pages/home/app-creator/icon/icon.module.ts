import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PhonePreviewWalletModule } from '@components/phone-preview-wallet/phone-preview-wallet.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { WalletService } from '@services/wallet.service';

import { IconRoutingModule } from './icon-routing.module';
import { IconPage } from './icon.page';


@NgModule({
  declarations: [
    IconPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconRoutingModule,
    LoadingContentModule,
    ModalConfirmUpdateWalletModule,
    PhonePreviewWalletModule,
    ReactiveFormsModule
  ],
  providers: [
    WalletService
  ]
})
export class IconModule { }
