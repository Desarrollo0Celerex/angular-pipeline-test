import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageAgenthosCertificateModule } from '@components/image-agenthos-certificate/image-agenthos-certificate.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { PhonePreviewWalletModule } from '@components/phone-preview-wallet/phone-preview-wallet.module';
import { WalletService } from '@services/wallet.service';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityPage } from './identity.page';

@NgModule({
  declarations: [
    IdentityPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentityRoutingModule,
    ImageAgenthosCertificateModule,
    ReactiveFormsModule,
    LoadingContentModule,
    ModalConfirmUpdateWalletModule,
    PhonePreviewWalletModule
  ],
  providers: [
      WalletService
  ]
})
export class IdentityModule { }
