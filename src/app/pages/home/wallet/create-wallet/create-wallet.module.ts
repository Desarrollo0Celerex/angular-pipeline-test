import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateWalletModule } from '@components/modal-confirm-create-wallet/modal-confirm-create-wallet.module';
import { WalletService } from '@services/wallet.service';

import { CreateWalletRoutingModule } from './create-wallet-routing.module';
import { CreateWalletPage } from './create-wallet.page';


@NgModule({
  declarations: [
    CreateWalletPage
  ],
  imports: [
    CommonModule,
    CreateWalletRoutingModule,
    LoadingContentModule,
    ModalConfirmCreateWalletModule
  ],
  providers: [WalletService]
})
export class CreateWalletModule { }
