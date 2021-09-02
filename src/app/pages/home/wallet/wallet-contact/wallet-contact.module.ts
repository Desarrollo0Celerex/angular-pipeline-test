import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletContactRoutingModule } from './wallet-contact-routing.module';
import { WalletContactPage } from './wallet-contact.page';


@NgModule({
  declarations: [
    WalletContactPage
  ],
  imports: [
    CommonModule,
    WalletContactRoutingModule
  ]
})
export class WalletContactModule { }
