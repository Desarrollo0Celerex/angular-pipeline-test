import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
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
    LoadingContentModule
  ],
  providers: [WalletService]
})
export class CreateWalletModule { }
