import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';

import { ChartContactWalletProjectionComponent } from './chart-contact-wallet-projection.component';

@NgModule({
  declarations: [ChartContactWalletProjectionComponent],
  exports: [ChartContactWalletProjectionComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [ContactService]
})
export class ChartContactWalletProjectionModule { }
