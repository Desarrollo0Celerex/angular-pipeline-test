import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { WalletService } from '@services/wallet.service';

import { AppCreatorRoutingModule } from './app-creator-routing.module';
import { AppCreatorLayout } from './app-creator.layout';


@NgModule({
  declarations: [
    AppCreatorLayout
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    AppCreatorRoutingModule
  ],
  providers: [
    WalletService
  ]
})
export class AppCreatorModule { }
