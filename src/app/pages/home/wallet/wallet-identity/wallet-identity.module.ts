import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletIdentityRoutingModule } from './wallet-identity-routing.module';
import { WalletIdentityPage } from './wallet-identity.page';


@NgModule({
  declarations: [
    WalletIdentityPage
  ],
  imports: [
    CommonModule,
    WalletIdentityRoutingModule
  ]
})
export class WalletIdentityModule { }
