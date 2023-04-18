import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageAgenthosCertificateModule } from '@components/image-agenthos-certificate/image-agenthos-certificate.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { ModalUpgradeLicenseModule } from '@components/modal-upgrade-license/modal-upgrade-license.module';
import { DeviceIphoneModule } from '@components/device-iphone/device-iphone.module';
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
    ModalUpgradeLicenseModule,
    DeviceIphoneModule
  ],
  providers: [
      WalletService
  ]
})
export class IdentityModule { }
