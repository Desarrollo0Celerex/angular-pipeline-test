import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { WalletContactService } from '@services/wallet-contact.service';

import { WalletContactRoutingModule } from './wallet-contact-routing.module';
import { WalletContactPage } from './wallet-contact.page';

@NgModule({
  declarations: [
    WalletContactPage
  ],
  imports: [
    CommonModule,
    WalletContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownSelectPhoneCodeModule,
    LoadingContentModule,
    ModalConfirmUpdateWalletModule
  ],
  providers: [WalletContactService]
})
export class WalletContactModule { }
