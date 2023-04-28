import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@services/contact.service';

import { CardWalletGlobalComponent } from './card-wallet-global.component';

@NgModule({
  declarations: [CardWalletGlobalComponent],
  exports: [CardWalletGlobalComponent],
  imports: [
    CommonModule
  ],
  providers: [ContactService]
})
export class CardWalletGlobalModule { }
