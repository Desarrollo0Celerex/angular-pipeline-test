import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardWalletProjectionComponent } from './card-wallet-projection.component';

@NgModule({
  declarations: [CardWalletProjectionComponent],
  exports: [CardWalletProjectionComponent],
  imports: [
    CommonModule
  ]
})
export class CardWalletProjectionModule { }
