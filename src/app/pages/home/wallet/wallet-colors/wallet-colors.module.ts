import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { WalletService } from '@services/wallet.service';

import { WalletColorsRoutingModule } from './wallet-colors-routing.module';
import { WalletColorsPage } from './wallet-colors.page';


@NgModule({
  declarations: [
    WalletColorsPage
  ],
  imports: [
    CommonModule,
    WalletColorsRoutingModule,
    LoadingContentModule,
    FormsModule,
    ReactiveFormsModule,
    ModalConfirmUpdateWalletModule
  ],
  providers: [
      WalletService
  ]
})
export class WalletColorsModule { }
