import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonePreviewWalletComponent } from './phone-preview-wallet.component';

@NgModule({
  declarations: [
    PhonePreviewWalletComponent
  ],
  exports: [
    PhonePreviewWalletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PhonePreviewWalletModule { }
