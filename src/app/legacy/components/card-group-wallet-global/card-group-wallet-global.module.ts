import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { GroupService } from '@services/group.service';

import { CardGroupWalletGlobalComponent } from './card-group-wallet-global.component';

@NgModule({
  declarations: [
    CardGroupWalletGlobalComponent
  ],
  exports: [
      CardGroupWalletGlobalComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      GroupService
  ]
})
export class CardGroupWalletGlobalModule { }
