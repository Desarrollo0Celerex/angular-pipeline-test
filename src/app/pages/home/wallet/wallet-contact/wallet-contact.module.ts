import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
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
    DropdownSelectPhoneCodeModule
  ],
  providers: [WalletContactService]
})
export class WalletContactModule { }
