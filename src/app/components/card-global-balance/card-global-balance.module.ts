import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';

import { CardGlobalBalanceComponent } from './card-global-balance.component';

@NgModule({
  declarations: [CardGlobalBalanceComponent],
  exports: [CardGlobalBalanceComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ContactService
  ]
})
export class CardGlobalBalanceModule { }
