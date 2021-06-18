import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';

import { CardWalletProjectionComponent } from './card-wallet-projection.component';

@NgModule({
  declarations: [CardWalletProjectionComponent],
  exports: [CardWalletProjectionComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [ContactService]
})
export class CardWalletProjectionModule { }
