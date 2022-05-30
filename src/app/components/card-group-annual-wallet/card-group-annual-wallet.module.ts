import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { GroupService } from '@services/group.service';

import { CardGroupAnnualWalletComponent } from './card-group-annual-wallet.component';

@NgModule({
  declarations: [
    CardGroupAnnualWalletComponent
  ],
  exports: [
      CardGroupAnnualWalletComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      GroupService
  ]
})
export class CardGroupAnnualWalletModule { }
