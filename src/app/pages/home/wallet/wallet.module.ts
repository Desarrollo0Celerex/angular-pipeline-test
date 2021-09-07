import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletService } from '@services/wallet.service';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletLayout } from './wallet.layout';

@NgModule({
  declarations: [
    WalletLayout
  ],
  imports: [
    CommonModule,
    WalletRoutingModule
  ],
  providers: [WalletService]
})
export class WalletModule { }
