import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';

import { ChartContactWalletProjectionAuxComponent } from './chart-contact-wallet-projection-aux.component';

@NgModule({
  declarations: [ChartContactWalletProjectionAuxComponent],
  exports: [ChartContactWalletProjectionAuxComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [ContactService]
})
export class ChartContactWalletProjectionAuxModule { }
